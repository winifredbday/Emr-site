import React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface AlertProps {
  message: string;
  type: 'success' | 'error';
}

const AlertVariousStates: React.FC<AlertProps> = ({ message, type }) => {
  const icons = {
    success: <CheckCircleIcon />,
    error: <CloseRoundedIcon />,
  };

  const colors: Record<'success' | 'error', 'success' | 'danger'> = {
    success: 'success',
    error: 'danger',
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Alert
        sx={{ alignItems: 'flex-start' }}
        startDecorator={icons[type]}
        variant="soft"
        color={colors[type]}
        endDecorator={
          <IconButton variant="soft" color={colors[type]}>
            <CloseRoundedIcon />
          </IconButton>
        }
      >
        <div>
          <Typography level="body-sm" color={colors[type]}>
            {message}
          </Typography>
        </div>
      </Alert>
    </Box>
  );
};

export default AlertVariousStates;
