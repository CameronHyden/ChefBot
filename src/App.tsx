import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import {Box } from "@mui/material";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar /> {/* 👈 extracted nav bar */}

        <Box component="main" sx={{ minHeight: "calc(100vh - 64px)" }}>
          <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
          </Routes>
        </Box>
      </Router>
    </AuthProvider>
  );
}

export default App;