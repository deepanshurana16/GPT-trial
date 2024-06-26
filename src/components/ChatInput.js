import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, CircularProgress, Slide } from '@mui/material';
import { getChatResponse } from '../api';

function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setListening(true);
      };

      recognitionInstance.onend = () => {
        setListening(false);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await getChatResponse(input);
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
        placeholder={listening ? "Listening..." : "How are you feeling today?"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ backgroundColor: '#FFFFFF', mr: 1 }} // White background for TextField
      />
      <Button
        type="button"
        variant="contained"
        color="secondary"
        disableElevation
        disabled={isLoading}
        onClick={toggleListening}
        sx={{
          mt: 1,
          mr: 1,
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#597445', // Darker shade for hover effect
          },
          textTransform: 'none', // Prevents uppercase transformation
        }}
      >
        {listening ? 'Stop' : 'Speak'}
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
