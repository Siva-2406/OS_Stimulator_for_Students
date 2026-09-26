export function parseProcesses(input){
  return input.split(/\n|;/).map(row=>row.trim()).filter(Boolean).map((row,i)=>{
    const values=row.split(/[,\s]+/).filter(Boolean).map(Number);
    return {id:'P'+(i+1),arrival:Number.isFinite(values[0])&&values[0]>=0?values[0]:0,burst:Number.isFinite(values[1])&&values[1]>0?values[1]:1,priority:Number.isFinite(values[2])?values[2]:i+1};
  });
}

export function processLifecycle(input){
  const processes=parseProcesses(input);
  const events=[];
  const rows=[];
  let time=0;
  processes.forEach((p,index)=>{
    const ready=Math.max(time,p.arrival);
    const start=ready;
    const end=start+p.burst;
    events.push({type:'Created',id:p.id,time:p.arrival});
    events.push({type:'Ready',id:p.id,time:ready});
    if(index>0&&start>time) events.push({type:'CPU Idle',time});
    if(index>0&&start===time) events.push({type:'Context Switch',time:start});
    events.push({type:'Running',id:p.id,time:start});
    events.push({type:'Terminated',id:p.id,time:end});
    rows.push({...p,start,end,completion:end,waiting:start-p.arrival,turnaround:end-p.arrival,response:start-p.arrival});
    time=end;
  });
  return {rows,events,timeline:rows.map(p=>({id:p.id,start:p.start,end:p.end})),totalTime:time};
}

export function pcbForProcess(process){
  return {pid:process.id,state:'Running',programCounter:process.start,registers:'R1='+process.burst+', R2='+process.priority,cpuBurst:process.burst,arrivalTime:process.arrival};
}
