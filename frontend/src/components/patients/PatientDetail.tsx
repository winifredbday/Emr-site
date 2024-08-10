import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Tab, {tabClasses} from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box'



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
    return (
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
                            <Typography level="body-sm" sx={{fontSize: '12px', pt: 1}}>14th April, 2003</Typography>
                        </Box>
                        <Box sx={{p: 1}}>
                            <Typography level="title-sm">Height:</Typography>
                            <Typography level="body-sm" sx={{fontSize: '12px', pt: 1}}>1.6m</Typography>
                        </Box>
                        <Box sx={{p: 1}}>
                            <Typography level="title-sm">Email:</Typography>
                            <Typography level="body-sm" sx={{fontSize: '12px', pt: 1}}>user@test.com</Typography>
                        </Box>
                        
                    </Box>
                    <Box>
                        <Box sx={{p: 1}}>
                            <Typography level="title-sm">Phone:</Typography>
                            <Typography level="body-sm" sx={{fontSize: '12px', pt: 1}}>(+233) 557 31 1180</Typography>
                        </Box>
                        <Box sx={{p: 1}}>
                            <Typography level="title-sm">Address:</Typography>
                            <Typography level="body-sm" sx={{fontSize: '12px', pt: 1}}>Chico Street of 22nd Avenue</Typography>
                        </Box>
                        <Box sx={{p: 1}}>
                            <Typography level="title-sm">Work:</Typography>
                            <Typography level="body-sm" sx={{fontSize: '12px', pt: 1}}>Software Developer</Typography>
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
        
    )
}