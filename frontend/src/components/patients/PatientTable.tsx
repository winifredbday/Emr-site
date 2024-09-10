/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import PreviewIcon from '@mui/icons-material/Preview';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { format } from 'date-fns';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Link as RouterLink } from 'react-router-dom';
import { arrayBuffer } from 'stream/consumers';


interface Patient{
  id: string | number;
  user: {
    firstname: string;
    lastname: string;
    email: string;
  }
  address: string;
  contact_number: number;
  gender: 'Male' | 'Female' | 'Other';
  date_of_birth: string;
  work: string;
  height: number;
  status: 'discharged' | 'active' | 'observation';
  reg_date: string;
 
  
}

interface RowMenuProps {
  patient: Patient; // Assuming `Patient` is the type with required properties
}
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const RowMenu: React.FC<RowMenuProps> = ({patient}) => {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <Link
        
          component={RouterLink}
          to={`/patients/${patient.id}`}
          
          
        >
          <MenuItem sx={{flexGrow: 1}}>View</MenuItem>
      
        </Link>
        
        
        <Divider />
        <MenuItem color="primary">Update Details</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function PatientTable() {
  const [order, setOrder] = React.useState<Order>('desc');
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    // Fetch patient data from the backend
    const fetchPatients = async () => {
      try {
        const response = await fetch('https://emr-backend.up.railway.app/accounts/patients/'); // Adjust the API endpoint as needed
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Failed to fetch patient data:', error);
      }
    };

    fetchPatients();
  }, []);
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value="active">Active Treatment</Option>
          <Option value="under-observation">Under Observation</Option>
          <Option value="discharged">Discharged</Option>
    
        </Select>
      </FormControl>
      
      <FormControl size="sm">
        <FormLabel>Gender</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: 'flex', sm: 'none' },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for patient</FormLabel>
          <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="PatientTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              
              <th style={{ width: 100, padding: '12px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  }}
                >
                 ID
                </Link>
              </th>
              <th style={{ width: 120, padding: '12px 6px' }}>Registered</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Status</th>
              <th style={{ width: 210, padding: '12px 6px' }}>Patient Details</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Phone</th>
              <th style={{ width: 120, padding: '12px 6px' }}>Address</th>
              <th style={{ width: 80, padding: '12px 6px' }}> </th>
            </tr>
          </thead>
          <tbody>
            {stableSort(patients, getComparator(order, 'id')).map((patient) => (
              <tr key={patient.id}>
                
                <td>
                  <Typography level="body-xs" sx={{pl: 1}}>{patient.id}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{format(new Date(patient.reg_date), 'yyyy-MM-dd')}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        discharged: <CheckRoundedIcon />,
                        active: <AutorenewRoundedIcon />,
                        observation: <PreviewIcon />,
                      
                      }[patient.status]
                    }
                    color={
                      {
                        discharged: 'success',
                        observation: 'neutral',
                        active: 'warning',
                      }[patient.status] as ColorPaletteProp
                    }
                  >
                    {patient.status.toUpperCase()}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm">{patient.user.firstname?.charAt(0)}</Avatar>
                    <div>
                      <Typography level="body-xs">{patient.user.firstname} {patient.user.lastname}</Typography>
                      <Typography level="body-xs">{patient.user.email}</Typography>
                    </div>
                    
                  </Box>
                </td>
                <td>
                    <Typography level="body-xs">{patient.contact_number}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{patient.address}</Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Link
                    component={RouterLink}
                    to={`/patients/${patient.id}`}
                    level="body-xs"
                    
                  >
                    View
                  </Link>
                    <RowMenu patient={patient}/>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? 'outlined' : 'plain'}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}