import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from 'axios';  

function Chatbot() {
  const [userInput, setUserInput] = useState("");
  const [botResponse, setBotResponse] = useState("");

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    // Send input to backend for processing or response
    axios.post("http://localhost:5000/chatbot", { query: userInput })
      .then(response => setBotResponse(response.data.response))
      .catch(error => console.error("Error in chatbot query:", error));
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Chat with our Support Bot</Typography>
      <form onSubmit={handleChatSubmit}>
        <TextField
          label="Ask something"
          variant="outlined"
          fullWidth
          value={userInput}
          onChange={handleUserInput}
          required
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Ask
        </Button>
      </form>
      {botResponse && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body1"><strong>Bot Response:</strong> {botResponse}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default Chatbot;
