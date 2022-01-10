import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Recover from "./components/Recover";
import { Box } from "@mui/material";
import { AuthProvider } from "./components/contexts/AuthContext";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Box sx={{ display: "flex" }}>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <AuthenticatedRoute>
                  <Dashboard />
                </AuthenticatedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/recover" element={<Recover />} />
          </Routes>
        </Box>
      </AuthProvider>
    </div>
  );
}

export default App;
