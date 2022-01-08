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
import { AuthProvider } from "./components/contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Hidden mdDown>
          <Sidebar />
        </Hidden>
        <Routes>
          <AuthProvider>
            <Route path="/" exact={true} element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/recover" element={<Recover />} />
          </AuthProvider>
        </Routes>
      </Box>
    </div>
  );
}

export default App;
