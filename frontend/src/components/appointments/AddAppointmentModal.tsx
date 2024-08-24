import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
// import { NumericFormat, NumericFormatProps } from 'react-number-format';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box'
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';

import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Autocomplete from '@mui/joy/Autocomplete';





const doctors = [
  { value: 'olivia', label: 'Dr. Olivia Rhye' },
  { value: 'steve', label: 'Dr. Steve Hampton' },
  { value: 'ciaran', label: 'Dr. Ciaran Murray' },
  { value: 'marina', label: 'Dr. Marina Macdonald' },
  { value: 'charles', label: 'Dr. Charles Fulton' },
  { value: 'jay', label: 'Dr. Jay Hoper' },
];

const treatments = [
  { value: 'teethcleaning', label: 'Teeth Cleaning', price: 50.0 },
  { value: 'urinelabtest', label: 'Urine Lab Test', price: 20.0 },
  { value: 'malariatest', label: 'Malaria Test', price: 15.0 },
  { value: 'teethwhitening', label: 'Teeth Whitening', price: 75.0 },
  { value: 'generalcheckup', label: 'General Checkup', price: 30.0 },
];

interface AddAppointmentModalProps{
    open: boolean;
    onClose: () => void;
    onSubmit: (formData: any) => void;
    preselectedDoctor?: string | null;
}


// interface CustomProps {
//   onChange: (event: { target: { name: string; value: string } }) => void;
//   name: string;
// }

// const NumericFormatAdapter = React.forwardRef<NumericFormatProps, CustomProps>(
//   function NumericFormatAdapter(props, ref) {
//     const { onChange, ...other } = props;

//     return (
//       <NumericFormat
//         {...other}
//         getInputRef={ref}
//         onValueChange={(values) => {
//           onChange({
//             target: {
//               name: props.name,
//               value: values.value,
//             },
//           });
//         }}
        
//         valueIsNumericString
//         prefix="+"
//       />
//     );
//   },
// );

export default function AddAppointmentModal({open, onClose, onSubmit, preselectedDoctor}: AddAppointmentModalProps) {
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

  const handleTreatmentChange = (event: any, newValue: string | null) => {
    setSelectedTreatment(newValue);
    const treatment = treatments.find((t) => t.value === newValue);
    setPrice(treatment?.price || '');
  };

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
      <ModalDialog sx={{width: {xs: '100%'}, mt: {xs: '5%'}}}>
        <DialogTitle sx={{ fontSize: '1.2rem' }}>
          Add Appointment
          <ModalClose variant="plain" sx={{ m: 1 }} />
        </DialogTitle>

        <DialogContent sx={{ marginTop: '1rem', pb: {xs: '1rem'} }}>
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
              <FormControl>
                <FormLabel>Doctor</FormLabel>
                <Autocomplete
                  value={selectedDoctor}
                  onChange={(event, newValue) => setSelectedDoctor(newValue)}
                  size="sm"
                  options={doctors.map((option) => option.label)}
                  slotProps={{
                    input: {
                      placeholder: 'Select doctor',
                    },
                  }}
                />
              </FormControl>

              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Treatment</FormLabel>
                <Select
                  size="sm"
                  placeholder="Select Treatment"
                  value={selectedTreatment}
                  onChange={handleTreatmentChange}
                >
                  {treatments.map((treatment) => (
                    <Option key={treatment.value} value={treatment.value}>
                      {treatment.label}
                    </Option>
                  ))}
                </Select>
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

            <Box sx={{display: 'flex', gap: 2}}>
              <Button
                      color="neutral"
                      size="sm"
                      sx={{width: "50%"}}
                      onClick={onClose}
                      >
                      Cancel
                  </Button>
                <Button color="primary" size="sm" sx={{ width: '50%' }} onClick={handleFormSubmit}>
                  Submit
                </Button>
             </Box>
          </Stack>
        </DialogContent>
      </ModalDialog>
    </Modal>
  </React.Fragment>
  );
}
