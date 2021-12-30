import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Recover from "./components/Recover";
import Sidebar from "./components/Sidebar";
import { Hidden, Grid } from "@mui/material";

function App() {
  const [isLogged, setLogin] = useState(true);
  return (
    <div className="App">
      <Navbar />
      <div style={{ display: "flex" }}>
        <Hidden smDown>{isLogged && <Sidebar />}</Hidden>
        <Routes>
          <Route path="/" exact={true} element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recover" element={<Recover />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
