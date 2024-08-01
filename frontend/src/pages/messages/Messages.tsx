import * as React from 'react';
import Box from '@mui/joy/Box';
import MyMessages from '../../components/messages/MyMessages';

export default function Messages() {
  return (    
    <Box component="main" className="MainContent" sx={{ flex: 1 }}>
      <MyMessages />
    </Box>
  );
}