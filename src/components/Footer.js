import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: "inherit",
  },
  toolbar: {
    justifyContent: 'center',
  },
  text: {
    color: 'black', // Change text color here
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="body1" className={classes.text}>
          &copy; 2024 Your Company
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
