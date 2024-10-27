import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/DashBoard";
import { AuthProvider } from "./context/AuthContext";
import { Room } from "./pages/Room";
import { RoomContext, RoomProvider } from "./context/RoomContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <RoomProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/room/:id" element={<Room />} />
          </Routes>
        </RoomProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;
