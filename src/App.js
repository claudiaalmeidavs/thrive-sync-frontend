import './App.css';
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import TicketPage from './pages/ActivityPage/ActivityPage.jsx';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import RegisterActivity from "./pages/RegisterActivity/registerActivity.jsx";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path ="/" element={<RegisterActivity />} />
        <Route path="/profile" element={<Dashboard/>} />
        <Route path="/profile/:id" element={<TicketPage/>} />
      </Routes>
    </div>
  );
}

export default App;