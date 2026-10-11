export function parseDirectoryInput(input){
 const rows=input.split(/\n|;/).map(x=>x.trim()).filter(Boolean);
 return rows.map((row,i)=>{const p=row.split('/').map(x=>x.trim()).filter(Boolean);return {path:p,name:p[p.length-1]||'file'+(i+1)};});
}
export function directorySimulation(algorithm,input){
 const paths=parseDirectoryInput(input),root={name:'root',type:'directory',children:[]},events=[];
 if(algorithm==='Single Level'){
   paths.forEach((f,i)=>{root.children.push({name:f.name,type:'file',path:'/'+f.name});events.push({type:'File added',path:'/'+f.name});});
 } else if(algorithm==='Two Level'){
   const dirs=new Map();
   paths.forEach((f,i)=>{const user=f.path.length>1?f.path[0]:'user1';if(!dirs.has(user)){const d={name:user,type:'directory',children:[]};dirs.set(user,d);root.children.push(d);}dirs.get(user).children.push({name:f.name,type:'file',path:'/'+user+'/'+f.name});events.push({type:'File added',path:'/'+user+'/'+f.name});});
 } else {
   paths.forEach(f=>{let node=root,walk='';f.path.forEach((part,i)=>{walk+='/'+part;let child=node.children.find(x=>x.name===part);if(!child){child={name:part,type:i===f.path.length-1?'file':'directory',path:walk,children:[]};node.children.push(child);}node=child;if(i===f.path.length-1)events.push({type:'Path resolved',path:walk});});});
 }
 return {mode:algorithm,tree:root,events,entryCount:paths.length,paths:paths.map(f=>f.path.join('/'))};
}
export function runDirectory(algorithm,input){return directorySimulation(algorithm,input);}
