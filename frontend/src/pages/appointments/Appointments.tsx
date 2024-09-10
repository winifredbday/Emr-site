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
import axios from 'axios'
interface Appointment {
  id: string;
  appointment_date: string;
  treatment: string;
  price: number;
  staff: string;
  patient: {
    firstName: string;
    lastName: string;
  };
}

interface Doctor {
  id: string;
  staff: string;
  avatar: string;
  available: string;
  appointments: Appointment[];
}



export default function Appointments(){
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [listItems, setListItems] = React.useState<Doctor[]>([]);

     // Fetch data from the backend on component mount
    React.useEffect(() => {
    axios.get('https://emr-backend.up.railway.app/accounts/doctors/')
        .then(response => {
            const fetchedAppointments: Doctor[] = response.data.map((doctor: any) => ({
                id: doctor.id,
                staff: `Dr. ${doctor.user.firstname} ${doctor.user.lastname}`,
                avatar: doctor.avatar || '/user/default-avatar.jpg', // Assuming the API returns an avatar or fallback to a default
                available: doctor.available,
                appointments: doctor.appointments.map((appointment: any) => {
                  const formattedDate = new Date(appointment.appointment_date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });

                  const formattedTime = new Date(appointment.appointment_date).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,  // Use 'false' for 24-hour format
                  });
                  return {
                    id: appointment.id,
                    appointment_date: `${formattedDate} at ${formattedTime}`,
                    treatment: appointment.treatment.name,
                    price: appointment.price,
                    staff: `Dr. ${doctor.user.firstname} ${doctor.user.lastname}`,
                    patient: {
                        firstName: appointment.patient.firstName,
                        lastName: appointment.patient.lastName,
                    },
                }
            }),
            }));
            setListItems(fetchedAppointments);
        })
        .catch(error => console.error('Error fetching appointments:', error));
    }, []);
    console.log("Hydrus", listItems)
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const handleSubmitAppointment = (newAppointment: any) => {
      console.log("New Appointment Data:", newAppointment)
      setListItems(prevItems => {
        console.log("Previous Items:", prevItems);

        const doctorExists = prevItems.some(item => item.staff === newAppointment.staff);
        let updatedItems;

        if (doctorExists) {
          // If doctor exists, update appointments
          updatedItems = prevItems.map(item => {
              if (item.staff === newAppointment.doctor) {
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
                  id: newAppointment.id, // Generate or fetch proper ID
                  staff: newAppointment.doctor,
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