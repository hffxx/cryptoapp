import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Recover from "./components/Recover";
import Sidebar from "./components/Sidebar";
import { Hidden, Box } from "@mui/material";

function App() {
  const [isLogged, setLogin] = useState(true);
  return (
    <div className="App">
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Hidden smDown>{isLogged && <Sidebar />}</Hidden>
        <Routes>
          <Route
            path="/"
            exact={true}
            element={isLogged ? <Dashboard /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recover" element={<Recover />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
