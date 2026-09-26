export function parseProcesses(input){
  return input.split(/\n|;/).map((row,i)=>row.trim()).filter(Boolean).map((row,i)=>{
    const p=row.split(/[,\s]+/).filter(Boolean).map(Number);
    return {id:'P'+(i+1),arrival:Number.isFinite(p[0])?p[0]:0,burst:Number.isFinite(p[1])?p[1]:1,priority:Number.isFinite(p[2])?p[2]:i+1};
  });
}
function finish(order){
  let time=0;const rows=[];const timeline=[];
  order.forEach(p=>{const start=Math.max(time,p.arrival),end=start+p.burst;time=end;rows.push({...p,start,end,completion:end,turnaround:end-p.arrival,waiting:start-p.arrival,response:start-p.arrival});timeline.push({id:p.id,start,end});});
  return {rows,timeline,totalTime:time};
}
export function fcfs(input){const ps=parseProcesses(input).sort((a,b)=>a.arrival-b.arrival);return finish(ps);}
export function sjf(input){const left=parseProcesses(input),order=[];let time=0;while(left.length){const ready=left.filter(p=>p.arrival<=time);if(!ready.length){time=Math.min(...left.map(p=>p.arrival));continue;}ready.sort((a,b)=>a.burst-b.burst||a.arrival-b.arrival);const p=ready.shift();order.push(p);left.splice(left.indexOf(p),1);time+=p.burst;}return finish(order);}
export function priority(input){const left=parseProcesses(input),order=[];let time=0;while(left.length){const ready=left.filter(p=>p.arrival<=time);if(!ready.length){time=Math.min(...left.map(p=>p.arrival));continue;}ready.sort((a,b)=>a.priority-b.priority||a.arrival-b.arrival);const p=ready.shift();order.push(p);left.splice(left.indexOf(p),1);time+=p.burst;}return finish(order);}
export function roundRobin(input,quantum=2){const ps=parseProcesses(input).sort((a,b)=>a.arrival-b.arrival),remaining=new Map(ps.map(p=>[p.id,p.burst])),queue=[],rows=new Map(),timeline=[];let next=0,time=0;
while(next<ps.length||queue.length){while(next<ps.length&&ps[next].arrival<=time)queue.push(ps[next++]);if(!queue.length){time=ps[next].arrival;continue;}const p=queue.shift(),start=time,slice=Math.min(quantum,remaining.get(p.id));time+=slice;timeline.push({id:p.id,start,end:time});remaining.set(p.id,remaining.get(p.id)-slice);while(next<ps.length&&ps[next].arrival<=time)queue.push(ps[next++]);if(remaining.get(p.id)>0)queue.push(p);else rows.set(p.id,{...p,completion:time,turnaround:time-p.arrival,waiting:time-p.arrival-p.burst,response:timeline.find(t=>t.id===p.id).start-p.arrival});}
return {rows:ps.map(p=>rows.get(p.id)),timeline,totalTime:time};}
export function runScheduling(algorithm,input,quantum){if(algorithm==='SJF')return sjf(input);if(algorithm==='Priority')return priority(input);if(algorithm==='Round Robin')return roundRobin(input,quantum);return fcfs(input);}
export function summarize(result){const n=result.rows.length||1;return {avgWaiting:(result.rows.reduce((s,p)=>s+p.waiting,0)/n).toFixed(2),avgTurnaround:(result.rows.reduce((s,p)=>s+p.turnaround,0)/n).toFixed(2),avgResponse:(result.rows.reduce((s,p)=>s+p.response,0)/n).toFixed(2)};}
