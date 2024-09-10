import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Stepper from '@mui/joy/Stepper';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import Divider from '@mui/joy/Divider';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import AlertVariousStates from '../../components/AlertVariousStates';
import axios from 'axios'
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
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

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === 'light' ? 'dark' : 'light');
        onClick?.(event);
      }}
      {...other}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}


const steps = ['Personal Info', 'Contact Info', 'Work and Identification'];
export default function SignUp() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<boolean[]>(new Array(steps.length).fill(false));
  const [height, setHeight] = React.useState('metres');
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

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: any, value: string | null) => {
    if (typeof value === 'string') {
      setFormData((prev) => ({ ...prev, gender: value }));
    }
  };

  const isStepCompleted = (stepIndex: number): boolean => {
    if (stepIndex === 0) {
      return Boolean(formData.firstName && formData.lastName  && formData.gender && formData.height && formData.dateOfBirth );
    }
    if (stepIndex === 1) {
      return Boolean(formData.phoneNumber && formData.address && formData.email);
    }
    if (stepIndex === 2) {
      
      return Boolean(formData.work && formData.ssn && formData.password && formData.confirmPassword)
      // Here, we check if at least one day is selected.
      // return Object.values(selectedDays).some(Boolean);
    }
    return false;
  };

  const [alert, setAlert] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    // Check if passwords match
  

    const patientData = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      date_of_birth: formData.dateOfBirth,
      address: formData.address,
      contact_number: formData.phoneNumber,
      gender: formData.gender,
      work: formData.work,
      email: formData.email,
      height: formData.height,
      ssn: formData.ssn,
      password: formData.password,
      password_confirm: formData.confirmPassword,
    }
   
  
    // Check if the form is complete before submitting
    if (!isStepCompleted(activeStep)) {
      setAlert({ message: 'Please complete all required fields.', type: 'error'});
      return;
    }
  
    try {
      await axios.post('https://emr-backend.up.railway.app/accounts/patients/signup/', patientData);
        
  
      
        setAlert({ message: 'User created successfully!', type: 'success' });
        setTimeout(() => {
          window.location.href = '/signin';
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
  }
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s', // set to `none` to disable transition
          },
        }}
      />
      {/* Sign Up page image */}
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'relative',
          width:'50%',
          
          left: 0,
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
          },
        })}
      />
      {/* Right Form Box */}
      <Box
        sx={(theme) => ({
          height: '100vh',
          width: '50%',
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'fixed',
          top: 0,
          right: 0,
          padding:'.1rem .5rem',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2,
          }}
        >
          {/* Header  */}
          <Box
            component="header"
            sx={{
              height:'15%',
              py: 3,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Company logo</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          {/* Main */}
          <Box
            component="main"
            sx={{
             
              my: 'auto',
              py: 2,
              pb: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              height: '80%',
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
             {alert && (
                <AlertVariousStates
                  message={alert.message}
                  type={alert.type}
                />
              )}
            {/* Info Header */}
            <Stack gap={4} sx={{ height: '20%'}}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Patient Signup Form
                </Typography>
                <Typography component="p" level="body-sm">Fill details in steps below to create an account.</Typography>
                
              </Stack>
            
            </Stack>
            {/* Form with Stepper */}
            <Stepper sx={{ width: '100%', height: '10%' }}>
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
                  fontSize: '14px',
                  '&::after': {
                    ...(activeStep > index && index !== steps.length - 1 && { bgcolor: 'primary.solidBg' }),
                  },
                }}
              >
                <StepButton onClick={() => setActiveStep(index)}>{step}</StepButton>
              </Step>
            ))}
            </Stepper>
            <Stack gap={4} sx={{ mt: 0, height: '60%'}}>
              <form onSubmit={handleSubmit}>
               {activeStep === 0 && (
                <>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Stack direction="row" spacing={2}>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        sx={{ fontSize: '14px', flexGrow: '1' }}
                      />
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        sx={{ fontSize: '14px', flexGrow: '1' }}
                      />
                    </Stack>
                  </FormControl>
                  <Stack spacing={1} direction={{sm: 'row'}} sx={{width:'100%', display: 'flex', gap: 2}} flexWrap={{xs: 'wrap'}}>
                    <FormControl sx={{flexGrow: '1'}}>
                        <FormLabel>Gender</FormLabel>
                          
                        <Stack spacing={2} alignItems="flex-start">
                          <Select
                            placeholder="Select Gender"
                            name="gender"
                            required
                            sx={{ width:'100%', fontSize: '14px' }}
                            value={formData.gender}
                              onChange={handleSelectChange}
                          >
                            <Option value="male" sx={{ minWidth: 200, fontSize: '14px' }}>Male</Option>
                            <Option value="female" sx={{ minWidth: 200, fontSize: '14px' }}>Female</Option>
                            <Option value="other" sx={{ minWidth: 200, fontSize: '14px' }}>Other</Option>
                          
                          </Select>
                          
                        </Stack>
                          
                    </FormControl>
                    <FormControl sx={{flexGrow: '1'}}>
                      <FormLabel>Date of Birth</FormLabel>
                      <Input
                          sx={{fontSize: "14px", width: '100%'}}
                          type="date"
                          name="dateOfBirth"
                          onChange={handleChange}
                          value={formData.dateOfBirth}
                          slotProps={{
                            input: {
                              min: '1900-12-31',
                              max: '2024-12-31',
                            },
                          }}
                        />
                      
                    </FormControl>
                    <FormControl>
                      <FormLabel>Height</FormLabel>
                      <Input
                        type='number'
                        name='height'
                        placeholder="1.62"
                        value={formData.height}
                        onChange={handleChange}
                        sx={{fontSize:"14px", width:'100%', maxWidth: 205}}
                        startDecorator={{ feet: 'ft', metres: 'm', centimetres: 'cm' }[height]}
                        endDecorator={
                          <React.Fragment>
                            <Divider orientation="vertical" />
                            <Select
                              variant="plain"
                              value={formData.height}
                              onChange={(_, value) => setHeight(value!)}
                              slotProps={{
                                listbox: {
                                  variant: 'outlined',
                                },
                              }}
                              sx={{  mr: -1.5, fontSize: '14px', '&:hover': { bgcolor: 'transparent' } }}
                            >
                              <Option value="feet" sx={{fontSize: '14px'}}>Feet</Option>
                              <Option value="metres" sx={{fontSize: '14px'}}>Metres</Option>
                              <Option value="centimetres" sx={{fontSize: '14px'}}>Centimetres</Option>
                            </Select>
                          </React.Fragment>
                        }
                      
                      />
                    </FormControl>
                  </Stack>

                </>
                )}

                {activeStep === 1 && (
                  <>
                    <Stack direction={{ sm: "row" }} sx={{ position: 'relative', width: "100%", display: "flex", gap: 2 }}>
                      <FormControl sx={{ width: "50%" }}>
                        <FormLabel>Phone number</FormLabel>
                        <Input
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          
                          sx={{ fontSize: '14px' }}
                          slotProps={{
                            input: {
                              component: NumericFormatAdapter,
                            },
                          }}
                        />
                      </FormControl>
                      <FormControl sx={{ width: "50%" }}>
                        <FormLabel>Email</FormLabel>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          startDecorator={<EmailRoundedIcon />}
                          placeholder="siriwatk@test.com"
                          sx={{ fontSize: '14px' }}
                        />
                      </FormControl>
                    </Stack>
                    <FormControl>
                      <FormLabel>Address</FormLabel>
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="14th Street off Mid Avenue"
                        sx={{ fontSize: '14px' }}
                      />
                    </FormControl>
                   
                  </>
                
                )}

                {activeStep === 2 && (
                  <>
                     <Stack direction={{sm: "row"}} spacing={2} useFlexGap>
                     
                     <FormControl sx={{flexGrow: '1'}}>
                      <FormLabel>Work</FormLabel>
                      <Input
                        name="work"
                        value={formData.work}
                        onChange={handleChange}
                        placeholder="Software Engineer"
                        sx={{ fontSize: '14px' }}
                      />
                    </FormControl>
                    <FormControl sx={{flexGrow: '1'}}>
                      <FormLabel>Social Security No.</FormLabel>
                      <Input
                        name="ssn"
                        value={formData.ssn}
                        onChange={handleChange}
                        placeholder="14th Street off Mid Avenue"
                        sx={{ fontSize: '14px' }}
                      />
                    </FormControl>
                     </Stack>
                    <Stack  direction={{sm: "row"}} spacing={2} useFlexGap>
                      <FormControl sx={{flexGrow: '1'}} required>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                      </FormControl>
                      <FormControl sx={{flexGrow: '1'}} required>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                      </FormControl>
                    </Stack>
                  </>
                )}
                <Stack sx={{ mt: 2}}>
                  <Divider sx={{ my: 2 }} />
                  <Stack direction="row" spacing={2}>
                    <Button type="button" onClick={handleBack} disabled={activeStep === 0} color="neutral">
                      Back
                    </Button>
                    {activeStep < steps.length - 1 ? (
                      <Button type="button" onClick={handleNext} color="primary">
                        Next
                      </Button>
                    ) : (
                      <Button type="submit" color="primary">
                        Submit
                      </Button>
                    )}
                  </Stack>
                </Stack>
               
                
               
              </form>
            </Stack>
            <Stack gap={4} sx={{ mb: 0, height: '10%' }}>
             
              
              <Stack gap={1}>
                
                <Typography level="body-sm">
                  Already have an account?{' '}
                  <Link href="signin" level="title-sm">
                    Sign in!
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </Box>
          {/* Footer */}
          <Box component="footer" sx={{ height: '5%', py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Your company {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>

      
    </CssVarsProvider>
  );
}
