import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, {tabClasses} from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box'
export default function PatientDetail(){
    return (
        <Tabs aria-label="Basic tabs" defaultValue={0}>
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
          <Tab>Next Treatment</Tab>
        </TabList>
        <TabPanel value={0} sx={{border: '1px solid red', display: 'flex', gap: 3}}>
          <Box sx={{p: 1}}>
            <Typography level="title-sm">Date of Birth:</Typography>
            <Typography level="body-sm" sx={{fontSize: '12px', pt: 1}}>14th April, 2003</Typography>
          </Box>
          <Box sx={{p: 1}}>
            <Typography level="title-sm">Email:</Typography>
            <Typography level="body-sm" sx={{fontSize: '12px', pt: 1}}>user@test.com</Typography>
          </Box>
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
          
        </TabPanel>
        <TabPanel value={1}>
          <b>Second</b> tab panel
        </TabPanel>
        <TabPanel value={2}>
          <b>Third</b> tab panel
        </TabPanel>
      </Tabs>
    )
}