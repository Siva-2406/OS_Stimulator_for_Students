export function parseThreads(input) {
  return input.split(/\n|;/).map(row => row.trim()).filter(Boolean).map((row, i) => {
    const values = row.split(/[,\s]+/).filter(Boolean);
    const id = values[0] || 'T' + (i + 1);
    const type = (values[1] || 'user').toLowerCase() === 'kernel' ? 'Kernel' : 'User';
    const burst = Number(values[2]);
    return {
      id,
      type,
      burst: Number.isFinite(burst) && burst > 0 ? burst : 3,
      remaining: Number.isFinite(burst) && burst > 0 ? burst : 3
    };
  });
}

export function threadLifecycle(input, quantum = 1) {
  const threads = parseThreads(input);
  const queue = threads.map(t => ({ ...t }));
  const rows = [];
  const timeline = [];
  let time = 0;
  let switches = 0;
  let previous = null;

  while (queue.some(t => t.remaining > 0)) {
    for (const t of queue) {
      if (t.remaining <= 0) continue;
      const start = time;
      const run = Math.min(Math.max(1, quantum), t.remaining);
      if (previous && previous !== t.id) switches += 1;
      timeline.push({ id: t.id, type: t.type, start, end: start + run });
      t.remaining -= run;
      time += run;
      previous = t.id;
    }
  }

  for (const t of threads) {
    const slices = timeline.filter(x => x.id === t.id);
    const start = slices[0]?.start ?? 0;
    const completion = slices.length ? slices[slices.length - 1].end : 0;
    rows.push({
      ...t,
      start,
      completion,
      turnaround: completion,
      waiting: Math.max(0, completion - t.burst),
      response: start,
      contextSwitches: Math.max(0, slices.length - 1)
    });
  }

  const events = [];
  for (const t of threads) {
    events.push({ type: 'Created', id: t.id, time: 0 });
    events.push({ type: 'Ready', id: t.id, time: 0 });
  }
  timeline.forEach((slice, index) => {
    events.push({ type: 'Running', id: slice.id, time: slice.start });
    if (index < timeline.length - 1) {
      events.push({ type: 'Context Switch', id: timeline[index + 1].id, time: slice.end });
    }
  });
  rows.forEach(t => events.push({ type: 'Terminated', id: t.id, time: t.completion }));

  return {
    rows,
    timeline,
    events,
    totalTime: time,
    contextSwitches: switches,
    threadCount: threads.length
  };
}

export function tcbForThread(thread) {
  return {
    tid: thread.id,
    type: thread.type,
    state: thread.completion ? 'Terminated' : 'Ready',
    programCounter: thread.start,
    registers: 'R1=' + thread.burst + ', R2=' + (thread.type === 'Kernel' ? 'K' : 'U'),
    cpuBurst: thread.burst
  };
}
