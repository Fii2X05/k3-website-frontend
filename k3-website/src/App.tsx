import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import K3 from './pages/K3';
import Facility from './pages/Facility';
import Structure from './pages/Structure';
import IncidentReport from './pages/IncidentReport';
import Auth from './pages/Auth';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="k3" element={<K3 />} />
          <Route path="facility" element={<Facility />} />
          <Route path="structure" element={<Structure />} />
          <Route path="incidents" element={<IncidentReport />} />
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
    </Router>
  );
}