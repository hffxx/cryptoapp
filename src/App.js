import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Recover from "./components/Recover";
import Settings from "./components/Settings";
import { Box } from "@mui/material";
import { CoinsProvider } from "./components/contexts/CoinsContext";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Messages from "./components/Messages";
import Wallet from "./components/Wallet";
import Highscores from "./components/Highscores";
import Trade from "./components/Trade";
import { useAuth } from "./components/contexts/AuthContext";

function App() {
  const { currentUser } = useAuth();
  return (
    <div className="App">
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
            <Route
              path="/messages"
              exact
              element={
                <AuthenticatedRoute>
                  <Messages />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/wallet"
              exact
              element={
                <AuthenticatedRoute>
                  <Wallet />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/highscores"
              exact
              element={
                <AuthenticatedRoute>
                  <Highscores />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/trade"
              exact
              element={
                <AuthenticatedRoute>
                  <Trade />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/login"
              element={!currentUser ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!currentUser ? <SignUp /> : <Navigate to="/" />}
            />
            <Route
              path="/recover"
              element={!currentUser ? <Recover /> : <Navigate to="/" />}
            />
          </Routes>
        </Box>
      </CoinsProvider>
    </div>
  );
}

export default App;
