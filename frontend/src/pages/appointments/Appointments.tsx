import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AppointmentsTable from '../../components/appointments/AppointmentsTable';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


export default function Appointments(){
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
      {/* Breadcrumbs */}
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
            href="/dashboard"
            aria-label="Home"
          >
            <HomeRoundedIcon />
          </Link>
          <Typography color="neutral" fontWeight={500} fontSize={12}>
            Clinic
          </Typography>
          
          <Typography color="primary" fontWeight={500} fontSize={12}>
            Appointments
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
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}}>
            <FormatListBulletedIcon/>
            <Typography component="h2" level="h2">5</Typography>
            <Typography level="body-sm" fontWeight={600}>Total Appointments</Typography>
        </Box>
        <Button
          color="primary"
          startDecorator={<AddRoundedIcon />}
          size="sm"
          
        >
          Add Appointment
        </Button>
        
      </Box>
      {/* Appointments Content */}
      <AppointmentsTable/>
    </Box>
    )
}