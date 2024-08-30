import * as React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  styled,
  Typography,
  Avatar,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  ModalClose,
} from '@mui/joy';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Stepper from '@mui/joy/Stepper';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Checkbox from '@mui/joy/Checkbox';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import axios from 'axios';
import AlertVariousStates from '../../components/AlertVariousStates'; // Ensure this component exists
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Divider from '@mui/joy/Divider';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  workStatus: string;
  email: string;
  specialization: string;
  assignedTreatment: string;
  group: string;
  gender: string;
  dateOfBirth: string;
  avatar: File | null; // Update this line
}
interface AddStaffModalProps {
  open: boolean;
  onClose: () => void;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
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

const steps = ['Staff Info', 'Assigned Services', 'Working Days'];

export default function AddStaffModal({ open, onClose }: AddStaffModalProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<boolean[]>(new Array(steps.length).fill(false));
  const [formData, setFormData] = React.useState<FormData>({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    workStatus: '',
    email: '',
    specialization: '',
    assignedTreatment: '',
    group: '',
    gender: '',
    dateOfBirth: '',
    avatar: null,
  });
  const [selectedDays, setSelectedDays] = React.useState<Record<string, boolean>>({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  const [alert, setAlert] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null); // Avatar state
  const handleNext = () => {
    if (isStepCompleted(activeStep)) {
      setCompletedSteps((prev) => {
        const newCompletedSteps = [...prev];
        newCompletedSteps[activeStep] = true;
        return newCompletedSteps;
      });
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const handleClose = () => {
    onClose();
    setActiveStep(0);
    setFormData({
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      workStatus: '',
      email: '',
      specialization: '',
      assignedTreatment: '',
      group: '',
      gender: '',
      dateOfBirth: '',
      avatar: null,
    });
    setSelectedDays({
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    });
    setCompletedSteps(new Array(steps.length).fill(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(FormData)
  };

  const handleSelectChange = (event: any, value: string | null) => {
    if (typeof value === 'string') {
      setFormData((prev) => ({ ...prev, workStatus: value }));
    }
  };

  const handleGenderChange = (event: any, value: string | null) => {
    if (typeof value === 'string') {
      setFormData((prev) => ({ ...prev, gender: value }));
    }
  };

  const handleGroupChange = (event: any, value: string | null) => {
    if (typeof value === 'string') {
      setFormData((prev) => ({ ...prev, group: value }));
    }
  };



  const handleCheckboxChange = (day: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDays((prev) => ({ ...prev, [day]: event.target.checked }));
  };

  //Avatar functions
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (e.target.files && file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const isStepCompleted = (stepIndex: number): boolean => {
    if (stepIndex === 0) {
      return Boolean(
        selectedImage &&
        formData.firstName &&
        formData.lastName &&
        formData.address &&
        formData.phoneNumber &&
        formData.email &&
        formData.specialization &&
        formData.group &&
        formData.gender &&
        formData.workStatus &&
        formData.dateOfBirth 
      );
    }
    if (stepIndex === 1) {
      return Boolean(formData.assignedTreatment);
    }
    if (stepIndex === 2) {
      // Here, we check if at least one day is selected.
      return Object.values(selectedDays).some(Boolean);
    }
    return false;
  };

  const handleSubmit = async () => {
   
    
    const formDataToSend = new FormData();

  // Append nested user fields as a JSON string
  formDataToSend.append('user', JSON.stringify({
    firstname: formData.firstName,
    lastname: formData.lastName,
    email: formData.email,
    password: 'testing123',
    password_confirm: 'testing123',
    role: formData.group,
  }));

  // Append other fields
  formDataToSend.append('address', formData.address);
  formDataToSend.append('contact_number', formData.phoneNumber);
  formDataToSend.append('work_status', formData.workStatus);
  formDataToSend.append('specialization', formData.specialization);
  formDataToSend.append('assigned_treatment', formData.assignedTreatment);
  formDataToSend.append('gender', formData.gender);
  formDataToSend.append('date_of_birth', formData.dateOfBirth);
    formDataToSend.append('working_days', JSON.stringify(Object.keys(selectedDays).filter(day => selectedDays[day])));

    // Include avatar if present
    if (formData.avatar) {
      formDataToSend.append('avatar', formData.avatar);
    }
      
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:8000/accounts/staff/create/', 
        formDataToSend,
        {
          headers: {
            'Authorization': `Token ${token}`, // Add your token here
            'Content-Type': 'multipart/form-data', // Ensure correct content type
          },
        });
      setAlert({ message: 'Staff member added successfully!', type: 'success' });
      setTimeout(() => {
        handleClose();
      }, 6000);
      window.location.reload(); // Optional: Reload the page or update state to reflect changes
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        console.error('Error data:', errorData);
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
    <Modal keepMounted open={open} onClose={handleClose}>
      <ModalDialog sx={{ minHeight: '60vh', width: { xs: '100%', sm: '45%' }, height: { xs: '80%', sm: '100%' }, mt: { xs: '5%', sm: 0 } }}>
        <DialogTitle>
          Add Staff Member Details
          <ModalClose variant="plain" sx={{ m: 1 }} />
        </DialogTitle>
        {alert && (
          <AlertVariousStates
            message={alert.message}
            type={alert.type}
          />
        )}
        <DialogContent sx={{ mt: 2, p: 2 }}>
          <Stepper sx={{ width: '100%', height: '10%'}}>
            {steps.map((step, index) => (
              <Step
                key={step}
                active={activeStep === index}
                completed={completedSteps[index] || (activeStep > index && isStepCompleted(index))}
                indicator={
                  <StepIndicator
                    variant={activeStep === index ? 'soft' : 'solid'}
                    color={activeStep === index ? 'primary' : 'neutral'}
                    sx={{ background: completedSteps[index] ? 'green' : 'neutral' }}
                  >
                    {activeStep === index ? index + 1 : <Check sx={{ color: completedSteps[index] ? 'white' : 'neutral' }} />}
                  </StepIndicator>
                }
                sx={{
                  fontSize: { xs: '12px', sm: '14px' },
                  '&::after': {
                    ...(activeStep > index && index !== steps.length - 1 && { bgcolor: 'primary.solidBg' }),
                  },
                }}
              >
                <StepButton onClick={() => setActiveStep(index)}>{step}</StepButton>
              </Step>
            ))}
            
          </Stepper>
          
          <Stack spacing={2} sx={{ mt: 2, height: '90%' }}>
            <Divider/>
            <Stack direction="column" sx={{ height: '100%', justifyContent: 'space-between', overflowY: 'scroll'}}>
              {activeStep === 0 && (
                <>
                  <Stack spacing={2}>
                    
                    <FormControl required sx={{ display: 'flex', gap: 1 }}>
                      <Stack direction="row" alignItems="center" sx={{gap: 1}}>
                        <Avatar
                          alt="Selected Image"
                          src={selectedImage ? URL.createObjectURL(selectedImage) : "/user/avatar.jpg"}
                          size="lg"
                        />
                        {selectedImage ? <Typography color="primary" sx={{ fontSize: '12px' }}>{selectedImage.name}</Typography> : null}
                      </Stack>
                      <Stack spacing={1} direction="row" alignItems="center">
                        <Button
                          component="label"
                          role={undefined}
                          tabIndex={-1}
                          variant="outlined"
                          color={selectedImage ? "success" : "neutral"}
                          sx={{ width: 'fit-content' }}
                          startDecorator={selectedImage ? <EditOutlinedIcon/> : <CloudUploadOutlinedIcon />}
                        >
                          {selectedImage ? "Edit" : "Upload a Pic"}
                          <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                          />
                          
                        </Button>
                        {selectedImage && (
                          <>
                            
                            <Button
                              variant="outlined"
                              color="danger"
                              onClick={handleRemoveImage}
                              sx={{ width: 'fit-content' }}
                              startDecorator={<DeleteOutlineRoundedIcon/>}
                            >
                              Remove
                            </Button>
                          </>
                        )}
                      </Stack>
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Stack direction="row" useFlexGap flexWrap={'wrap'} spacing={2}>
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First name"
                          required
                          sx={{flexGrow: 1, fontSize: '14px'}}
                        />
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last name"
                          required
                          sx={{flexGrow: 1, fontSize: '14px'}}
                        />
                      </Stack>
                    </FormControl>
                    <Stack direction="row" useFlexGap flexWrap={'wrap'} spacing={2}>
                      <FormControl sx={{flexGrow: 1}}>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          placeholder="Select Gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleGenderChange}
                          required
                          sx={{fontSize: '14px'}}
                        >
                          <Option value="male" sx={{fontSize: '14px'}}>Male</Option>
                          <Option value="female" sx={{fontSize: '14px'}}>Female</Option>
                          <Option value="other" sx={{fontSize: '14px'}}>Other</Option>
                        </Select>
                      </FormControl>
                      <FormControl sx={{flexGrow: 1}}>
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
                    </Stack>
                    <Stack direction="row" useFlexGap flexWrap={'wrap'} spacing={2}>
                      <FormControl sx={{flexGrow: 1}}>
                        <FormLabel>Address</FormLabel>
                        <Input
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Address"
                          required
                          sx={{fontSize: '14px'}}
                        />
                      </FormControl>
                      <FormControl sx={{flexGrow: 1}}>
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          required
                          sx={{fontSize: '14px'}}
                          slotProps={{ input: { component: NumericFormatAdapter } }}
                        />
                      </FormControl>
                    </Stack>
                    <Stack  direction="row" useFlexGap flexWrap={'wrap'} spacing={2}>
                      <FormControl sx={{flexGrow: 1}}>
                        <FormLabel>Email</FormLabel>
                        <Input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                          type="email"
                          required
                          sx={{fontSize: '14px'}}
                          startDecorator={<EmailRoundedIcon />}
                        />
                      </FormControl>
                      <FormControl sx={{flexGrow: 1}}>
                        <FormLabel>Work Status</FormLabel>
                        <Select
                          placeholder="Choose work status"
                          name="workStatus"
                          value={formData.workStatus}
                          onChange={handleSelectChange}
                          required
                          sx={{fontSize: '14px'}}
                        >
                          <Option sx={{fontSize: '14px'}} value="full-time">Full-time</Option>
                          <Option sx={{fontSize: '14px'}} value="part-time">Part-time</Option>
                          <Option sx={{fontSize: '14px'}} value="consultant">Consultant</Option>
                          <Option sx={{fontSize: '14px'}} value="temporary">Temporary</Option>
                        </Select>
                      </FormControl>
                      
                    </Stack>
                    <Stack direction="row" useFlexGap flexWrap={'wrap'} spacing={2}>
                      <FormControl sx={{flexGrow: 1}}>
                        <FormLabel>Specialization</FormLabel>
                        <Input
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleChange}
                          placeholder="Specialization"
                          required
                          sx={{fontSize: '14px'}}
                        />
                      </FormControl>
                      <FormControl sx={{flexGrow: 1}}>
                        <FormLabel>Group</FormLabel>
                        <Select
                          placeholder="Select Group"
                          name="group"
                          value={formData.group}
                          onChange={handleGroupChange}
                          required
                          sx={{fontSize: '14px'}}
                        >
                          <Option sx={{fontSize: '14px'}} value="medical">Medical</Option>
                          <Option sx={{fontSize: '14px'}} value="nursing">Nursing</Option>
                          <Option sx={{fontSize: '14px'}} value="allied-health">Allied Health</Option>
                          <Option sx={{fontSize: '14px'}} value="support">Support</Option>
                          <Option sx={{fontSize: '14px'}} value="management">Management</Option>
                          <Option sx={{fontSize: '14px'}} value="administrative">Administrative</Option>
                          <Option sx={{fontSize: '14px'}} value="other">Other</Option>
                        </Select>
                      </FormControl>
                    </Stack>
                    
                  </Stack>
                </>
              )}
              {activeStep === 1 && (
                <FormControl>
                  <FormLabel>Assigned Treatment</FormLabel>
                  <Input
                    name="assignedTreatment"
                    value={formData.assignedTreatment}
                    onChange={handleChange}
                    placeholder="Assigned Treatment"
                    required
                  />
                </FormControl>
              )}
              {activeStep === 2 && (
                <FormControl>
                  <FormLabel>Working Days</FormLabel>
                  <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap', gap: 2, mt: 2}}>
                    {Object.keys(selectedDays).map((day) => (
                      <FormControl key={day} sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
                        <Checkbox
                          checked={selectedDays[day]}
                          onChange={handleCheckboxChange(day)}
                        />
                        <FormLabel>{day}</FormLabel>
                      </FormControl>
                    ))}
                  </Stack>
                </FormControl>
              )}
              <Stack direction="row" spacing={2} sx={{ mt: 2, height: '15%', py: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Back
                </Button>
                {activeStep < steps.length - 1 ? (
                  <Button
                    color="primary"
                    onClick={handleNext}
                    disabled={!isStepCompleted(activeStep)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
