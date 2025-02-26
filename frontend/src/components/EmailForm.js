// src/components/EmailForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/send_email', {
        email,
        subject,
        body,
      });
      setMessage('Email sent successfully');
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Send an Email</Typography>
      <TextField
        label="Recipient Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Subject"
        variant="outlined"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <TextField
        label="Body"
        variant="outlined"
        multiline
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Send Email
      </Button>
      {message && <Typography color={message.startsWith('Error') ? 'error' : 'success'}>{message}</Typography>}
    </Box>
  );
};

export default EmailForm;
