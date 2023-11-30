import './App.css';
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import RegisterTicket from './pages/RegisterActivity/registerTicket.jsx';
import HealthCard from './components/HealthCard/HealthCard.jsx';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path ="/" element={<RegisterTicket />} />
        <Route path="/activities" element={<Dashboard/>} />
        <Route path="/activities/:id" element={<HealthCard/>} />
      </Routes>
    </div>
  );
}

export default App;
