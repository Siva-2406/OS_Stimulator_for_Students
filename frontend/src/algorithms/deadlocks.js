export function parseDeadlockInput(input) {
  const rows=input.split(/\n|;/).map(x=>x.trim()).filter(Boolean);
  const matrix=rows.map(r=>r.split(/[,\s]+/).map(Number).filter(Number.isFinite));
  const processes=matrix.map((v,i)=>({id:'P'+(i+1),allocation:v[0]||0,request:v[1]||0}));
  return processes;
}

export function bankerSimulation(input) {
  const p=parseDeadlockInput(input);
  let available=Math.max(0,Math.max(...p.map(x=>x.request+x.allocation),0)-p.reduce((s,x)=>s+x.allocation,0));
  const work=available, finish=p.map(()=>false), safe=[];
  let changed=true;
  while(changed){
    changed=false;
    p.forEach((x,i)=>{
      if(!finish[i] && x.request<=work){
        work+=x.allocation; finish[i]=true; safe.push(x.id); changed=true;
      }
    });
  }
  const safeState=finish.every(Boolean);
  return {mode:'Banker’s Algorithm',processes:p,available,safeState,safeSequence:safe,finish,events:p.map(x=>({id:x.id,type:safeState?'Can proceed':'Needs more resources'}))};
}

export function deadlockDetection(input) {
  const p=parseDeadlockInput(input);
  const blocked=p.filter(x=>x.request>x.allocation);
  const deadlocked=blocked.length>1;
  return {mode:'Deadlock Detection',processes:p,deadlocked,deadlockedProcesses:deadlocked?blocked.map(x=>x.id):[],events:p.map(x=>({id:x.id,type:blocked.includes(x)?'Waiting':'Completed'}))};
}

export function runDeadlock(algorithm,input) {
  return algorithm==='Banker’s Algorithm'?bankerSimulation(input):deadlockDetection(input);
}
