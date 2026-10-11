const DISK_BLOCK_COUNT = 32;

export function parseAllocationInput(input) {
  const files = [];
  for (const [index, raw] of input.split(/\n|;/).entries()) {
    const line = raw.trim();
    if (!line) continue;
    const parts = line.split(/[\s,]+/).filter(Boolean);
    if (parts.length < 2) throw new Error(`Line ${index + 1}: enter a file name and required block count, for example report 3.`);
    const name = parts[0];
    const blocks = Number(parts[1]);
    if (!Number.isInteger(blocks) || blocks < 1) throw new Error(`Line ${index + 1}: block count must be a positive whole number.`);
    if (files.some(file => file.name === name)) throw new Error(`Duplicate file name: ${name}.`);
    files.push({ name, size: blocks });
  }
  if (!files.length) throw new Error('Enter at least one file and its required block count.');
  return files;
}

export function runFileAllocation(algorithm, input, diskSize = DISK_BLOCK_COUNT) {
  const files = parseAllocationInput(input);
  const diskBlocks = Array.from({ length: diskSize }, (_, index) => ({
    block: index, status: 'Free', file: null, kind: 'free', next: null
  }));
  const allocations = [];
  const events = [];
  let failed = 0;
  const freeBlocks = () => diskBlocks.filter(block => block.status === 'Free').map(block => block.block);
  const reserve = (index, file, kind) => {
    diskBlocks[index].status = 'Used';
    diskBlocks[index].file = file;
    diskBlocks[index].kind = kind;
  };

  for (const file of files) {
    const free = freeBlocks();
    let blocks = [];
    let indexBlock = null;
    let status = 'Allocated';
    if (file.size > diskSize) {
      status = 'Not enough disk space';
    } else if (algorithm === 'Contiguous') {
      let start = -1, run = 0, previous = -2;
      for (const block of free) {
        run = block === previous + 1 ? run + 1 : 1;
        if (run >= file.size) { start = block - file.size + 1; break; }
        previous = block;
      }
      if (start >= 0) blocks = Array.from({ length: file.size }, (_, i) => start + i);
      else status = 'No contiguous space';
    } else if (algorithm === 'Linked') {
      if (free.length >= file.size) blocks = free.slice(0, file.size);
      else status = 'Not enough disk space';
    } else if (algorithm === 'Indexed') {
      if (free.length >= file.size + 1) {
        indexBlock = free[0];
        blocks = free.slice(1, file.size + 1);
      } else status = 'Not enough disk space for index + data';
    } else {
      status = 'Unsupported allocation method';
    }

    if (status !== 'Allocated') {
      failed += 1;
      allocations.push({ name: file.name, requested: file.size, blocks: [], indexBlock: null, status });
      events.push({ file: file.name, action: 'Allocation failed', detail: status });
      continue;
    }
    if (algorithm === 'Indexed') reserve(indexBlock, file.name, 'index');
    blocks.forEach((block, i) => {
      reserve(block, file.name, 'data');
      if (algorithm === 'Linked') diskBlocks[block].next = blocks[i + 1] ?? null;
    });
    allocations.push({ name: file.name, requested: file.size, blocks, indexBlock, status });
    events.push({
      file: file.name, action: 'Allocated',
      detail: algorithm === 'Indexed'
        ? `Index block ${indexBlock}; data blocks ${blocks.join(' → ')}`
        : algorithm === 'Linked'
          ? `Linked blocks ${blocks.join(' → ')}`
          : `Contiguous blocks ${blocks[0]}–${blocks[blocks.length - 1]}`
    });
  }
  const usedBlocks = diskBlocks.filter(block => block.status === 'Used').length;
  return {
    mode: algorithm, diskSize, diskBlocks, allocations, events, usedBlocks,
    freeBlocks: diskSize - usedBlocks, failed,
    fragmentationNote: algorithm === 'Contiguous'
      ? 'A file needs one uninterrupted run of free blocks; scattered free blocks cannot satisfy it.'
      : algorithm === 'Linked'
        ? 'A file can use scattered blocks connected by next-block pointers, with pointer overhead.'
        : 'Each file stores its data-block addresses in a separate index block, which also consumes space.'
  };
}
