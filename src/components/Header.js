import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'inherit', // Change background color here
  },
}));

const Header = () => {
  const classes = useStyles();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("token", "");
    navigate("/");
  }

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, color: 'black' }}>
          Practice Test
        </Typography>
        {isLoggedIn ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button component={Link} to="/">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
