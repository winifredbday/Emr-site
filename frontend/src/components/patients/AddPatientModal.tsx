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
                  sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                >
                  <Input size="sm" placeholder="First name" />
                  <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} />
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
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Phone number</FormLabel>
                  <Input size="sm" placeholder="+233 557 31 1180" />
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
              <Button
                color="primary"
                size="sm"
                sx={{width: "100%"}}
                >
                Add Patient
              </Button>
             
            </Stack>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
