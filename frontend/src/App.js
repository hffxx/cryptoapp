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
  const [isLogged, setLogin] = useState(true);
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Box sx={{ display: "flex" }}>
          <Hidden mdDown>{isLogged && <Sidebar />}</Hidden>
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
    </AuthProvider>
  );
}

export default App;
