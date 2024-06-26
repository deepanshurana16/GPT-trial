import React, { useState } from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import Header from './components/Header';
import ChatInput from './components/ChatInput';
import ChatOutput from './components/ChatOutput';
import { getChatResponse } from './api';

function App() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (userMessage, aiResponse) => {
    const userMsg = { role: 'user', content: userMessage };
    const aiMsg = { role: 'assistant', content: aiResponse };
    setMessages((prevMessages) => [...prevMessages, userMsg, aiMsg]);
  };

  return (
    <Container disableGutters>
      <CssBaseline />
      <Header />
      <Box mt={4}>
        <ChatOutput messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </Box>
    </Container>
  );
}

export default App;
