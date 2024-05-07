import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {

  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchUsersData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:8080/api/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const responseData = await response.json();
            setUserData(responseData.data);
          } else {
            navigate('/');
            console.error('Error fetching data:', response.statusText);
          }
        } catch (error) {
          navigate('/');
          console.error('Fetch error:', error);
        }
      } else {
        navigate('/');
        // Handle case where token is not available (user is not authenticated)
        console.error('User is not authenticated');
      }
    };

    fetchUsersData();
  }, []);


  return (
    <div style={{ paddingTop: '20px' }}>
      <h2>Users List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>First Name</b></TableCell>
              <TableCell><b>Last Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Mobile</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.emailId}</TableCell>
                <TableCell>{user.mobileNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
};

export default HomePage;