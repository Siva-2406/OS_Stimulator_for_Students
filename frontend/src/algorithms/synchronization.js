export function parseSynchronizationInput(input) {
  return input.split(/\n|;/).map(row=>row.trim()).filter(Boolean).map((row,i)=>{
    const v=row.split(/[,\s]+/).filter(Boolean);
    return {id:v[0]||'P'+(i+1), burst:Math.max(1,Number(v[1])||3)};
  });
}

export function mutexSimulation(input) {
  const processes=parseSynchronizationInput(input), events=[], timeline=[];
  let time=0, lockFree=true;
  processes.forEach((p,i)=>{
    const start=time;
    events.push({type:'Request Lock',id:p.id,time:start});
    if(!lockFree) events.push({type:'Waiting',id:p.id,time:start});
    events.push({type:'Lock Acquired',id:p.id,time:start});
    lockFree=false;
    timeline.push({id:p.id,start,end:start+p.burst,state:'Critical Section'});
    time+=p.burst;
    events.push({type:'Release Lock',id:p.id,time});
    lockFree=true;
  });
  return {mode:'Mutex',rows:processes.map((p,i)=>({id:p.id,burst:p.burst,start:timeline[i].start,end:timeline[i].end})),timeline,events,totalTime:time};
}

export function semaphoreSimulation(input, capacity=2) {
  const processes=parseSynchronizationInput(input), timeline=[], events=[], active=[];
  let time=0;
  processes.forEach(p=>{
    const start=time;
    if(active.length>=capacity) events.push({type:'Waiting',id:p.id,time});
    events.push({type:'Acquire Semaphore',id:p.id,time});
    active.push(p.id);
    timeline.push({id:p.id,start,end:start+p.burst,state:'Critical Section'});
    time+=p.burst;
    active.shift();
    events.push({type:'Release Semaphore',id:p.id,time});
  });
  return {mode:'Semaphore',capacity,rows:processes.map((p,i)=>({id:p.id,burst:p.burst,start:timeline[i].start,end:timeline[i].end})),timeline,events,totalTime:time};
}

export function producerConsumerSimulation(input) {
  const processes=parseSynchronizationInput(input), buffer=[], capacity=3, events=[], rows=[];
  let time=0;
  processes.forEach((p,i)=>{
    const action=i%2===0?'Produce':'Consume';
    if(action==='Produce'){
      if(buffer.length<capacity){buffer.push(p.id);events.push({type:'Produced',id:p.id,time,buffer:[...buffer]});}
      else events.push({type:'Buffer Full',id:p.id,time,buffer:[...buffer]});
    }else{
      const item=buffer.shift();
      events.push({type:item?'Consumed':'Buffer Empty',id:p.id,time,buffer:[...buffer]});
    }
    rows.push({id:p.id,action,bufferSize:buffer.length,time});
    time++;
  });
  return {mode:'Producer–Consumer',capacity,rows,timeline:rows.map(r=>({id:r.id,start:r.time,end:r.time+1,state:r.action})),events,totalTime:time,finalBuffer:buffer};
}

export function runSynchronization(algorithm,input) {
  if(algorithm==='Mutex') return mutexSimulation(input);
  if(algorithm==='Semaphore') return semaphoreSimulation(input);
  return producerConsumerSimulation(input);
}
