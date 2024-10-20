import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth';
import ContactDashboard from './components/ContactDashboard';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Auth />} />
      <Route path="/dashboard" element={<ContactDashboard />}/>
    </Routes>
  );
}

export default App;
