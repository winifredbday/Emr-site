import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';

interface AddPatientModalProps{
    open: boolean;
    onClose: () => void;
}
export default function AddPatientModal({open, onClose}: AddPatientModalProps) {
 
  return (
    <React.Fragment>
     
      <Modal keepMounted open={open} onClose={onClose} sx={{}}>
        <ModalDialog>
          <DialogTitle sx={{fontSize: '1.2rem'}}>Add Patient Details  <ModalClose variant="plain" sx={{ m: 1 }} /></DialogTitle>
          <DialogContent sx={{marginTop: '1rem'}}>
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{ display: "flex", flexDirection: {sm: 'row', xs: 'column', md: 'row' }, gap: 2 }}
                >
                  <Input size="sm" placeholder="First name" />
                  <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} />
                </FormControl>
              </Stack>
              <Stack spacing={1} direction={{sm: 'row'}} flexWrap="wrap" useFlexGap>
                  <FormControl>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input
                        sx={{fontSize: "14px"}}
                        type="date"
                        slotProps={{
                          input: {
                            min: '1900-12-31',
                            max: '2024-12-31',
                          },
                        }}
                      />
                    
                  </FormControl>
                  <FormControl>
                      <FormLabel>Gender</FormLabel>
                        
                      <Stack spacing={2} alignItems="flex-start">
                        <Select
                          placeholder="Select Gender"
                          name="Gender"
                          required
                          sx={{ minWidth: 200, fontSize: '14px' }}
                          
                        >
                          <Option value="Male" sx={{ minWidth: 200, fontSize: '14px' }}>Male</Option>
                          <Option value="Female" sx={{ minWidth: 200, fontSize: '14px' }}>Female</Option>
                          <Option value="Suspended" sx={{ minWidth: 200, fontSize: '14px' }}>Other</Option>
                        
                        </Select>
                        
                      </Stack>
                        
                  </FormControl>
                  <FormControl>
                    <FormLabel>Social Security No.</FormLabel>
                    <Input size="sm" type='text' placeholder="SSN" />
                  </FormControl>
              </Stack>
              <Stack spacing={1}>
                <FormLabel>Address</FormLabel>
                <FormControl
                  sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                >
                 
                  <Input size="sm" placeholder="Address" sx={{ flexGrow: 1 }} />
                </FormControl>
              </Stack>
              <Stack direction={{sm: 'row', xs: 'column'}} spacing={2} flexWrap="wrap" useFlexGap>
                <FormControl>
                  <FormLabel>Phone number</FormLabel>
                  <Input size="sm" placeholder="+233 557 31 1180" sx={{flexGrow: 1}} />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="siriwatk@test.com"
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2} sx={{width: "100%"}}>
                <Button
                    color="neutral"
                    size="sm"
                    sx={{width: "50%"}}
                    onClick={onClose}
                    >
                    Cancel
                </Button>

                <Button
                    color="primary"
                    size="sm"
                    sx={{width: "50%"}}
                    >
                    Submit
                </Button>
              </Stack>
             
            </Stack>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
