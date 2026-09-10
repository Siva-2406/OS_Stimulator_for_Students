import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Boxes, BarChart3, FlaskConical, Info, Menu, X, GraduationCap } from 'lucide-react';
import { useState } from 'react';

const nav = [
 {to:'/',label:'Dashboard',icon:LayoutDashboard},{to:'/modules',label:'OS Modules',icon:Boxes},
 {to:'/progress',label:'My Progress',icon:BarChart3},{to:'/experiments',label:'Experiments',icon:FlaskConical},{to:'/about',label:'About',icon:Info}
];
export default function Layout(){const [open,setOpen]=useState(false); const loc=useLocation(); const title=nav.find(n=>n.to===loc.pathname)?.label || 'Simulator';
 return <div className="app-shell"><aside className={open?'sidebar open':'sidebar'}><div className="brand"><div className="brand-mark"><GraduationCap size={22}/></div><div><strong>OS Stimulator</strong><span>for Students</span></div><button className="icon-btn mobile-only" onClick={()=>setOpen(false)}><X size={20}/></button></div><nav>{nav.map(({to,label,icon:Icon})=><NavLink key={to} to={to} end={to==='/' } onClick={()=>setOpen(false)}><Icon size={19}/><span>{label}</span></NavLink>)}</nav><div className="sidebar-tip"><b>Learn by doing</b><span>Run a simulation, change the input, and understand why.</span></div></aside><div className="main"><header className="topbar"><button className="icon-btn mobile-menu" onClick={()=>setOpen(true)}><Menu/></button><div><div className="eyebrow">Virtual Operating System Laboratory</div><h1>{title}</h1></div><div className="student-pill"><span className="status-dot"/> Student Mode</div></header><main className="content"><Outlet/></main><footer>OS_Stimulator_For_Students · Learn the theory. Run the simulation. Understand why.</footer></div></div>}
