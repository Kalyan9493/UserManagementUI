import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    footer: {
      backgroundColor: '#333', // Example color
      color: '#fff', // Example text color
      padding: theme.spacing(2), // Adjust the spacing as needed
    },
  }));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      {/* Empty footer */}
    </footer>
  );
}

export default Footer;
