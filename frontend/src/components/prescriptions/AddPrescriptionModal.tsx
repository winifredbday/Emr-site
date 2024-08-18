import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';


import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box'
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';

import ModalClose from '@mui/joy/ModalClose';

import Autocomplete from '@mui/joy/Autocomplete';





const doctors = [
  { value: 'olivia', label: 'Dr. Olivia Rhye' },
  { value: 'steve', label: 'Dr. Steve Hampton' },
  { value: 'ciaran', label: 'Dr. Ciaran Murray' },
  { value: 'marina', label: 'Dr. Marina Macdonald' },
  { value: 'charles', label: 'Dr. Charles Fulton' },
  { value: 'jay', label: 'Dr. Jay Hoper' },
];


interface AddAppointmentModalProps{
    open: boolean;
    onClose: () => void;
    onSubmit: (formData: any) => void;
    preselectedDoctor?: string | null;
}





export default function AddPrescriptionModal({open, onClose, onSubmit, preselectedDoctor}: AddAppointmentModalProps) {
  const [selectedDoctor, setSelectedDoctor] = React.useState<string | null>(preselectedDoctor || null);
  const [selectedTreatment, setSelectedTreatment] = React.useState<string | null>(null);
  const [price, setPrice] = React.useState<number | string>('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');

  const [time, setTime] = React.useState<string>('');

  React.useEffect(() => {
      if (preselectedDoctor) {
          setSelectedDoctor(preselectedDoctor);
      }
  }, [preselectedDoctor]);



  const handleFormSubmit = () => {
    const formData = {
      doctor: selectedDoctor,
      treatment: selectedTreatment,
      price: price,
      time: time,
      patient: {
        firstName: firstName,
        lastName: lastName,
      },
    };
    onSubmit(formData);  // Call the onSubmit function with form data
  };

  return (
    <React.Fragment>
    <Modal keepMounted open={open} onClose={onClose} sx={{}}>
      <ModalDialog>
        <DialogTitle sx={{ fontSize: '1.2rem' }}>
          Add Prescription
          <ModalClose variant="plain" sx={{ m: 1 }} />
        </DialogTitle>

        <DialogContent sx={{ marginTop: '1rem' }}>
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <FormLabel>Patient</FormLabel>
              <Box sx={{ display: 'flex', flexDirection: { sm: 'row', xs: 'column', md: 'row' }, gap: 2 }}>
                <FormControl>
                    <Input
                        size="sm"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}  // Capture first name
                    />
                </FormControl>
                <FormControl>
                    <Input
                        size="sm"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}  // Capture last name
                        sx={{ flexGrow: 1 }}
                    />
                </FormControl>
            </Box>
            </Stack>

            <Stack spacing={1} direction={{ sm: 'row' }} flexWrap="wrap" sx={{ gap: 2 }}>
              <FormControl sx={{flexGrow: 1}}>
                <FormLabel>Doctor</FormLabel>
                <Autocomplete
                  value={selectedDoctor}
                  onChange={(event, newValue) => setSelectedDoctor(newValue)}
                  size="sm"
                  sx={{width: '48%'}}
                  options={doctors.map((option) => option.label)}
                  slotProps={{
                    input: {
                      placeholder: 'Select doctor',
                    },
                  }}
                />
              </FormControl>

              
            </Stack>

            <Stack spacing={1} direction={{ sm: 'row', xs: 'column', md: 'row' }}>
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Price</FormLabel>
                <Input startDecorator={'$'} size="sm" value={price} readOnly placeholder="Price" />
              </FormControl>
              <FormControl>
                <FormLabel>Time</FormLabel>
                <Input size="sm" type="time" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} />
              </FormControl>
            </Stack>

            <Button
              color="primary"
              size="sm"
              sx={{ width: "50%" }}
              onClick={handleFormSubmit}  // Trigger form submission
            >
              Submit
            </Button>
          </Stack>
        </DialogContent>
      </ModalDialog>
    </Modal>
  </React.Fragment>
  );
}
