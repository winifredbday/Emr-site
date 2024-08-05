import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ModalClose from '@mui/joy/ModalClose';
import { Divider } from '@mui/joy';

interface AddStaffModalProps{
    open: boolean;
    onClose: () => void;
}
export default function AddStaffModal({open, onClose}: AddStaffModalProps) {
 
  return (
    <React.Fragment>
     
      <Modal keepMounted open={open} onClose={onClose} sx={{}}>
        <ModalDialog>
          <DialogTitle sx={{fontSize: '1.2rem'}}>Add Staff Member Details  <ModalClose variant="plain" sx={{ m: 1 }} /></DialogTitle>
          <DialogContent sx={{marginTop: '1rem'}}>
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                >
                  <Input size="sm" placeholder="First name" />
                  <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} />
                </FormControl>
              </Stack>
              <Stack direction={{sm: 'row', xs: 'column'}} spacing={2} flexWrap="wrap" useFlexGap>
                
                <FormControl>
                    <FormLabel>Address</FormLabel>
                  <Input size="sm" placeholder="14th Street off Mid Avenue" sx={{ flexGrow: 1 }} />
                </FormControl>

                <FormControl sx={{ flexGrow: 1 }} >
                    <FormLabel>Portfolio</FormLabel>
                  <Input size="sm" placeholder="Doctor" />
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
              <Stack>
                <FormControl sx={{ flexGrow: 1 }} >
                    <FormLabel>Assigned Treatment</FormLabel>
                    <Input size="sm" placeholder="Malaria and Fever Treatment" />
                </FormControl>
              </Stack>
              <Divider/>
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
