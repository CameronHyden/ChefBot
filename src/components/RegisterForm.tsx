import { useState } from "react";
import { registerUser } from "../api/api";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
     const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await registerUser(email, password);
      setMessage(res.data);

      navigate("/login"); // redirect to home
    } catch (err: any) {
      setMessage(err.response?.data || "Registration failed");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
      <Paper
        elevation={4}
        sx={{ p: 4, width: "100%", maxWidth: 400, borderRadius: 3, textAlign: "center" }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          📝 Register
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
          <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
            Register
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
