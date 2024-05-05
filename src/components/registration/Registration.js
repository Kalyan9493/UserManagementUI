import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  error: {
    color: 'red',
  },
}));

const Register = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async () => {
    const userData = {
      firstName,
      lastName,
      emailId,
      countryCode,
      mobileNumber,
      password,
    };
    const newErrors = {};

    if (!firstName) {
      newErrors.firstName = 'First Name is required';
    }
    if (!lastName) {
      newErrors.lastName = 'Last Name is required';
    }
    if (!emailId) {
      newErrors.emailId = 'Email is required';
    }
    if (!countryCode) {
      newErrors.countryCode = 'Country Code is required';
    }
    if (!mobileNumber) {
      newErrors.mobileNumber = 'Mobile Number is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/user/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        var UserResponse = await response.json();
        console.log(UserResponse)
        if(UserResponse.status === "error"){
          alert(UserResponse.message)
        }
        if(UserResponse.status === "success"){
          navigate('/');
          console.log('User signed up successfully');
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
    <Container className={classes.root} maxWidth="sm">
      <div>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="firstName"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={handleFirstNameChange}
            error={errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={handleLastNameChange}
            error={errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            id="emailId"
            label="Email"
            type="emailId"
            variant="outlined"
            value={emailId}
            onChange={handleEmailChange}
            error={errors.emailId}
            helperText={errors.emailId}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <TextField
              id="countryCode"
              label="Country Code"
              variant="outlined"
              value={countryCode}
              onChange={handleCountryCodeChange}
              error={errors.countryCode}
              helperText={errors.countryCode}
              style={{ flex: '1' }}
            />
            <TextField
              id="mobileNumber"
              label="Mobile Number"
              variant="outlined"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              error={errors.mobileNumber}
              helperText={errors.mobileNumber}
              style={{ flex: '2' }}
            />
          </div>
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
          <Button variant="contained" color="primary" onClick={handleSignup}>
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Register;