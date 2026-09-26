export function parseProcesses(input){
  return input.split(/\n|;/).map(row=>row.trim()).filter(Boolean).map((row,i)=>{
    const values=row.split(/[,\s]+/).filter(Boolean).map(Number);
    return {
      id:'P'+(i+1),
      arrival:Number.isFinite(values[0]) && values[0]>=0 ? values[0] : 0,
      burst:Number.isFinite(values[1]) && values[1]>0 ? values[1] : 1,
      priority:Number.isFinite(values[2]) ? values[2] : i+1
    };
  });
}

function finish(order){
  let time=0;
  const rows=[];
  const timeline=[];
  order.forEach(p=>{
    const start=Math.max(time,p.arrival);
    const end=start+p.burst;
    time=end;
    rows.push({...p,start,end,completion:end,turnaround:end-p.arrival,waiting:start-p.arrival,response:start-p.arrival});
    timeline.push({id:p.id,start,end});
  });
  return {rows,timeline,totalTime:time};
}

export function fcfs(input){
  return finish(parseProcesses(input).sort((a,b)=>a.arrival-b.arrival||a.id.localeCompare(b.id)));
}

export function sjf(input){
  const left=parseProcesses(input),order=[];
  let time=0;
  while(left.length){
    const ready=left.filter(p=>p.arrival<=time);
    if(!ready.length){time=Math.min(...left.map(p=>p.arrival));continue;}
    ready.sort((a,b)=>a.burst-b.burst||a.arrival-b.arrival);
    const p=ready[0];
    order.push(p);
    left.splice(left.indexOf(p),1);
    time+=p.burst;
  }
  return finish(order);
}

export function priority(input){
  const left=parseProcesses(input),order=[];
  let time=0;
  while(left.length){
    const ready=left.filter(p=>p.arrival<=time);
    if(!ready.length){time=Math.min(...left.map(p=>p.arrival));continue;}
    ready.sort((a,b)=>a.priority-b.priority||a.arrival-b.arrival);
    const p=ready[0];
    order.push(p);
    left.splice(left.indexOf(p),1);
    time+=p.burst;
  }
  return finish(order);
}

export function srtf(input){
  const processes=parseProcesses(input);
  const remaining=new Map(processes.map(p=>[p.id,p.burst]));
  const firstStart=new Map();
  const completion=new Map();
  const timeline=[];
  let time=0;
  let completed=0;

  while(completed<processes.length){
    const ready=processes.filter(p=>p.arrival<=time && remaining.get(p.id)>0);
    if(!ready.length){
      const next=Math.min(...processes.filter(p=>remaining.get(p.id)>0).map(p=>p.arrival));
      time=Math.max(time,next);
      continue;
    }

    ready.sort((a,b)=>remaining.get(a.id)-remaining.get(b.id)||a.arrival-b.arrival||a.id.localeCompare(b.id));
    const current=ready[0];
    if(!firstStart.has(current.id)) firstStart.set(current.id,time);

    const nextArrival=processes
      .filter(p=>p.arrival>time && remaining.get(p.id)>0)
      .map(p=>p.arrival)
      .sort((a,b)=>a-b)[0];
    const runFor=Math.min(remaining.get(current.id), nextArrival===undefined ? Infinity : nextArrival-time);
    const start=time;
    time+=runFor;
    remaining.set(current.id,remaining.get(current.id)-runFor);

    const last=timeline[timeline.length-1];
    if(last && last.id===current.id && last.end===start) last.end=time;
    else timeline.push({id:current.id,start,end:time});

    if(remaining.get(current.id)===0){
      completion.set(current.id,time);
      completed++;
    }
  }

  const rows=processes.map(p=>{
    const c=completion.get(p.id);
    return {
      ...p,
      completion:c,
      turnaround:c-p.arrival,
      waiting:c-p.arrival-p.burst,
      response:firstStart.get(p.id)-p.arrival
    };
  });

  return {rows,timeline,totalTime:time};
}

export function roundRobin(input,quantum=2){
  const processes=parseProcesses(input).sort((a,b)=>a.arrival-b.arrival||a.id.localeCompare(b.id));
  const q=Math.max(1,Number(quantum)||2);
  const remaining=new Map(processes.map(p=>[p.id,p.burst]));
  const firstStart=new Map();
  const completion=new Map();
  const queue=[];
  const timeline=[];
  let next=0;
  let time=0;

  while(next<processes.length||queue.length){
    while(next<processes.length&&processes[next].arrival<=time) queue.push(processes[next++]);
    if(!queue.length){
      time=processes[next].arrival;
      continue;
    }

    const p=queue.shift();
    if(!firstStart.has(p.id)) firstStart.set(p.id,time);
    const start=time;
    const slice=Math.min(q,remaining.get(p.id));
    time+=slice;
    remaining.set(p.id,remaining.get(p.id)-slice);
    timeline.push({id:p.id,start,end:time});

    while(next<processes.length&&processes[next].arrival<=time) queue.push(processes[next++]);
    if(remaining.get(p.id)>0) queue.push(p);
    else completion.set(p.id,time);
  }

  const rows=processes.map(p=>{
    const c=completion.get(p.id);
    return {
      ...p,
      completion:c,
      turnaround:c-p.arrival,
      waiting:c-p.arrival-p.burst,
      response:firstStart.get(p.id)-p.arrival
    };
  });

  return {rows,timeline,totalTime:time};
}

export function runScheduling(algorithm,input,quantum){
  if(algorithm==='SJF') return sjf(input);
  if(algorithm==='SRTF') return srtf(input);
  if(algorithm==='Priority') return priority(input);
  if(algorithm==='Round Robin') return roundRobin(input,quantum);
  return fcfs(input);
}

export function summarize(result){
  const n=result.rows.length||1;
  return {
    avgWaiting:(result.rows.reduce((s,p)=>s+p.waiting,0)/n).toFixed(2),
    avgTurnaround:(result.rows.reduce((s,p)=>s+p.turnaround,0)/n).toFixed(2),
    avgResponse:(result.rows.reduce((s,p)=>s+p.response,0)/n).toFixed(2)
  };
}
