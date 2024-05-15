import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Radio, RadioGroup, FormControl, FormControlLabel, Container, Box } from '@material-ui/core';

function Question() {

  const location = useLocation();
  const navigate = useNavigate();
  const selectedRow = location.state.selectedRow;
  const [questionsData, setQuestionsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Array to hold selected answers
  const [answerChecked, setAnswerChecked] = useState(false); // State to track whether answer is checked
  const [correctAnswer, setCorrectAnswer] = useState(''); // State to hold correct answer

  useEffect(() => {
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
        console.error('Something wrong while fetching test list');
      }
    };

    fetchQuestionsData();
  }, [selectedRow, navigate]);

  const handleNext = () => {
    if (currentIndex < questionsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption('');
      setAnswerChecked(false); // Reset answer check status
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(selectedAnswers[currentIndex - 1] || ''); // Set selected option to the previously selected answer
      setCorrectAnswer(questionsData[currentIndex - 1].answers.find(option => option.correct)?.answerText || '');
      setAnswerChecked(false); // Reset answer check status
    }
  };

  const handleCheck = async () => {
    if (!selectedOption) {
      alert("Select answer");
      return;
    }
  
    const correctAnswer = questionsData[currentIndex].answers.find(option => option.correct)?.answerText;
    setCorrectAnswer(correctAnswer);
  
    setAnswerChecked(true); // Set answer check status
  };

  const handleSubmit = () => {
    console.log("Need to submit");
    // Validate answers
    let correctCount = 0;
    for (let i = 0; i < questionsData.length; i++) {
      if (selectedAnswers[i] === questionsData[i].answers.find(option => option.correct)?.answerText) {
        correctCount++;
      }
    }
    console.log("Correct answers:", correctCount);
    // You can navigate to a result page or show a summary here
  }

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentIndex] = event.target.value;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  return (
    <div>
      <div>
        <h3>&nbsp; &nbsp; &nbsp;Test : {selectedRow.testName} &nbsp; &nbsp; &nbsp; Duration : {selectedRow.testDuration} minutes</h3>
      </div>
      <Container maxWidth="lg" style={{ paddingTop: '20px' }}>
        {questionsData.length > 0 && questionsData[currentIndex] ? (
          <div>
            <Typography variant="h5" gutterBottom>
              {questionsData[currentIndex].questionText}
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup value={selectedOption} onChange={handleChange}>
                {questionsData[currentIndex].answers.map((option, index) => (
                  <Box style={{
                    backgroundColor: answerChecked && option.answerText === correctAnswer ? 'green' :
                      answerChecked && option.answerText === selectedOption ? '#E74C3C' : 'inherit'
                  }}>
                    <FormControlLabel
                      key={index}
                      value={option.answerText}
                      control={<Radio />}
                      label={option.answerText}
                      style={{
                        color:'inherit'
                      }}
                    />
                  </Box>
                ))}
              </RadioGroup>
            </FormControl>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" onClick={handlePrevious} disabled={currentIndex === 0}>Previous</Button>
              <Button variant="contained" onClick={handleCheck}>Check</Button>
              <Button variant="contained" onClick={handleSubmit} disabled={currentIndex !== questionsData.length - 1}>Submit</Button>
              <Button variant="contained" onClick={handleNext} disabled={currentIndex === questionsData.length - 1}>Next</Button>
            </div>
          </div>
        ) : (
          <Typography variant="h5">Loading...</Typography>
        )}
      </Container>
    </div>
  );
}

export default Question;
