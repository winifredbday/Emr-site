import * as React from 'react';
import { Button, FormControl, FormLabel, Input, Stack, Modal, ModalDialog, DialogTitle, DialogContent, Divider, ModalClose } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import Stepper from '@mui/joy/Stepper';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Sheet from '@mui/joy/Sheet';

interface AddStaffModalProps {
  open: boolean;
  onClose: () => void;
}

const steps = ['Staff Info', 'Assigned Services', 'Working Days'];

export default function AddStaffModal({ open, onClose }: AddStaffModalProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<boolean[]>(new Array(steps.length).fill(false));
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    workStatus: '',
    email: '',
    assignedTreatment: '',
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
      assignedTreatment: '',
    });
    setSelectedDays({
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    

    })
    setCompletedSteps(new Array(steps.length).fill(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: any, value: string | null) => {
    if (typeof value === 'string') {
      setFormData((prev) => ({ ...prev, workStatus: value }));
    }
  };


  const handleCheckboxChange = (day: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDays((prev) => ({ ...prev, [day]: event.target.checked }));
  };

  const isStepCompleted = (stepIndex: number): boolean => {
    if (stepIndex === 0) {
      return Boolean(formData.firstName && formData.lastName && formData.address && formData.phoneNumber && formData.email && formData.workStatus);
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

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog sx={{ height: '60vh', width: '45%' }}>
        <DialogTitle>
          Add Staff Member Details
          <ModalClose variant="plain" sx={{ m: 1 }} />
        </DialogTitle>
        <DialogContent sx={{ mt: 2, display: 'flex', flexDirection: 'column' }}>
          <Stepper sx={{ width: '100%' }}>
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

          <Stack spacing={2} sx={{ mt: 2, flexGrow: 1 }}>
            {activeStep === 0 && (
              <>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Stack direction="row" spacing={2}>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        sx={{ fontSize: '14px' }}
                      />
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        sx={{ fontSize: '14px', flexGrow: 1 }}
                      />
                    </Stack>
                  </FormControl>
                  <Stack direction={{ sm: "row" }} sx={{ position: 'relative', width: "100%", display: "flex", gap: 2 }}>
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
                    <FormControl sx={{ width: "50%"}}>
                      <FormLabel>Work Status</FormLabel>
                        
                          <Stack spacing={2} alignItems="flex-start">
                            <Select
                              placeholder="Select a status"
                              name="workStatus"
                              required
                              sx={{ minWidth: 200, fontSize: '14px' }}
                              value={formData.workStatus}
                              onChange={handleSelectChange}
                            >
                              <Option value="FullTime" sx={{ minWidth: 200, fontSize: '14px' }}>Full Time</Option>
                              <Option value="PartTime" sx={{ minWidth: 200, fontSize: '14px' }}>Part Time</Option>
                              <Option value="Suspended" sx={{ minWidth: 200, fontSize: '14px' }}>Suspended</Option>
                           
                            </Select>
                            
                          </Stack>
                        
                      </FormControl>
                  </Stack>
                  
                  
                  <Stack direction={{ sm: "row" }} sx={{ position: 'relative', width: "100%", display: "flex", gap: 2 }}>
                    <FormControl sx={{ width: "50%" }}>
                      <FormLabel>Phone number</FormLabel>
                      <Input
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+233 557 31 1180"
                        sx={{ fontSize: '14px' }}
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
                  placeholder="Malaria and Fever Treatment"
                  sx={{ fontSize: '14px' }}
                />
              </FormControl>
            )}
            {activeStep === 2 && (
              <Stack spacing={2}>
                <Typography level="h3">Select days the staff member works</Typography>
                <Stack direction={{ sm: 'row' }} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {Object.keys(selectedDays).map((day) => (
                    <Sheet key={day} variant="outlined" sx={{p: 1, borderRadius: 'md', display: 'flex'}}>
                      <Checkbox
                        checked={selectedDays[day]}
                        onChange={handleCheckboxChange(day)}
                        label={day}
                        sx={{ fontSize: '14px' }}
                      />
                    </Sheet>
                  ))}
                </Stack>

              </Stack>
            )}
          </Stack>
          <Stack sx={{ mt: 2 }}>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={2}>
              <Button onClick={handleBack} disabled={activeStep === 0} color="neutral">
                Back
              </Button>
              {activeStep < steps.length - 1 ? (
                <Button onClick={handleNext} color="primary">
                  Next
                </Button>
              ) : (
                <Button onClick={handleClose} color="primary">
                  Submit
                </Button>
              )}
            </Stack>
          </Stack>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
