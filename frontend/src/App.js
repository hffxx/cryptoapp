import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Recover from "./components/Recover";
import Settings from "./components/Settings";
import { Box } from "@mui/material";
import { AuthProvider } from "./components/contexts/AuthContext";
import { CoinsProvider } from "./components/contexts/CoinsContext";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CoinsProvider>
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
              <Route
                path="/settings"
                exact
                element={
                  <AuthenticatedRoute>
                    <Settings />
                  </AuthenticatedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/recover" element={<Recover />} />
            </Routes>
          </Box>
        </CoinsProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
