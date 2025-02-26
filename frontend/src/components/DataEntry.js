import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const DataEntry = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to the backend
    const data = {
      name,
      age,
      address,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/data-entry', data);
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage('Error submitting data.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Data Entry</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default DataEntry;
