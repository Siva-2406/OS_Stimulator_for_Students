import { modules } from '../data/modules';
import ModuleCard from '../components/ModuleCard';
export default function Modules(){return <div className="page"><div className="page-intro"><span className="kicker">16 LEARNING AREAS</span><h2>Explore the OS laboratory</h2><p>Choose a concept and turn theory into an interactive experiment.</p></div><div className="module-grid full">{modules.map(m=><ModuleCard key={m.id} module={m}/>)}</div></div>}
