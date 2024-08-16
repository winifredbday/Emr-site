import * as React from 'react';
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

const listItems = [
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
                patient: 'Miss. Trudy'
            },
            {
                id: 'APT-002',
                time: '12:00 PM - 01:00 PM', 
                treatment: 'Teeth Cleaning',
                patient: 'Mr. James'
            },
            {
                id: 'APT-003',
                time: '12:00 PM - 01:00 PM', 
                treatment: 'Lab Analysis',
                patient: 'Mr. James McGriffen'
            },
            {
                id: 'APT-003',
                time: '12:00 PM - 01:00 PM', 
                treatment: 'Lab Analysis',
                patient: 'Mr. James McGriffen'
            },
        ]
    },
    {
        id: 'STF-002',
        doctor: 'Dr. Harley Quinzel',
        avatar: '/user/avatar.jpg',
        available: 'yes',
        appointments: [
            {
                id: 'APT-001',
                time: '09:00 AM - 10:00 AM', 
                treatment: 'Full Medical Checkup',
                patient: 'Miss Trudy Jackson'
            },
            {
                id: 'APT-002',
                time: '12:00 PM - 01:00 PM', 
                treatment: 'Teeth Cleaning',
                patient: 'Mr. James McGriffen'
            },
            
        ]
    },
    {
        id: 'STF-003',
        doctor: 'Dr. Michael Kelso',
        avatar: '/user/avatar.jpg',
        available: 'no',
        appointments: [
            
            
        ]
    },
    {
        id: 'STF-004',
        doctor: 'Dr. Jackie Burkhart',
        avatar: '/user/avatar.jpg',
        available: 'yes',
        appointments: [
            
            
        ]
    }

    
]

function RowMenu() {
    return (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem>
            <AddRoundedIcon /> 
            Add Appointment
          </MenuItem>
          <Divider />
          <MenuItem>
            <EventBusyRoundedIcon/> 
            Set unavailability
          </MenuItem>
        </Menu>
      </Dropdown>
    );
  }


export default function AppointmentsTable(){
    return (
        <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ mt: 1, height: '100%'}}>
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
            <TabPanel value={0} sx={{p: 0}}>
                <Box sx={{display: 'flex', gap: 1, p: 1, flexWrap: 'wrap', height: '100%'}}>
                
                    {listItems.map((listItem, index) => (
                        <Box key={listItem.id} sx={{ minWidth: '300px', p: 1, maxHeight: '50vh', position: 'relative'}}>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Avatar size="sm" src={listItem.avatar}/>
                                <div>
                                    <Typography sx={{fontSize: '14px', fontWeight: 'bold'}}>{listItem.doctor}</Typography>
                                    <Typography sx={{fontSize: '10px'}}>
                                        Today's appointments: <Typography component="b">{listItem.appointments.length} patient(s)</Typography>
                                    </Typography>
                                </div>
                                <RowMenu />
                            </Box>
                            <Box 
                              sx={{
                                mt: 1, 
                                height: '90%', 
                                overflowY: 'scroll', 
                                position: 'relative',
                                pr: 2,
                                '&::-webkit-scrollbar': {
                                    width: '8px'
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
                              {listItem.available=='no' ? (
                                <Box sx={{background: 'rgba(0,41,150,0.2)', p: 1, mt: 1, borderRadius: '10px', height: '98px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Typography level="body-md" sx={{fontWeight: 'bold'}}>NOT AVAILABLE</Typography>
                                </Box>
                              ) : (
                                listItem.appointments.map((appointment, index) => (
                                    <Box key={appointment.id} sx={{p: 1,mt: 1, background: index % 2 === 0 ? 'rgba(155,220,150,0.36)' : 'rgba(223,84,150,0.11)', borderRadius: '10px'}}>
                                        <Box>
                                            <Typography sx={{fontSize: '13px', fontWeight: 'bold'}}>{appointment.patient}</Typography>
                                        </Box>
                                        <Typography level="body-xs">{appointment.time}</Typography>
                                        <Typography sx={{p: .8, fontWeight: 'bold', color: 'black', mt: 2, width:'fit-content', borderRadius: '50px', background: 'white', fontSize: '10px'}}>{appointment.treatment}</Typography>
                                    </Box>
                                  ))
                              )}
                            </Box>
                        </Box>
                    ))}
                    
                    
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
                                    <Typography level="body-xs" sx={{minWidth: 200}}></Typography>
                                    
                                    <Typography level="body-xs" sx={{minWidth: 200}}>yo</Typography>
                                    <Typography level="body-xs">&bull;</Typography>
                                    <Typography level="body-xs" sx={{minWidth: 200}}></Typography>
                                </Box>
                            
                            
                            </ListItemContent>
                        
                        </ListItem>
                        <ListDivider />
                    </List>
                ))}
            </Box>
            </TabPanel>
        </Tabs>
    )
}