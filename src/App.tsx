import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/Login';
import ProdukList from './pages/ProdukList';
import ProdukDetail from './pages/UProdukDetail';
import AdminDashboard from './pages/AdminDashboard';
import Kontak from './pages/Kontak';


// Bungkus App dengan komponen untuk bisa pakai useLocation
function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isDashboardPage = location.pathname === '/dashboard';

  return (
    <div className="bg-base-100">
  
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list-produk" element={<ProdukList />} />
        <Route path="/produk/:id" element={<ProdukDetail />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
    
        <Route path="/kontak" element={<Kontak />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
