import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

export default function DoctorDashboard() {
  return (
    <Box>
      <Typography level="h4" component="h4">
        Doctor Dashboard
      </Typography>
      <Typography level="body-sm" component="p">
        Here is the content specific to doctors.
      </Typography>
      {/* Add more doctor-specific content here */}
    </Box>
  );
}
