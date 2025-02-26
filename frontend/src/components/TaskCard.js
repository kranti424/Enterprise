import React from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";

function TaskCard({ title, description, onActionClick, buttonText }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
          {description}
        </Typography>
        <Button variant="contained" color="primary" onClick={onActionClick}>
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}

export default TaskCard;
