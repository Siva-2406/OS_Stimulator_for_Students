export function parseMemoryInput(input){
  const parts=input.split(/\n\s*\n|\|/).map(x=>x.trim()).filter(Boolean);
  const blocks=(parts[0]||'').split(/[\s,]+/).map(Number).filter(Number.isFinite).filter(x=>x>0);
  const requests=(parts[1]||'').split(/[\s,]+/).map(Number).filter(Number.isFinite).filter(x=>x>0);
  return {blocks,requests};
}
function allocate(input,mode){
  const {blocks,requests}=parseMemoryInput(input);
  const remaining=[...blocks], allocations=[], events=[];
  requests.forEach((size,i)=>{
    const candidates=remaining.map((space,j)=>({space,j})).filter(x=>x.space>=size);
    if(!candidates.length){allocations.push({id:'P'+(i+1),size,block:-1,allocated:0,remaining:size,status:'Not Allocated'});events.push({type:'Allocation Failed',id:'P'+(i+1),size});return;}
    let chosen=candidates[0];
    if(mode==='Best Fit') chosen=candidates.reduce((a,x)=>x.space<a.space?a:x);
    if(mode==='Worst Fit') chosen=candidates.reduce((a,x)=>x.space>a.space?a:x);
    remaining[chosen.j]-=size;
    allocations.push({id:'P'+(i+1),size,block:chosen.j+1,allocated:size,remaining:remaining[chosen.j],status:'Allocated'});
    events.push({type:'Allocated',id:'P'+(i+1),block:chosen.j+1,size,remaining:remaining[chosen.j]});
  });
  return {mode,blocks,requests,remaining,allocations,events,totalAllocated:allocations.reduce((s,x)=>s+x.allocated,0),failed:allocations.filter(x=>x.block<0).length};
}
export function runMemory(algorithm,input){return allocate(input,algorithm);}
