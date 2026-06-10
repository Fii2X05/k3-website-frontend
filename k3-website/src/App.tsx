import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import K3 from './pages/K3';
import Facility from './pages/Facility';
import Structure from './pages/Structure';
import IncidentReport from './pages/IncidentReport';
import Management from './pages/Management';
import Auth from './pages/Auth';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* PUBLIC — accessible by anyone */}
            <Route index element={<Home />} />
            <Route path="k3" element={<K3 />} />
            <Route path="facility" element={<Facility />} />
            <Route path="auth" element={<Auth />} />

            {/* CREW+ — requires login (any logged-in user) */}
            <Route path="structure" element={
              <ProtectedRoute requiredRole="crew">
                <Structure />
              </ProtectedRoute>
            } />
            <Route path="incidents" element={
              <ProtectedRoute requiredRole="crew">
                <IncidentReport />
              </ProtectedRoute>
            } />

            {/* MANAGEMENT ONLY */}
            <Route path="management" element={
              <ProtectedRoute requiredRole="management">
                <Management />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}