import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
// import { NumericFormat, NumericFormatProps } from 'react-number-format';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';

import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Divider from '@mui/joy/Divider';


interface AddTreatmentProps{
    open: boolean;
    onClose: () => void;
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

export default function AddTreatmentModal({open, onClose}: AddTreatmentProps) {
  const [time, setTime] = React.useState('mins');
  
  const handleSelectChange = (event: any, value: string | null) => {

  };
  return (
    <React.Fragment>
     
      <Modal keepMounted open={open} onClose={onClose} sx={{}}>
        <ModalDialog sx={{width: {xs: '100%'}, height: {xs: '80%'}, mt: {xs: '5%'}}}>
          <DialogTitle sx={{fontSize: '1.2rem'}}>Add Treatment  <ModalClose variant="plain" sx={{ m: 1 }} /></DialogTitle>
          <DialogContent sx={{marginTop: '1rem'}}>
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{ display: "flex", flexDirection: {sm: 'row', xs: 'column', md: 'row' }, gap: 2 }}
                >
                  <Input placeholder="Treatment name" sx={{flexGrow: 1, fontSize: '14px'}} />
                  
                </FormControl>
              </Stack>
              <Stack spacing={1} direction={{sm: 'row'}} sx={{gap: {xs: 2}}} flexWrap="wrap" useFlexGap>
                <FormControl sx={{width: {sm: 200}}}>
                    <FormLabel>Price</FormLabel>
                    <Input startDecorator={'$'}  placeholder="Price" sx={{fontSize: '14px'}} />
                </FormControl>
                
                  <FormControl sx={{flexGrow: 1}}>
                    <FormLabel>Estimated duration</FormLabel>
                    <Input
                      type='number'
                      placeholder="1.62"
                      
                      sx={{fontSize:"14px", width: 200}}
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
                              <Option value="MultipleVisit" sx={{ minWidth: 200, fontSize: '14px' }}>Multiple Visit</Option>
                              <Option value="SingleVisit" sx={{ minWidth: 200, fontSize: '14px' }}>Single Visit</Option>
                              
                           
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
