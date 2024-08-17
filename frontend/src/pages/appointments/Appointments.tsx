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
import AddAppointmentModal from '../../components/appointments/AddAppointmentModal';

interface Appointment {
  id: string;
  time: string;
  treatment: string;
  price: number;
  doctor: string;
  patient: {
    firstName: string;
    lastName: string;
  };
}

interface Doctor {
  id: string;
  doctor: string;
  avatar: string;
  available: string;
  appointments: Appointment[];
}

const initialListItems = [
  {
      id: 'STF-001',
      doctor: 'Dr. James Hayford',
      avatar: '/user/avatar.jpg',
      available: 'yes',
      appointments: [
          {
              id: 'APT-001',
              time: '09:00 AM - 10:00 AM', 
              treatment: 'Full Medical Checkup',
              price: 150,
              doctor: 'Dr. James Hayford',
              patient: { firstName: 'Trudy', lastName: 'Jackson' }
          },
          {
              id: 'APT-002',
              time: '12:00 PM - 01:00 PM', 
              treatment: 'Teeth Cleaning',
              price: 200,
              doctor: 'Dr. James Hayford',
              patient: { firstName: 'James', lastName: '' }
          },
          {
              id: 'APT-003',
              time: '12:00 PM - 01:00 PM', 
              treatment: 'Lab Analysis',
              price: 300,
              doctor: 'Dr. James Hayford',
              patient: { firstName: 'James', lastName: 'McGriffen' }
          }
      ]
  },
  {
      id: 'STF-002',
      doctor: 'Dr. Harley Quinzel',
      avatar: '/user/avatar.jpg',
      available: 'yes',
      appointments: [
          {
              id: 'APT-004',
              time: '09:00 AM - 10:00 AM', 
              treatment: 'Full Medical Checkup',
              price: 150,
              doctor: 'Dr. Harley Quinzel',
              patient: { firstName: 'Trudy', lastName: 'Jackson' }
          },
          {
              id: 'APT-005',
              time: '12:00 PM - 01:00 PM', 
              treatment: 'Teeth Cleaning',
              price: 200,
              doctor: 'Dr. Harley Quinzel',
              patient: { firstName: 'James', lastName: 'McGriffen' }
          }
      ]
  },
  {
      id: 'STF-003',
      doctor: 'Dr. Michael Kelso',
      avatar: '/user/avatar.jpg',
      available: 'no',
      appointments: []
  },
  {
      id: 'STF-004',
      doctor: 'Dr. Jackie Burkhart',
      avatar: '/user/avatar.jpg',
      available: 'yes',
      appointments: []
  }
];

export default function Appointments(){
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [listItems, setListItems] = React.useState<Doctor[]>(initialListItems);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const handleSubmitAppointment = (newAppointment: any) => {
      console.log("New Appointment Data:", newAppointment)
      setListItems(prevItems => {
        console.log("Previous Items:", prevItems);

        const doctorExists = prevItems.some(item => item.doctor === newAppointment.doctor);
        let updatedItems;

        if (doctorExists) {
          // If doctor exists, update appointments
          updatedItems = prevItems.map(item => {
              if (item.doctor === newAppointment.doctor) {
                  return {
                      ...item,
                      appointments: [...item.appointments, newAppointment]
                  };
              }
              return item;
          });
        }else {
            // If doctor does not exist, add new doctor with the appointment
            updatedItems = [
                ...prevItems,
                {
                  id: newAppointment.doctor + '_id', // Generate or fetch proper ID
                  doctor: newAppointment.doctor,
                  avatar: '', // Provide default or fetched avatar
                  available: '', // Provide default or fetched availability
                  appointments: [newAppointment]
                }
            ];
        }
        console.log("Updated Items:", updatedItems);
        return updatedItems;
      });
      handleClose();
  };

  const totalAppointments = listItems.reduce((count, doctor) => count + doctor.appointments.length, 0);
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
            <Typography component="h2" level="h2">{totalAppointments}</Typography>
            <Typography level="body-sm" fontWeight={600}>Total Appointments</Typography>
        </Box>
        <Button
          color="primary"
          startDecorator={<AddRoundedIcon />}
          size="sm"
          onClick={handleOpen}
        >
          Add Appointment
        </Button>
        
      </Box>
      {/* Appointments Content */}
      <AppointmentsTable listItems={listItems} onSubmitAppointment={handleSubmitAppointment}/>
      <AddAppointmentModal open={modalOpen} onClose={handleClose} onSubmit={handleSubmitAppointment} />
    </Box>
    )
}