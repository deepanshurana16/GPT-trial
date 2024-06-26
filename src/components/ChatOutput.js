import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

function ChatOutput({ messages }) {
  return (
    <Box mt={2}>
      {messages.map((message, index) => (
        <Paper key={index} style={{ padding: '10px', margin: '10px 0', backgroundColor: message.role === 'user' ? '#E7F0DC' : '#729762' }}>
          <Typography variant="body1" color={message.role === 'user' ? 'textPrimary' : 'textSecondary'} sx={{ color: message.role === 'user' ? '#597445' : '#FFFFFF' }}>
            {message.content}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default ChatOutput;
