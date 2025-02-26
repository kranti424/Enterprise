import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem button component={Link} to="/data-entry">
          <ListItemText primary="Data Entry" />
        </ListItem>
        <ListItem button component={Link} to="/document-processing">
          <ListItemText primary="Document Processing" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
