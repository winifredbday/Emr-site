import * as React from 'react';
import axios from 'axios'; // Import axios for API requests
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
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

interface Patient {
  id: string;
  label: string;
}

interface Doctor {
  id: string;
  label: string;

}

interface Treatment {
  value: string;
  label: string;
  price: number;
}

interface AddAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (appointmentData: any) => void;
  preselectedDoctor?: string | null;
  patientFirstName?: string;
  patientLastName?: string;
}

export default function AddAppointmentModal({
  open,
  onClose,
  onSubmit,
  preselectedDoctor,
  patientFirstName = '',
  patientLastName = '',
}: AddAppointmentModalProps) {
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [treatments, setTreatments] = React.useState<Treatment[]>([]);
  const [selectedPatient, setSelectedPatient] = React.useState<string | null>('');
  const [selectedDoctor, setSelectedDoctor] = React.useState<string | null>(preselectedDoctor || null);
  const [selectedTreatment, setSelectedTreatment] = React.useState<string | null>(null);
  const [price, setPrice] = React.useState<number | string>('');
  const [firstName, setFirstName] = React.useState<string>(patientFirstName || '');
  const [lastName, setLastName] = React.useState<string>(patientLastName || '');
  const [time, setTime] = React.useState<string>('');
  const [alert, setAlert] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const isReadOnly = firstName !== '' && lastName !== '';

  React.useEffect(() => {
    // Fetch doctors
    axios.get('http://localhost:8000/accounts/patients/')
        .then(response => {
            setPatients(response.data.map((patient: any) => ({
                value: patient.id,
                label: `${patient.user.firstname} ${patient.user.lastname}`,
            })));
        })
        .catch(error => console.error('Error fetching patients:', error));

    // Fetch doctors
    axios.get('http://localhost:8000/accounts/staff')
    .then(response => {
        setDoctors(response.data.map((doc: any) => ({
            value: doc.id,
            label: `Dr. ${doc.user.firstname} ${doc.user.lastname}`,
            
        })));
    })
    .catch(error => console.error('Error fetching doctors:', error));
    // Fetch treatments
    axios.get('http://localhost:8000/clinic/treatments')
        .then(response => {
            setTreatments(response.data.map((treatment: any) => ({
                value: treatment.id,
                label: treatment.name,
                price: treatment.price,
            })));
        })
        .catch(error => console.error('Error fetching treatments:', error));
  }, []);
  
  React.useEffect(() => {
    if (preselectedDoctor) {
      setSelectedDoctor(preselectedDoctor);
    }
  }, [preselectedDoctor]);

  React.useEffect(() => {
    setFirstName(patientFirstName);
    setLastName(patientLastName);
  }, [patientFirstName, patientLastName]);

  const handleTreatmentChange = (event: any, newValue: string | null) => {
    setSelectedTreatment(newValue);
    const treatment = treatments.find((t) => t.value === newValue);
    setPrice(treatment?.price || '');
  };

  const handleFormSubmit = async () => {
    const appointmentData = {
      doctor: selectedDoctor,
      treatment: selectedTreatment,
      price: price,
      time: time,
      patient: {
        firstName: firstName,
        lastName: lastName,
      },
    };
   
    try {
      const response = await axios.post('http://localhost:8000/clinic/appointments/add/', appointmentData);
      // onAddTreatment(response.data);

      setAlert({ message: 'Treatment added successfully!', type: 'success' });
      onSubmit(appointmentData);
      setTimeout(() => {
        setSelectedDoctor('')
        setSelectedPatient('')
        setSelectedTreatment('')
        setPrice('')
        setTime('')

        onClose();
      }, 3000);
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
      <Modal keepMounted open={open} onClose={onClose} sx={{}}>
        <ModalDialog sx={{ width: { xs: '100%', sm: '40%' }, mt: { xs: '5%', sm: 0 } }}>
          <DialogTitle sx={{ fontSize: '1.2rem' }}>
            Add Appointment
            <ModalClose variant="plain" sx={{ m: 1 }} />
          </DialogTitle>

          <DialogContent sx={{ marginTop: '1rem', pb: { xs: '1rem' } }}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                
                <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: { sm: 'row', xs: 'column', md: 'row' }, gap: 2 }}>
                  
                  <FormControl>
                    <FormLabel>Patient</FormLabel>
                    <Autocomplete
                      value={selectedPatient}
                      onChange={(event, newValue) => setSelectedPatient(newValue)}
                      size="sm"
                      options={patients.map((option) => option.label)}
                      slotProps={{
                        input: {
                          placeholder: 'Select Patient',
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>New patient?</FormLabel>
                    <Button color="primary" size="sm" onClick={() => window.location.href="/patients"}>
                      Add patient
                    </Button>
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
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Time</FormLabel>
                  <Input size="sm" type="time" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} />
                </FormControl>
              </Stack>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button color="neutral" size="sm" sx={{ width: "50%" }} onClick={onClose}>
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
