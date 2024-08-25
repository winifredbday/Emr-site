import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function PatientDashboard() {
  return (
    <Box>
      <Typography level="h4" component="h4">
        Patient Dashboard
      </Typography>
      <Typography level="body-sm" component="p">
        I am a patient motherfuckers!
      </Typography>
      {/* Add more patient-specific content here */}
    </Box>
  );
}
