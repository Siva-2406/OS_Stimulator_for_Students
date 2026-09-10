import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import Modules from './pages/Modules';
import Simulator from './pages/Simulator';
import Progress from './pages/Progress';
import Experiments from './pages/Experiments';
import About from './pages/About';

export default function App() {
  return <Routes><Route element={<Layout />}>
    <Route path="/" element={<Dashboard />} />
    <Route path="/modules" element={<Modules />} />
    <Route path="/simulator/:moduleId" element={<Simulator />} />
    <Route path="/progress" element={<Progress />} />
    <Route path="/experiments" element={<Experiments />} />
    <Route path="/about" element={<About />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route></Routes>;
}
