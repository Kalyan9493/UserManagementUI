import React, { useEffect , useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Radio, RadioGroup, FormControl, FormControlLabel, Container } from '@material-ui/core';

function Question() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedRow = location.state.selectedRow;
  const [questionsData, setQuestionsData] = useState([]);

  useEffect(() => {
    
    console.log('Selected Row Data:', selectedRow);
    const fetchQuestionsData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(process.env.REACT_APP_BASE_URL + '/questions/test/' + selectedRow.testId, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const responseData = await response.json();
            setQuestionsData(responseData.data);
            console.log(responseData);
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

    fetchQuestionsData();
  }, [selectedRow]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');


  const handleNext = () => {
    if (currentIndex < questionsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption('');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption('');
    }
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div>
        <h3>&nbsp; &nbsp; &nbsp;Test : {selectedRow.testName} &nbsp; &nbsp; &nbsp; Duration : {selectedRow.testDuration} minutes</h3>
      </div>
      <Container maxWidth="lg">
        <Typography variant="h5" gutterBottom>
          {questionsData[currentIndex].questionText}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={selectedOption} onChange={handleChange}>
            {questionsData[currentIndex].answers.map((option, index) => (
              <FormControlLabel key={index} value={option.answerText} control={<Radio />} label={option.answerText} />
            ))}
          </RadioGroup>
        </FormControl>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={handlePrevious} disabled={currentIndex === 0}>Previous</Button>
          <Button variant="contained" onClick={handleNext} disabled={currentIndex === questionsData.length - 1}>Next</Button>
        </div>
      </Container>
    </div>
  );
}

export default Question;