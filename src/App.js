import Timer from './pages/Timer';
import Historypage from './pages/History';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Timer</Link>
        <Link to="/history">History</Link>
        <Link to="/dashboard">Dashboard</Link>
     </nav>
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="/history" element={<Historypage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;