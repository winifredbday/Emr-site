import * as React from 'react';
import Box from '@mui/joy/Box';

import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import PatientDetail from '../../components/patients/PatientDetail';


export default function PatientDetailPage() {
  
  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        px: { xs: 2, md: 6 },
        pt: {
          xs: 'calc(12px + var(--Header-height))',
          sm: 'calc(12px + var(--Header-height))',
          md: 3,
        },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100dvh',
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="small" />}
          sx={{ pl: 0 }}
        >
          <Link
            underline="none"
            color="neutral"
            href="#some-link"
            aria-label="Home"
          >
            <HomeRoundedIcon />
          </Link>
          <Link
            underline="hover"
            color="neutral"
            href="/patients"
            fontSize={12}
            fontWeight={500}
          >
            Patient list
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            Patient detail
          </Typography>
        </Breadcrumbs>
      </Box>
      
        
      {/* Edit Profile */}
      {/* <Button
          color="neutral"
          startDecorator={<EditRoundedIcon sx={{fontSize: '12px'}}/>}
          size="sm"
          sx={{p: 1, fontSize: '12px', width: 'fit-content'}}
          
        >
          Edit Profile
      </Button> */}
      <PatientDetail/>
      {/* <AddPatientModal open={modalOpen} onClose={handleClose} /> */}
    
    </Box>
  );
}