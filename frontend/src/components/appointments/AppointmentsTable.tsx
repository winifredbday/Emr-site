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


interface Patient {
    firstName: string;
    lastName: string;
}
interface Appointment {
    id: string;
    doctor: string;
    treatment: string;
    price: number;
    time: string;
    patient: Patient;
}
  
interface DoctorItem {
    id: string;
    doctor: string;
    avatar: string;
    available: string;
    appointments: Appointment[];
}

  
function RowMenu({ onAddAppointment }: { onAddAppointment: () => void }) {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem onClick={onAddAppointment}>
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
    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

    const handleAddAppointment = (doctor: string) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDoctor(null);
    };

    const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const handleSubmitAppointment = (newAppointment: Appointment) => {
        newAppointment.id = generateId();
        
        onSubmitAppointment(newAppointment);

        handleCloseModal();
    };


    const treatmentLabels: { [key: string]: string} = {
        'teethcleaning': 'Teeth Cleaning',
        'urinelabtest': 'Urine Lab Test',
        'malariatest': 'Malaria Test',
        'teethwhitening': 'Teeth Whitening',
        'generalcheckup': 'General Checkup',
    }
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
                        {listItems.map((listItem) => (
                            <Box key={listItem.id} sx={{ display: 'flex', flexDirection: 'column', minWidth: '295px', width: {xs: '100%', sm: 'fit-content'}, p: 1, maxHeight: '50vh', position: 'relative' }}>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Avatar size="sm" src={listItem.avatar} />
                                    <div>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>{listItem.doctor}</Typography>
                                        <Typography sx={{ fontSize: '10px' }}>
                                            Today's appointments: <Typography component="b">{listItem.appointments.length} patient(s)</Typography>
                                        </Typography>
                                    </div>
                                    <RowMenu onAddAppointment={() => handleAddAppointment(listItem.doctor)} />
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
                                            backgroundColor: '#888', // Customize the scrollbar thumb color
                                            borderRadius: '10px', // Make the scrollbar thumb rounded
                                        },
                                        '&::-webkit-scrollbar-thumb:hover': {
                                            backgroundColor: '#555', // Darker color on hover
                                        },
                                    }}
                                >
                                    {listItem.available === 'no' ? (
                                        <Box sx={{ background: 'rgba(0,41,150,0.2)', p: 1, mt: 1, borderRadius: '10px', height: '98px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography level="body-md" sx={{ fontWeight: 'bold' }}>NOT AVAILABLE</Typography>
                                        </Box>
                                    ) : (
                                        listItem.appointments.map((appointment, index) => (
                                            <Box key={appointment.id} sx={{ p: 1, mt: 1, background: index % 2 === 0 ? 'rgba(155,220,150,0.36)' : 'rgba(223,84,150,0.11)', borderRadius: '10px' }}>
                                                <Box>
                                                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}>{appointment.patient.firstName} {appointment.patient.lastName}</Typography>
                                                </Box>
                                                <Typography level="body-xs">{appointment.time}</Typography>
                                                <Typography sx={{ p: 0.8, fontWeight: 'bold', color: 'black', mt: 2, width: 'fit-content', borderRadius: '50px', background: 'white', fontSize: '10px' }}>{treatmentLabels[appointment.treatment] || appointment.treatment}</Typography>
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
                                        <Typography level="body-xs" sx={{ minWidth: {sm : 200}, fontWeight: 'bold' }}>{listItem.doctor}</Typography>
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