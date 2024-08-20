import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Table from '@mui/joy/Table';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import ModalClose from '@mui/joy/ModalClose';
import Autocomplete from '@mui/joy/Autocomplete';
import IconButton from '@mui/joy/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const doctors = [
  { value: 'olivia', label: 'Dr. Olivia Rhye' },
  { value: 'steve', label: 'Dr. Steve Hampton' },
  { value: 'ciaran', label: 'Dr. Ciaran Murray' },
  { value: 'marina', label: 'Dr. Marina Macdonald' },
  { value: 'charles', label: 'Dr. Charles Fulton' },
  { value: 'jay', label: 'Dr. Jay Hoper' },
];

interface Prescription {
  name: string;
  direction: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface AddAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  preselectedDoctor?: string | null;
}

export default function AddPrescriptionModal({
  open,
  onClose,
  onSubmit,
  preselectedDoctor,
}: AddAppointmentModalProps) {
  const [selectedDoctor, setSelectedDoctor] = React.useState<string | null>(preselectedDoctor || null);
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [direction, setDirection] = React.useState<string>('');
  const [quantity, setQuantity] = React.useState<number>(1);
  const [unitPrice, setUnitPrice] = React.useState<number>(0);
  const [prescriptions, setPrescriptions] = React.useState<Prescription[]>([]);

  React.useEffect(() => {
    if (preselectedDoctor) {
      setSelectedDoctor(preselectedDoctor);
    }
  }, [preselectedDoctor]);

  const handleAddPrescription = () => {
    if (name && direction && quantity > 0 && unitPrice > 0) {
      const totalPrice = unitPrice * quantity;
      const newPrescription = {
        name,
        direction,
        quantity,
        unit_price: unitPrice,
        total_price: totalPrice,
      };

      setPrescriptions([...prescriptions, newPrescription]);

      // Reset the input fields
      setName('');
      setDirection('');
      setQuantity(1);
      setUnitPrice(0);
    }
  };


  const handleDeletePrescription = (index: number) => {
    const updatedPrescriptions = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(updatedPrescriptions);
  };

  const isAddButtonDisabled = !name || !direction || quantity <= 0 || unitPrice <= 0;

  const handleFormSubmit = () => {
    const formData = {
      doctor: selectedDoctor,
      patient: {
        firstName: firstName,
        lastName: lastName,
      },
      prescriptions,
    };
    onSubmit(formData); // Call the onSubmit function with form data
  };

  return (
    <React.Fragment>
      <Modal keepMounted open={open} onClose={onClose}>
        <ModalDialog>
          <DialogTitle sx={{ fontSize: '1.2rem' }}>
            Add Prescription
            <ModalClose variant="plain" sx={{ m: 1 }} />
          </DialogTitle>

          <DialogContent sx={{ marginTop: '1rem' }}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Patient</FormLabel>
                <Box sx={{ display: 'flex', flexDirection: { sm: 'row', xs: 'column', md: 'row' }, gap: 2 }}>
                  <FormControl sx={{flexGrow: 1}}>
                    <Input
                      size="sm"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)} // Capture first name
                    />
                  </FormControl>
                  <FormControl sx={{flexGrow: 1}}>
                    <Input
                      size="sm"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)} // Capture last name
                      sx={{ flexGrow: 1 }}
                    />
                  </FormControl>
                </Box>
              </Stack>

              <Stack spacing={1} direction={{ sm: 'row' }} flexWrap="wrap" sx={{ gap: 2 }}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Doctor</FormLabel>
                  <Autocomplete
                    value={selectedDoctor}
                    onChange={(event, newValue) => setSelectedDoctor(newValue)}
                    size="sm"
                    sx={{ width: '48%' }}
                    options={doctors.map((option) => option.label)}
                    slotProps={{
                      input: {
                        placeholder: 'Select doctor',
                      },
                    }}
                  />
                </FormControl>
              </Stack>

              {/* Prescription Box */}
              <Stack>
                <FormLabel>Prescription List</FormLabel>
                <Box sx={{ p: 2 }}>
                  <Box sx={{overflowY: 'auto'}}>
                    {/* List of selected prescriptions */}
                    <Table size="sm" variant="soft" borderAxis="bothBetween" sx={{ fontSize: '10px', m: 0 }}>
                      <thead>
                        <tr>
                          <th style={{ padding: '.3rem', height: 'fit-content' }}>Name</th>
                          <th style={{ padding: '.3rem', height: 'fit-content' }}>Direction</th>
                          <th style={{ padding: '.3rem .2rem', textAlign: 'center', width: 55, height: 'fit-content' }}>Quantity</th>
                          <th style={{ padding: '.3rem .2rem', textAlign: 'center', width: 70, height: 'fit-content' }}>Total Price</th>
                          <th style={{ padding: '.3rem .2rem', textAlign: 'center', width: 60, height: 'fit-content' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prescriptions.map((prescription, index) => (
                          <tr key={index}>
                            <td>{prescription.name}</td>
                            <td>{prescription.direction}</td>
                            <td style={{textAlign: 'center'}}>{prescription.quantity}</td>
                            <td style={{textAlign: 'center'}}>${prescription.total_price.toFixed(2)}</td>
                            <td style={{textAlign: 'center'}}>
                              <IconButton
                                size="sm"
                                color="danger"
                                onClick={() => handleDeletePrescription(index)}
                              >
                                <DeleteIcon sx={{fontSize: '14px'}}/>
                              </IconButton>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <FormControl>
                          <FormLabel>Drug name</FormLabel>
                          <Input
                            size="sm"
                            placeholder="Drug name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Capture drug name
                          />
                        </FormControl>
                        <FormControl sx={{ width: 100 }}>
                          <FormLabel>Unit Price</FormLabel>
                          <Input
                            startDecorator={'$'}
                            size="sm"
                            placeholder="Unit Price"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(Number(e.target.value))} // Capture unit price
                          />
                        </FormControl>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <FormControl>
                          <FormLabel>Direction</FormLabel>
                          <Input
                            size="sm"
                            placeholder="Direction"
                            value={direction}
                            onChange={(e) => setDirection(e.target.value)} // Capture direction
                          />
                        </FormControl>

                        <FormControl sx={{ width: 100 }}>
                          <FormLabel>Quantity</FormLabel>
                          <Input
                            type="number"
                            size="sm"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))} // Capture quantity
                          />
                        </FormControl>
                      </Box>
                    </Box>
                    <Button
                      color="primary"
                      size="sm"
                      onClick={handleAddPrescription}
                      disabled={isAddButtonDisabled}
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
              </Stack>

              <Button color="primary" size="sm" sx={{ width: '50%' }} onClick={handleFormSubmit}>
                Submit
              </Button>
            </Stack>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
