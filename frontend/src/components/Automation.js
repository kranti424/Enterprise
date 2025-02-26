// src/components/Automation.js
import React from 'react';
import { Button, Box, Typography } from '@mui/material';

const Automation = () => {
  const handleAutomationStart = () => {
    // Trigger automation logic here
  };

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h5">Automate Data Entry</Typography>
      <Button variant="contained" color="secondary" onClick={handleAutomationStart}>
        Start Automation
      </Button>
    </Box>
  );
};

export default Automation;
