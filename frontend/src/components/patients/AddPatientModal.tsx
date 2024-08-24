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
interface AddPatientModalProps{
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

export default function AddPatientModal({open, onClose}: AddPatientModalProps) {
  const [height, setHeight] = React.useState('metres');
  return (
    <React.Fragment>
     
      <Modal keepMounted open={open} onClose={onClose}>
        <ModalDialog sx={{width: {xs: '100%'}, height: {xs: '80%'}, mt: {xs: '5%'}}}>
          <DialogTitle sx={{fontSize: '1.2rem'}}>Add Patient Details  <ModalClose variant="plain" sx={{ m: 1 }} /></DialogTitle>
          <DialogContent sx={{marginTop: '1rem'}}>
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{ display: "flex", flexDirection: {sm: 'row', xs: 'column', md: 'row' }, gap: 2 }}
                >
                  <Input size="sm" placeholder="First name" />
                  <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} />
                </FormControl>
              </Stack>
              <Stack spacing={1} direction={{sm: 'row'}} sx={{gap: {xs: 2}}} flexWrap="wrap" useFlexGap>
                  <FormControl>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input
                        sx={{fontSize: "14px"}}
                        type="date"
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
                          required
                          sx={{ minWidth: 200, fontSize: '14px' }}
                          
                        >
                          <Option value="Male" sx={{ minWidth: 200, fontSize: '14px' }}>Male</Option>
                          <Option value="Female" sx={{ minWidth: 200, fontSize: '14px' }}>Female</Option>
                          <Option value="Suspended" sx={{ minWidth: 200, fontSize: '14px' }}>Other</Option>
                        
                        </Select>
                        
                      </Stack>
                        
                  </FormControl>
                  <FormControl sx={{Width:70}} >
                    <FormLabel>Height</FormLabel>
                    <Input
                      type='number'
                      placeholder="1.62"
                      sx={{fontSize:"14px", width: 200}}
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
                            <Option value="feet" sx={{fontSize: '14px'}}>Feet</Option>
                            <Option value="metres" sx={{fontSize: '14px'}}>Metres</Option>
                            <Option value="centimetres" sx={{fontSize: '14px'}}>Centimetres</Option>
                          </Select>
                        </React.Fragment>
                      }
                    
                    />
                  </FormControl>
              </Stack>
              <Stack spacing={1} direction={{sm: 'row'}} sx={{gap: {xs: 2}}} flexWrap="wrap" useFlexGap>
                
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input size="sm" placeholder="Address" sx={{ flexGrow: 1 }} />
                </FormControl>

                <FormControl>
                    <FormLabel>Social Security Number</FormLabel>
                    <Input size="sm" type='text' placeholder="SSN" />
                  </FormControl>
              </Stack>
              <Stack direction={{sm: 'row', xs: 'column'}} spacing={2} flexWrap="wrap" useFlexGap>
                <FormControl>
                  <FormLabel>Phone number</FormLabel>
                  <Input size="sm" placeholder="+233 557 31 1180" slotProps={{
                    input: {
                      component: NumericFormatAdapter,
                    },
                  }} sx={{flexGrow: 1}} />
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
