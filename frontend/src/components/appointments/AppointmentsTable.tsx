import * as React from 'react';
import { useState } from 'react'; 
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ListDivider from '@mui/joy/ListDivider';
import Tab, {tabClasses} from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box'
import Avatar from '@mui/joy/Avatar';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import IconButton from '@mui/joy/IconButton';
import Divider from '@mui/joy/Divider';
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';
import AddAppointmentModal from './AddAppointmentModal';

interface Doctor {
    id: string;
    label: string;
  
  }
interface Patient {
    firstName: string;
    lastName: string;
}
interface Appointment {
    id: string;
    staff: string;
    treatment: string;
    price: number;
    appointment_date: string;
    patient: Patient;
}
  
interface DoctorItem {
    id: string;
    staff: string;
    avatar: string;
    available: string;
    appointments: Appointment[];
}

  
function RowMenu({ doctor, onAddAppointment }: { doctor: DoctorItem; onAddAppointment: (doctor: DoctorItem) => void }) {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem onClick={() => onAddAppointment(doctor)}>
                    <AddRoundedIcon /> 
                    Add Appointment
                </MenuItem>
                <Divider />
                <MenuItem><EventBusyRoundedIcon/> 
                    Set unavailability
                </MenuItem>
            </Menu>
        </Dropdown>
    );
}

interface AppointmentsTableProps {
    listItems: DoctorItem[];
    onSubmitAppointment: (appointment: Appointment) => void;
}

export default function AppointmentsTable({ listItems, onSubmitAppointment }: AppointmentsTableProps) {
   
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>(undefined);

    const handleAddAppointment = (doctor: DoctorItem) => {
        console.log("Handle Add Appointment Called with Doctor:", doctor);
        setSelectedDoctor({
            id: doctor.id,
            label: doctor.staff
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDoctor(undefined);
    };

    const handleSubmitAppointment = (newAppointment: Appointment) => {
        console.log("New Appointment Submitted:", newAppointment);
        onSubmitAppointment(newAppointment);
        handleCloseModal();
    };

    console.log("List Items:", listItems);
    console.log("Selected Doctor:", selectedDoctor);

    return (
        <>
            <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ mt: 1, height: '100%', display: 'flex', flexDirection: 'column'}}>
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
                    }}
                >
                    <Tab>Current</Tab>
                    <Tab>Log History</Tab>
                </TabList>
                <TabPanel value={0} sx={{ p: 0}}>
                    <Box sx={{ display: 'flex', gap: 1, p: 1, flexWrap: 'wrap', height: '100%'}}>
                        {listItems.map((doctor) => (
                            <Box key={doctor.id} sx={{ display: 'flex', flexDirection: 'column', minWidth: '295px', width: {xs: '100%', sm: 'fit-content'}, p: 1, maxHeight: '50vh', position: 'relative' }}>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Avatar size="sm" src={doctor.avatar} />
                                    <div>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>{doctor.staff}</Typography>
                                        <Typography sx={{ fontSize: '10px' }}>
                                            Today's appointments: <Typography component="b">{doctor.appointments.length} patient(s)</Typography>
                                        </Typography>
                                    </div>
                                    <RowMenu doctor={doctor} onAddAppointment={handleAddAppointment} />
                                </Box>
                                <Box 
                                    sx={{
                                        mt: 1, 
                                        height: '100%', 
                                        overflowY: 'scroll', 
                                        position: 'relative',
                                        pr: 2,
                                        '&::-webkit-scrollbar': {
                                            width: '8px',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                            backgroundColor: 'transparent', 
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            backgroundColor: '#888',
                                            borderRadius: '10px',
                                        },
                                        '&::-webkit-scrollbar-thumb:hover': {
                                            backgroundColor: '#555',
                                        },
                                    }}
                                >
                                    {doctor.available === 'no' ? (
                                        <Box sx={{ background: 'rgba(0,41,150,0.2)', p: 1, mt: 1, borderRadius: '10px', height: '98px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography level="body-md" sx={{ fontWeight: 'bold' }}>NOT AVAILABLE</Typography>
                                        </Box>
                                    ) : (
                                        doctor.appointments.map((appointment, index) => (
                                            <Box key={appointment.id} sx={{ p: 1, mt: 1, background: index % 2 === 0 ? 'rgba(155,220,150,0.36)' : 'rgba(223,84,150,0.11)', borderRadius: '10px' }}>
                                                <Box>
                                                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}>{appointment.patient.firstName} {appointment.patient.lastName}</Typography>
                                                </Box>
                                                <Typography level="body-xs">{appointment.appointment_date}</Typography>
                                                <Typography sx={{ p: 0.8, fontWeight: 'bold', color: 'black', mt: 2, width: 'fit-content', borderRadius: '50px', background: 'white', fontSize: '10px' }}>{appointment.treatment}</Typography>
                                            </Box>
                                        ))
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </TabPanel>
                <TabPanel value={1} sx={{width: {xs: '100%'}}}>
                    <Box sx={{ display: {xs: 'flex', sm: 'block'}, gap: 0, p: 1, flexDirection: 'column', height: '100%' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                mb: 1,
                                width: {xs: '100%'}
                            }}
                        >
                            <Typography level="body-xs" sx={{ minWidth: {sm : 10} }}></Typography>
                            <Typography level="body-xs" sx={{ minWidth: {sm : 200}, fontWeight: 'bold' }}>Date</Typography>
                            <Typography level="body-xs" sx={{ minWidth: {sm : 200}, fontWeight: 'bold' }}>Doctor</Typography>
                            <Typography level="body-xs" sx={{ minWidth: {sm : 200}, fontWeight: 'bold' }}>Treatment</Typography>
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
                                        bgcolor: index % 2 === 0 ? 'rgba(155,220,150,0.36)' : 'rgba(223,84,150,0.11)',
                                        paddingLeft: {xs: '.5rem'}
                                    }}
                                >
                                    <Typography level="body-xs" sx={{ minWidth: 10 }}>{index + 1}</Typography>
                                    <ListItemContent sx={{display: {sm: 'flex'}, gap: 2}}>
                                        <Typography level="body-xs" sx={{ minWidth: {sm : 200} }}>{new Date().toLocaleDateString()}</Typography>
                                        <Typography level="body-xs" sx={{ minWidth: {sm : 200}, fontWeight: 'bold' }}>{listItem.staff}</Typography>
                                        <Typography level="body-xs" sx={{ minWidth: {sm : 200} }}>{listItem.appointments[listItem.appointments.length - 1]?.treatment}</Typography>
                                    </ListItemContent>
                                </ListItem>
                            </List>
                        ))}
                    </Box>
                </TabPanel>
            </Tabs>

            <AddAppointmentModal 
                open={isModalOpen} 
                onClose={handleCloseModal} 
                preselectedDoctor={selectedDoctor}
                onSubmit={handleSubmitAppointment}
            />
        </>
    )
}
