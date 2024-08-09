import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import PatientDetail from '../../components/patients/PatientDetail';
import Avatar from '@mui/joy/Avatar';

import EditRoundedIcon from '@mui/icons-material/EditRounded';

export default function PatientDetailPage() {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
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
            href="#some-link"
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
      <Box
        sx={{
          display: 'flex',
          mb: 1,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {/* Avatar profile  */}
        <Box sx={{ display: 'flex', minWidth: '300px', alignItems: 'flex-end', gap: 1}}>
            <Avatar alt="Remy Sharp" src="/user/avatar.jpg" size="lg" sx={{width: 50, height: 50}} />
            <Box sx={{ml: 1}}>
                <Typography level="h4">Willie Jennie</Typography>
                <Typography component='p' sx={{fontSize: '10px', p: .2}}>Patient ID: 123456</Typography>
            </Box>
           
        </Box>
        <Button
          color="primary"
          startDecorator={<AddRoundedIcon />}
          size="sm"
          sx={{p: 1.2}}
          onClick={handleOpen}
        >
          Create Appointment
        </Button>
      </Box>
      <Button
          color="neutral"
          startDecorator={<EditRoundedIcon sx={{fontSize: '12px'}}/>}
          size="sm"
          sx={{p: 1, fontSize: '12px', width: 'fit-content'}}
          
        >
          Edit Profile
      </Button>
      <PatientDetail/>
      {/* <AddPatientModal open={modalOpen} onClose={handleClose} /> */}
    </Box>
  );
}