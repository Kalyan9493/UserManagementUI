import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70vh',
    backgroundColor: 'inherit',
  },
  form: {
    width: '100%',
    maxWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  error: {
    color: 'red',
  },
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    const loginData = {
      username,
      password,
    };
    const newErrors = {};

    if (!username) {
      newErrors.username = 'First Name is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await fetch(process.env.REACT_APP_BASE_URL + '/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        var UserResponse = await response.json();
        console.log(UserResponse)
        if (UserResponse.status === "error") {
          alert(UserResponse.message)
        }
        if (UserResponse.status === "success") {
          login();
          localStorage.setItem('token', UserResponse.data.token);
          localStorage.setItem('user', JSON.stringify(UserResponse.data.emailId));
          navigate('/test');
          console.log('User logged in successfully');
        }
      } else {
        // Error signing up
        console.error('Error signing up:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ paddingTop: '20px'}}>
      <Container className={classes.root} maxWidth="sm">
        <div>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              id="username"
              label="Email/Mobile"
              variant="outlined"
              value={username}
              onChange={handleUsernameChange}
              error={errors.username}
              helperText={errors.username}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              error={errors.password}
              helperText={errors.password}
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </Container>
    </div>

  );
};

export default Login;
