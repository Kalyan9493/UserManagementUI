import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Test = () => {

  const [testData, setTestData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchTestsData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(process.env.REACT_APP_BASE_URL + '/tests', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const responseData = await response.json();
            setTestData(responseData.data);
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
        console.error('Something wrong while fetching test list');
      }
    };

    fetchTestsData();
  }, []);

  const handleRowClick = (row) => {
    console.log('Row clicked:', row);
    navigate('/question', { state: { selectedRow: row } });
  };

  const handleRowMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleRowMouseLeave = () => {
    setHoveredRow(null);
  };

  return (
    <div style={{ paddingTop: '20px' }}>
      <h2>List of Tests</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Duration</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testData.map((test) => (
              <TableRow key={test.testId} 
              onClick={() => handleRowClick(test)}
              onMouseEnter={() => handleRowMouseEnter(test.testId)} 
              onMouseLeave={handleRowMouseLeave}
              style={{ backgroundColor: hoveredRow === test.testId ? '#f5f5f5' : 'inherit' }}>
                <TableCell>{test.testId}</TableCell>
                <TableCell>{test.testName}</TableCell>
                <TableCell>{test.testDate}</TableCell>
                <TableCell>{test.testDuration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
};

export default Test;