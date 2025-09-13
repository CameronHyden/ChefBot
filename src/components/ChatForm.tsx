// src/app/components/ChatForm.tsx
import { useState } from "react";
import { askAi } from "../api/api";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export const ChatForm = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage: Message = { sender: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");

    setLoading(true);
    try {
      const res = await askAi(question);
      const botMessage: Message = { sender: "bot", text: res };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        sender: "bot",
        text: "⚠️ Error: " + (err.response?.data || "Could not fetch AI response"),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
     // minHeight="80vh"
      p={2}
    >
      <Paper
        elevation={4}
        sx={{
          p: 3,
          width: "100%",
          maxWidth: 600,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
          👩‍🍳 ChefBot
        </Typography>

        {/* Chat messages area */}
        <Box
          flex={1}
          sx={{
            maxHeight: "50vh",
            overflowY: "auto",
            mb: 2,
            p: 2,
            backgroundColor: "#f9f9fb",
            borderRadius: 2,
          }}
        >
          {messages.length === 0 && (
            <Typography color="text.secondary" textAlign="center">
              Start chatting by asking a cooking question 🍲
            </Typography>
          )}
          {messages.map((msg, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"}
              mb={1.5}
            >
              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  maxWidth: "75%",
                  backgroundColor:
                    msg.sender === "user" ? "#d1e7ff" : "#e8f5e9",
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        {/* Input area */}
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ask a cooking question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleAsk();
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAsk}
            disabled={loading}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : "Send"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
