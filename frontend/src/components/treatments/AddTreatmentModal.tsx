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
import axios from 'axios'
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Divider from '@mui/joy/Divider';
import AlertVariousStates from '../../components/AlertVariousStates';

interface Treatment {
  id: number;
  name: string;
  price: number;
  estimated_duration: string;
  visit_type: string;
}
interface AddTreatmentProps{
    open: boolean;
    onClose: () => void;
    //onAddTreatment: (treatmentData: any) => void;
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
        
      />
    );
  },
);

export default function AddTreatmentModal({open, onClose}: AddTreatmentProps) {
  const [time, setTime] = React.useState('mins');
  const [formData, setFormData] = React.useState({
    treatment_name: '',
    price: '',
    estimated_duration: '',
    visit_type: ''
  })
  const [alert, setAlert] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: any, value: string | null) => {
    if (typeof value === 'string') {
      setFormData((prev) => ({ ...prev, visit_type: value }));
    }
  };

  

  
  //function to handle form submission
  const handleSubmit = async () => {
    const treatmentData = {
     name: formData.treatment_name,
     price: formData.price,
     estimated_duration: formData.estimated_duration + " " + time,
     visit_type: formData.visit_type

    };
    console.log(treatmentData)
    try {
      const response = await axios.post('https://emr-backend.up.railway.app/clinic/treatments/add/', treatmentData);
      // onAddTreatment(response.data);

      setAlert({ message: 'Treatment added successfully!', type: 'success' });
      setTimeout(() => {
        setFormData({
          treatment_name: '',
          price: '',
          estimated_duration: '',
          visit_type: ''
        })
        onClose();
      }, 4000);
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
        <ModalDialog sx={{width: {xs: '100%', sm: '40%'}, height: {xs: '80%', sm: 'fit-content'}, mt: {xs: '5%'}}}>
          <DialogTitle sx={{fontSize: '1.2rem'}}>Add Treatment  <ModalClose variant="plain" sx={{ m: 1 }} /></DialogTitle>
          <DialogContent sx={{marginTop: '1rem'}}>
          {alert && (
                <AlertVariousStates
                  message={alert.message}
                  type={alert.type}
                />
              )}
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{ display: "flex", flexDirection: {sm: 'row', xs: 'column', md: 'row' }, gap: 2 }}
                >
                  <Input name="treatment_name" value={formData.treatment_name} onChange={handleChange} placeholder="Treatment name" sx={{flexGrow: 1, fontSize: '14px'}} />
                  
                </FormControl>
              </Stack>
              <Stack spacing={1} direction={{sm: 'row'}} sx={{gap: {xs: 2}}} flexWrap="wrap" useFlexGap>
                <FormControl sx={{flexGrow: 1}}>
                    <FormLabel>Price</FormLabel>
                    <Input name="price" value={formData.price} startDecorator={'$'} onChange={handleChange} placeholder="Price" sx={{fontSize: '14px'}} />
                </FormControl>
                
                  <FormControl sx={{width: {sm: 200}}}>
                    <FormLabel>Estimated duration</FormLabel>
                    <Input
                      type='number'
                      placeholder="1.62"
                      onChange={handleChange}
                      name="estimated_duration"
                      value={formData.estimated_duration}
                      sx={{fontSize:"14px"}}
                      slotProps={{
                        input: {
                          component: NumericFormatAdapter
                        }
                      }}
                      startDecorator={{ mins: 'm', hours: 'H' }[time]}
                      endDecorator={
                        <React.Fragment>
                          <Divider orientation="vertical" />
                          <Select
                            variant="plain"
                            value={time}
                            size="sm"
                            onChange={(_, value) => setTime(value!)}
                            slotProps={{
                              listbox: {
                                variant: 'outlined',
                              },
                            }}
                            sx={{ mr: -1.5, fontSize: '14px', '&:hover': { bgcolor: 'transparent' } }}
                          >
                           
                            <Option value="mins" sx={{fontSize: '14px'}}>Minutes</Option>
                            <Option value="hours" sx={{fontSize: '14px'}}>Hours</Option>
                          </Select>
                        </React.Fragment>
                      }
                    
                    />
                  </FormControl>
              </Stack>
              <Stack spacing={1} direction={{sm: 'row'}} flexWrap="wrap" useFlexGap> 
              <FormControl sx={{ width: "50%"}}>
                      <FormLabel>Visit Type</FormLabel>
                        
                          <Stack spacing={2} alignItems="flex-start">
                            <Select
                              placeholder="Select a visit type"
                              name="visitType"
                              required
                              sx={{ minWidth: 200, fontSize: '14px' }}
                              
                              onChange={handleSelectChange}
                            >
                              <Option value="multiple" sx={{ minWidth: 200, fontSize: '14px' }}>Multiple Visit</Option>
                              <Option value="single" sx={{ minWidth: 200, fontSize: '14px' }}>Single Visit</Option>
                              
                           
                            </Select>
                            
                          </Stack>
                        
                      </FormControl>
              </Stack>
              
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
                    onClick={handleSubmit}
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
