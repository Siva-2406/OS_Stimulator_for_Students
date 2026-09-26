export function parsePageReferenceInput(input){
  return input.split(/[\s,]+/).map(Number).filter(Number.isFinite).filter(x=>x>=0);
}
function simulate(referenceString,frames,mode){
  const refs=parsePageReferenceInput(referenceString), frame=[], steps=[], faults=[];
  refs.forEach((page,i)=>{
    let fault=!frame.includes(page), replaced=null;
    if(fault){
      if(frame.length<frames) frame.push(page);
      else {
        let idx=0;
        if(mode==='FIFO') idx=i-frame.length;
        else if(mode==='LRU'){
          const last=frame.map(p=>refs.slice(0,i).lastIndexOf(p));
          idx=last.indexOf(Math.min(...last));
        } else {
          const next=frame.map(p=>{const n=refs.indexOf(p,i+1);return n<0?Infinity:n;});
          idx=next.indexOf(Math.max(...next));
        }
        replaced=frame[idx]; frame[idx]=page;
      }
      faults.push(i);
    }
    steps.push({index:i,page,frames:[...frame],fault,replaced});
  });
  return {mode,reference:refs,frameCount:frames,steps,pageFaults:faults.length,pageHits:refs.length-faults.length,faultRate:refs.length?faults.length/refs.length:0};
}
export function runPageReplacement(algorithm,input,frames=3){
  const refs=parsePageReferenceInput(input);
  return simulate(refs,Math.max(1,Number(frames)||3),algorithm.startsWith('Optimal')?'Optimal':algorithm.startsWith('LRU')?'LRU':'FIFO');
}
