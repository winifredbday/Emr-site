import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, {tabClasses} from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';


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
        <TabPanel value={0}>
          <b>First</b> tab panel
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