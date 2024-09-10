import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import { useParams } from 'react-router-dom';
import ListDivider from '@mui/joy/ListDivider';
import Tab, {tabClasses} from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box'
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddAppointmentModal from '../appointments/AddAppointmentModal';

interface Patient{
    id: string | number;
    user: {
      firstname: string;
      lastname: string;
      email: string;
    }
    address: string;
    contact_number: number;
    gender: 'Male' | 'Female' | 'Other';
    date_of_birth: string;
    work: string;
    height: number;
    status: 'Discharged' | 'Active' | 'Observation';
    reg_date: string;
   
    
}

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

const listItems = [
    {
      id: 'APT-001',
      date: 'Feb 3, 2023',
      doctor: 'Dr. James Hayford',
      treatment: 'Full Medical Checkup'
    },
    {
        id: 'APT-002',
        date: 'Feb 4, 2023',
        doctor: 'Dr. Mark McIntyre',
        treatment: 'Tooth Cavity Check'
    }
]

export default function PatientDetail(){
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = React.useState<Patient>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [appointmentListItems, setAppointmentListItems] = React.useState<Doctor[]>(initialListItems);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const handleSubmitAppointment = (newAppointment: any) => {
      console.log("New Appointment Data:", newAppointment)
      setAppointmentListItems(prevItems => {
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
    React.useEffect(() => {
        const fetchPatientDetail = async () => {
          try {
            const token = localStorage.getItem('token'); // or wherever you store your token
            const response = await fetch(`https://emr-backend.up.railway.app/accounts/patients/${id}/`, {
              method: 'GET',
              headers: {
                'Authorization': `Token ${token}`, // Add the token in the Authorization header
                'Content-Type': 'application/json'
              }
            });
            
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            console.log(data);
            setPatient(data);
          } catch (error) {
            console.error('Failed to fetch patient details:', error);
          }
        };
      
        fetchPatientDetail();
      }, [id]);
      
      if (!patient) {
        return <p>Loading...</p>;
      }


    return (
        
       <>
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
                    <Typography level="h4">{patient.user.firstname} {patient.user.lastname}</Typography>
                    <Typography component='p' sx={{fontSize: '10px', p: .2}}>Patient ID: {patient.id}</Typography>
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
        <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ mt: 1, minHeight: '60vh'}}>
            <TabList 
                sx={{
                    mt: 2,
                    fontSize: '14px',
                    fontWeight: 'bold',
                    
                    [`&& .${tabClasses.root}`]: {
                        flex: 'initial',
                        bgcolor: 'transparent',
                        '&:hover': {
                        bgcolor: 'transparent',
                        },
                        [`&.${tabClasses.selected}`]: {
                        color: 'primary.plainColor',
                        '&::after': {
                            height: 2,
                            borderTopLeftRadius: 3,
                            borderTopRightRadius: 3,
                            bgcolor: 'primary.500',
                        },
                        },
                    },
                }}>
            <Tab>Patient Information</Tab>
            <Tab>Appointment History</Tab>
            
            </TabList>
            <TabPanel value={0}>
                <Box sx={{display: 'flex', gap: 5}}>
                    <Box>
                        <Box sx={{p: 1}}>
                            <Typography level="title-sm">Date of Birth:</Typography>
                            <Typography level="body-sm" sx={{fontSize: '12px', pt: 1}}>{patient.date_of_birth}</Typography>
                        </Box>
                        <Box sx={{p: 1}}>
                            <Typography level="title-sm">Height:</Typography>
                            <Typography level="body-sm" sx={{fontSize: '12px', pt: 1}}>{patient.height}m</Typography>
                        </Box>
                        <Box sx={{p: 1}}>
                            <Typography level="title-sm">Email:</Typography>
                            <Typography level="body-sm" sx={{fontSize: '12px', pt: 1}}>{patient.user.email}</Typography>
                        </Box>
                        
                    </Box>
                    <Box>
                        <Box sx={{p: 1}}>
                            <Typography level="title-sm">Phone:</Typography>
                            <Typography level="body-sm" sx={{fontSize: '12px', pt: 1}}>{patient.contact_number}</Typography>
                        </Box>
                        <Box sx={{p: 1}}>
                            <Typography level="title-sm">Address:</Typography>
                            <Typography level="body-sm" sx={{fontSize: '12px', pt: 1}}>{patient.address}</Typography>
                        </Box>
                        <Box sx={{p: 1}}>
                            <Typography level="title-sm">Work:</Typography>
                            <Typography level="body-sm" sx={{fontSize: '12px', pt: 1}}>{patient.work}</Typography>
                        </Box>
                    </Box>
                </Box>
            </TabPanel>
            {/* Tab 2 */}
            <TabPanel value={1}>
            <Box sx={{p: 1, width: '100%', height: '100%'}}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 1,
                    }}
                >
                    <Typography level="body-xs" sx={{minWidth: 10}}></Typography>
                    <Typography level="body-xs" sx={{minWidth: 200, fontWeight: 'bold'}}>Date</Typography>
                    <Typography level="body-xs" sx={{minWidth: 200, fontWeight: 'bold'}}>Doctor</Typography>
                    <Typography level="body-xs" sx={{minWidth: 200, fontWeight: 'bold'}}>Treatment</Typography>
                </Box>
                <ListDivider />
                {listItems.map((listItem, index) => (
                    <List
                        key={listItem.id}
                        size="sm"
                        sx={{
                            '--ListItem-paddingX': 0,
                        }}
                        >
                        <ListItem
                            sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start',
                            }}
                        >
                            <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 2,
                                        mb: 1,
                                    }}
                                >
                                    <Typography level="body-xs" sx={{minWidth: 10}}>{index + 1}</Typography>
                                    <Typography level="body-xs" sx={{minWidth: 200}}>{listItem.date}</Typography>
                                    
                                    <Typography level="body-xs" sx={{minWidth: 200}}>{listItem.doctor}</Typography>
                                    <Typography level="body-xs">&bull;</Typography>
                                    <Typography level="body-xs" sx={{minWidth: 200}}>{listItem.treatment}</Typography>
                                </Box>
                            
                            
                            </ListItemContent>
                        
                        </ListItem>
                        <ListDivider />
                    </List>
                ))}
            </Box>
            </TabPanel>
            
        </Tabs>
        <AddAppointmentModal 
            open={modalOpen} 
            onClose={handleClose} 
            onSubmit={handleSubmitAppointment}
            patientFirstName={patient.user.firstname}  // Pass the patient's first name
            patientLastName={patient.user.lastname} 
        />
       </>
        
    )
}