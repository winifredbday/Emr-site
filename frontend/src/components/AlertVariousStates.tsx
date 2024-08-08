import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ReportIcon from '@mui/icons-material/Report';

interface AlertProps {
  message: string;
  type: 'success' | 'error';
}

const AlertVariousStates: React.FC<AlertProps> = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  const icons = {
    success: <CheckCircleIcon />,
    error: <ReportIcon />
  };

  const colors: Record<'success' | 'error', 'success' | 'danger'> = {
    success: 'success',
    error: 'danger',
  };

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Alert
        sx={{ alignItems: 'flex-start' }}
        startDecorator={icons[type]}
        variant="soft"
        color={colors[type]}
        endDecorator={
          <IconButton
            variant="soft"
            color={colors[type]}
            onClick={handleClose}
          >
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
