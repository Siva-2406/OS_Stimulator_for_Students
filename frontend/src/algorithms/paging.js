export function parsePagingInput(input){
  const sections=input.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
  const pages=(sections[0]||'').split(/[\s,]+/).map(Number).filter(Number.isFinite).filter(x=>x>=0);
  const frameCount=Math.max(1,Number(sections[1])||3);
  const addresses=(sections[2]||'').split(/[\s,]+/).map(Number).filter(Number.isFinite).filter(x=>x>=0);
  return {pages,frameCount,addresses};
}
export function pagingSimulation(input){
  const {pages,frameCount,addresses}=parsePagingInput(input);
  const pageTable=pages.map((frame,i)=>({page:i,frame}));
  const pageSize=Math.max(1,Math.ceil((Math.max(...addresses,0)+1)/Math.max(pages.length,1)));
  const translations=addresses.map(address=>{
    const page=Math.floor(address/pageSize),offset=address%pageSize,frame=pageTable[page]?.frame;
    return {address,page,offset,frame,physical:frame===undefined?null:frame*pageSize+offset,status:frame===undefined?'Page Fault':'Translated'};
  });
  return {mode:'Address Translation',pages,frameCount,pageSize,pageTable,addresses,translations};
}
export function runPaging(algorithm,input){return pagingSimulation(input);}
