import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Cpu, GitBranch, Workflow, RefreshCw, CircleAlert, MemoryStick, Grid2X2, Replace, FolderTree, FolderOpen, Blocks, HardDrive, Disc3, Terminal, Smartphone } from 'lucide-react';
const icons={BookOpen,Cpu,GitBranch,Workflow,RefreshCw,CircleAlert,MemoryStick,Grid2X2,Replace,FolderTree,FolderOpen,Blocks,HardDrive,Disc3,Terminal,Smartphone};
export default function ModuleCard({module}){const Icon=icons[module.icon]||BookOpen; return <Link to={`/simulator/${module.id}`} className="module-card"><div className="module-icon"><Icon size={22}/></div><div className="module-meta"><span>{module.topic}</span><h4>{module.name}</h4><p>{module.description}</p></div><ArrowRight className="module-arrow" size={18}/></Link>}
