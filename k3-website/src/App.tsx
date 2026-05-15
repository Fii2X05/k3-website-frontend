import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import K3 from './pages/K3';
import Facility from './pages/Facility';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="k3" element={<K3 />} />
          <Route path="facility" element={<Facility />} />
        </Route>
      </Routes>
    </Router>
  );
}