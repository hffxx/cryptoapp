import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Recover from "./components/Recover";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact={true} element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recover" element={<Recover />} />
      </Routes>
    </div>
  );
}

export default App;
