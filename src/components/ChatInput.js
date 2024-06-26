import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress, Slide } from '@mui/material';
import { getChatResponse } from '../api';

function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const recognition = new window.webkitSpeechRecognition(); // Initialize SpeechRecognition
  recognition.continuous = true; // Continuous recognition mode
  recognition.lang = 'en-US'; // Set language to English

  recognition.onstart = () => {
    console.log('Speech recognition started.');
    setIsListening(true); // Update state to indicate speech recognition is active
  };

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    setInput((prevInput) => prevInput + ' ' + transcript); // Append transcript to existing input
  };

  recognition.onend = () => {
    setIsListening(false); // Update state to indicate speech recognition has stopped
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop(); // Stop speech recognition
    } else {
      recognition.start(); // Start speech recognition
    }
    setIsListening(!isListening); // Toggle listening state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await getChatResponse(input.trim()); // Trim input to remove leading/trailing spaces
    onSendMessage(input, response);

    setInput('');
    setIsLoading(false);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000); // Reset showMessage after 3 seconds (adjust as needed)
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={2}>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="How are you feeling today?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ backgroundColor: '#FFFFFF', mr: 1 }} // White background for TextField
      />
      <Button
        type="button"
        variant="contained"
        color={isListening ? 'secondary' : 'primary'}
        fullWidth
        disableElevation
        onClick={toggleListening}
        sx={{
          mt: 1,
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#597445', // Darker shade for hover effect
          },
        }}
      >
        {isListening ? 'Stop' : 'Speak'}
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        disableElevation
        disabled={isLoading}
        sx={{
          mt: 1,
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#597445', // Darker shade for hover effect
          },
          textTransform: 'none', // Prevents uppercase transformation
        }}
        endIcon={
          isLoading ? (
            <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />
          ) : (
            undefined
          )
        }
      >
        {isLoading ? 'TherapAI is understanding' : 'Send'}
      </Button>
      {showMessage && (
        <Slide direction="left" in={showMessage} mountOnEnter unmountOnExit>
          <Box mt={1} fontSize={14} color="#729762">
            Message sent successfully!
          </Box>
        </Slide>
      )}
    </Box>
  );
}

export default ChatInput;
