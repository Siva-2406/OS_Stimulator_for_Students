export function parseFileInput(input){
  return input.split(/\n|;/).map(x=>x.trim()).filter(Boolean).map((x,i)=>{
    const v=x.split(/[\s,]+/).filter(Boolean); return {name:v[0]||'file'+(i+1),size:Math.max(1,Number(v[1])||10)};
  });
}
export function fileSystemSimulation(input){
  const files=parseFileInput(input), blocks=[], events=[];
  let next=0;
  files.forEach(f=>{const count=Math.max(1,Math.ceil(f.size/4)); const allocated=[]; for(let i=0;i<count;i++)allocated.push(next++); blocks.push({name:f.name,size:f.size,blocks:allocated}); events.push({type:'Create',file:f.name,time:blocks.length-1,blocks:allocated});});
  return {mode:'File Operations',files,blocks,events,totalBlocks:next,operations:['Create','Read','Write','Delete']};
}
export function runFileSystem(algorithm,input){return fileSystemSimulation(input);}
