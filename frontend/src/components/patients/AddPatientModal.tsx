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

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  persistent: HTMLInputElement;
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
 
  const [height, setHeight] = React.useState('metres');
  const [heightValue, setHeightValue] = React.useState('');

  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    gender: '',
    work: '',
    email: '',
    height: '',
    ssn: '',
    password: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: any, value: string | null) => {
    if (typeof value === 'string') {
      setFormData((prev) => ({ ...prev, gender: value }));
    }
  };

  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
  // Function to handle form submission
  const handleSubmit = async () => {
    const patientData = {
     user: {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        password: 'password123',
        password_confirm: 'password123',
        role: 'patient',
    },
    
    gender: formData.gender,
    date_of_birth: formData.dateOfBirth,
    contact_number: formData.phoneNumber,
    address: formData.address,
    work: formData.work,
    height: formData.height,
    ssn: formData.ssn,
   
    };
    console.log(patientData)
    try {
      const response = await axios.post('https://emr-backend.up.railway.app/accounts/patients/signup/', patientData
      );
      setAlert({ message: 'User and patient created successfully!', type: 'success' });
      setTimeout(() => {
        onClose();
      }, 6000);
      window.location.reload()
  } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
          const errorData = error.response.data;
          console.error('Error data:', errorData); // Log error for debugging
          if (typeof errorData === 'object') {
              const errorMessages = Object.entries(errorData).map(([key, value]) => `${key}: ${value}`).join('. ');
              setAlert({ message: `Error: ${errorMessages}`, type: 'error' });
          } else {
              setAlert({ message: 'An unexpected error occurred', type: 'error' });
          }
      } else {
          setAlert({ message: 'Network error', type: 'error' });
      }
  }
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
                  <Input required name="firstName" size="sm" placeholder="First name" value={formData.firstName} onChange={handleChange}  sx={{ flexGrow: 1 }}/>
                  <Input required name="lastName" size="sm" placeholder="Last name" value={formData.lastName} onChange={handleChange}  sx={{ flexGrow: 1 }}/>
                </FormControl>
              </Stack>
              <Stack spacing={1} direction={{ sm: 'row' }} sx={{ gap: { xs: 2 } }} flexWrap="wrap" useFlexGap>
                <FormControl>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    sx={{ fontSize: "14px" }}
                    type="date"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
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
                      name="gender"
                      value={formData.gender}
                      onChange={handleSelectChange}
                      required
                      sx={{ minWidth: 200, fontSize: '14px' }}
                    >
                      <Option value="male" sx={{ minWidth: 200, fontSize: '14px' }}>Male</Option>
                      <Option value="female" sx={{ minWidth: 200, fontSize: '14px' }}>Female</Option>
                      <Option value="other" sx={{ minWidth: 200, fontSize: '14px' }}>Other</Option>
                    </Select>
                  </Stack>
                </FormControl>
                <FormControl>
                  <FormLabel>Height</FormLabel>
                  <Input
                    type='number'
                    placeholder="1.62"
                    value={formData.height}
                    required
                    name='height'
                    onChange={handleChange}
                    sx={{ fontSize: "14px", width: 190, flexGrow: 1 }}
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
                <FormControl sx={{width: '30%', flexGrow: 1}}>
                  <FormLabel>Address</FormLabel>
                  <Input required name="address" size="sm" placeholder="Address" value={formData.address} onChange={handleChange}/>
                </FormControl>
                <FormControl sx={{width: '30%', flexGrow: 1}}>
                  <FormLabel>Social Security Number</FormLabel>
                  <Input required name="ssn" size="sm" type='text' placeholder="SSN" value={formData.ssn} onChange={handleChange} />
                </FormControl>
                <FormControl sx={{width: '30%', flexGrow: 1}}>
                  <FormLabel>Work</FormLabel>
                  <Input required name="work" size="sm" type='text' placeholder="Work" value={formData.work} onChange={handleChange} />
                </FormControl>
              </Stack>
              <Stack direction={{ sm: 'row', xs: 'column' }} spacing={2} flexWrap="wrap" useFlexGap>
                <FormControl>
                  <FormLabel>Phone number</FormLabel>
                  <Input required name="phoneNumber" size="sm" placeholder="+233 557 31 1180" value={formData.phoneNumber} onChange={handleChange} slotProps={{
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
                    name="email"
                    required
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="siriwatk@test.com"
                    value={formData.email}
                    onChange={handleChange}
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
