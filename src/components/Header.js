import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#464A4D' }}>
      <Toolbar>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          User Management System
        </Typography>
        {/* Add additional header elements or actions here */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;