import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
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
import Divider from '@mui/joy/Divider';
import AlertVariousStates from '../../components/AlertVariousStates';
import axios from 'axios'
interface AddPatientModalProps {
  open: boolean;
  onClose: () => void;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatAdapter = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatAdapter(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        valueIsNumericString
        prefix="+"
      />
    );
  },
);

export default function AddPatientModal({ open, onClose }: AddPatientModalProps) {
  // State variables to store form data
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [height, setHeight] = React.useState('metres');
  const [heightValue, setHeightValue] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [ssn, setSsn] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');


  const [alert, setAlert] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Function to handle form submission
  const handleSubmit = async () => {
    const patientData = {
      firstname: firstName,
      lastname: lastName,
      date_of_birth: dob,
      gender,
      height: heightValue,
      address,
      ssn,
      contact_number: phone,
      email,
      password: 'testing321',
      password_confirm: 'testing321',
    };
    console.log(patientData)
    try {
      await axios.post('http://localhost:8000/accounts/signup/', patientData);
        
  
      
        setAlert({ message: 'Patient added successfully!', type: 'success' });
        setTimeout(() => {
          onClose()
        }, 3000); // Redirect after 3 seconds
     
      
      
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // This block is for Axios errors
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          if (errorData && typeof errorData === 'object') {
            const errorMessages = Object.values(errorData).flat().join(' ');
            setAlert({ message: `Error: ${errorMessages}`, type: 'error' });
          } else {
            setAlert({ message: 'An unexpected error occurred', type: 'error' });
          }
        } else {
          setAlert({ message: 'Network error', type: 'error' });
        }
      } else {
        // This block is for other types of errors
        setAlert({ message: 'An unexpected error occurred', type: 'error' });
      }
    };
  };

  return (
    <React.Fragment>
      <Modal keepMounted open={open} onClose={onClose}>
        <ModalDialog sx={{ width: { xs: '100%', sm: '45%' }, height: { xs: '80%', sm: 'fit-content' }, mt: { xs: '5%', sm: 0 } }}>
          <DialogTitle sx={{ fontSize: '1.2rem' }}>
            Add Patient Details
            <ModalClose variant="plain" sx={{ m: 1 }} />
          </DialogTitle>
          {alert && (
                <AlertVariousStates
                  message={alert.message}
                  type={alert.type}
                />
              )}
          <DialogContent sx={{ marginTop: '1rem' }}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl sx={{ display: "flex", flexDirection: { sm: 'row', xs: 'column', md: 'row' }, gap: 2 }}>
                  <Input size="sm" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <Input size="sm" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} sx={{ flexGrow: 1 }} />
                </FormControl>
              </Stack>
              <Stack spacing={1} direction={{ sm: 'row' }} sx={{ gap: { xs: 2 } }} flexWrap="wrap" useFlexGap>
                <FormControl>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    sx={{ fontSize: "14px" }}
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
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
                      value={gender}
                      onChange={(_, value) => setGender(value as string)}
                      required
                      sx={{ minWidth: 200, fontSize: '14px' }}
                    >
                      <Option value="male" sx={{ minWidth: 200, fontSize: '14px' }}>Male</Option>
                      <Option value="female" sx={{ minWidth: 200, fontSize: '14px' }}>Female</Option>
                      <Option value="other" sx={{ minWidth: 200, fontSize: '14px' }}>Other</Option>
                    </Select>
                  </Stack>
                </FormControl>
                <FormControl sx={{ Width: 70 }}>
                  <FormLabel>Height</FormLabel>
                  <Input
                    type='number'
                    placeholder="1.62"
                    value={heightValue}
                    onChange={(e) => setHeightValue(e.target.value)}
                    sx={{ fontSize: "14px", width: 200 }}
                    startDecorator={{ feet: 'ft', metres: 'm', centimetres: 'cm' }[height]}
                    endDecorator={
                      <React.Fragment>
                        <Divider orientation="vertical" />
                        <Select
                          variant="plain"
                          value={height}
                          onChange={(_, value) => setHeight(value!)}
                          slotProps={{
                            listbox: {
                              variant: 'outlined',
                            },
                          }}
                          sx={{ mr: -1.5, fontSize: '14px', '&:hover': { bgcolor: 'transparent' } }}
                        >
                          <Option value="feet" sx={{ fontSize: '14px' }}>Feet</Option>
                          <Option value="metres" sx={{ fontSize: '14px' }}>Metres</Option>
                          <Option value="centimetres" sx={{ fontSize: '14px' }}>Centimetres</Option>
                        </Select>
                      </React.Fragment>
                    }
                  />
                </FormControl>
              </Stack>
              <Stack spacing={1} direction={{ sm: 'row' }} sx={{ gap: { xs: 2 } }} flexWrap="wrap" useFlexGap>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input size="sm" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} sx={{ flexGrow: 1 }} />
                </FormControl>
                <FormControl>
                  <FormLabel>Social Security Number</FormLabel>
                  <Input size="sm" type='text' placeholder="SSN" value={ssn} onChange={(e) => setSsn(e.target.value)} />
                </FormControl>
              </Stack>
              <Stack direction={{ sm: 'row', xs: 'column' }} spacing={2} flexWrap="wrap" useFlexGap>
                <FormControl>
                  <FormLabel>Phone number</FormLabel>
                  <Input size="sm" placeholder="+233 557 31 1180" value={phone} onChange={(e) => setPhone(e.target.value)} slotProps={{
                    input: {
                      component: NumericFormatAdapter,
                    },
                  }} sx={{ flexGrow: 1 }} />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="siriwatk@test.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
              </Stack>
              <Button
                variant="solid"
                color="primary"
                sx={{ alignSelf: 'flex-end' }}
                onClick={handleSubmit}
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
