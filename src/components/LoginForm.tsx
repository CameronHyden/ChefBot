import { useState } from "react";
import { loginUser } from "../api/api";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
   const navigate = useNavigate();
   const { login } = useAuth();

const handleLogin = async () => {
  try {
    const res = await loginUser(email, password);

    // ✅ Save token for later API calls
      login(res.data.token );

    // Optionally save user info if your API sends it
    // localStorage.setItem("userEmail", res.data.email);

    setMessage("✅ Login successful!");
    navigate("/home"); // redirect to home
  } catch (err: any) {
    setMessage(err.response?.data || "Login failed");
  }
};


  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <Paper
        elevation={4}
        sx={{ p: 4, width: "100%", maxWidth: 400, borderRadius: 3, textAlign: "center" }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          🔑 Login
        </Typography>

        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </Box>

        {message && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};
