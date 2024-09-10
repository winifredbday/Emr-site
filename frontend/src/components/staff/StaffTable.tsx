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
import { Link as RouterLink } from 'react-router-dom';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// const rows = [
//   {
//     id: 'STF1234',
//     date: 'Feb 3, 2023',
//     type: 'PartTime',
//     assigned_treatment: 'Dental Service',
//     staff: {
//       avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286",
//       name: 'Olivia Ryhe',
//       email: 'olivia@email.com',
//       phone: '+233244750745',
//       portfolio: 'Dentist',
//       working_days: ['M', 'T', 'W']
//     },
//   },
//   {
//     id: 'STF1233',
//     date: 'Feb 3, 2023',
//     type: 'FullTime',
//     assigned_treatment: 'Out-Patient Care',
//     staff: {
//       avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286",
//       name: 'Steve Hampton',
//       email: 'steve.hamp@email.com',
//       phone: '+233244750745',
//       portfolio: 'ER Nurse',
      
//     },
//   },
//   {
//     id: 'STF1232',
//     date: 'Feb 3, 2023',
//     type: 'FullTime',
//     assigned_treatment: 'Brain Tumor Surgery',
//     staff: {
//       avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286",
//       name: 'Ciaran Murray',
//       email: 'ciaran.murray@email.com',
//       phone: '+233244750745',
//       portfolio: 'Neurologist'
//     },
//   },
//   {
//     id: 'STF1231',
//     date: 'Feb 3, 2023',
//     type: 'Suspended',
//     assigned_treatment: 'Fibroid Surgical Removal',
//     staff: {
//       avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286",
//       name: 'Maria Macdonald',
//       email: 'maria.mc@email.com',
//       phone: '+233244750745',
//       portfolio: 'Surgeon'
//     },
//   },
//   {
//     id: 'STF1230',
//     date: 'Feb 3, 2023',
//     type: 'PartTime',
//     assigned_treatment: 'Injured Rehabilitation',
//     staff: {
//       avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286",
//       name: 'Charles Fulton',
//       email: 'fulton@email.com',
//       phone: '+233244750745',
//       portfolio: 'Homeopathic Specialist'
//     },
//   },
//   {
//     id: 'STF1229',
//     date: 'Feb 3, 2023',
//     type: 'FullTime',
//     assigned_treatment: 'Delivery Ward',
//     staff: {
//       avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286",
//       name: 'Jay Hooper',
//       email: 'hooper@email.com',
//       phone: '+233244750745',
//       portfolio: 'Nurse'
//     },
//   },
//   {
//     id: 'STF1228',
//     date: 'Feb 3, 2023',
//     type: 'PartTime',
//     assigned_treatment: 'Out-Patient Ward',
//     staff: {
//       avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286",
//       name: 'Jackie Conner',
//       email: 'jackie@email.com',
//       phone: '+233244750745',
//       portfolio: 'Clerk'
//     },
//   }
  
// ];


interface Staff {
  id: number;
  avatar: string | File;
  user: {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
  };
  address: string;
  contact_number: string;
  work_status: string;
  specialization: string;
  assigned_treatment: string;
  gender: string;
  date_of_birth: string;
  working_days: string[];
  created_at: string;
}

interface RowMenuProps {
  staffmember: Staff;
}

const statusColors: { [key: string]: ColorPaletteProp } = {
  'full-time': 'success',
  'part-time': 'warning',
  'consultant': 'danger',
  'temporary': 'neutral'
};


function getStatusColor(status: string): ColorPaletteProp {
  return statusColors[status.toLowerCase()] || 'defaultColor'; // 'defaultColor' is a fallback
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

const RowMenu: React.FC<RowMenuProps> = ({staffmember}) => {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreVertIcon/>
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
      <Link
        
        component={RouterLink}
        to={`/staff/${staffmember.id}`}
        
        
      >
        <MenuItem sx={{flexGrow: 1}}>View</MenuItem>
    
      </Link>
        
        
        <Divider />
        <MenuItem color="primary">Update Details</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function StaffTable() {
  const [order, setOrder] = React.useState<Order>('desc');
  const [staff, setStaff] = React.useState<Staff[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    // Fetch patient data from the backend
    const fetchStaff = async () => {
      try {
        const response = await fetch('https://emr-backend.up.railway.app/accounts/staff/'); // Adjust the API endpoint as needed
        const data = await response.json();
        setStaff(data);
        console.log(data)
      } catch (error) {
        console.error('Failed to fetch staff data:', error);
      }
    };

    fetchStaff();
  }, []);


  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>type</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by type"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value="full-time">Full-Time</Option>
          <Option value="part-time">Part-Time</Option>
          <Option value="suspended">Suspended</Option>
    
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
          <FormLabel>Search for staff member</FormLabel>
          <Input size="sm" placeholder="Search using name or id" startDecorator={<SearchIcon />} />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="StaffTableContainer"
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
              
              <th style={{ width: 200, padding: '12px' }}>
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
                 Name
                </Link>
              </th>
              <th style={{ width: 160, padding: '12px 6px' }}>Contact</th>
              
              <th style={{ width: 210, padding: '12px 6px' }}>Working Days</th>
              <th style={{ width: 200, padding: '12px 6px' }}>Assigned Treatment</th>
              <th style={{ width: 100, padding: '12px 6px' }}>Work Status</th>
              <th style={{ width: 50, padding: '12px 6px' }}> </th>
            </tr>
          </thead>
          <tbody>
            {stableSort(staff, getComparator(order, 'id')).map((staffmember) => (
              <tr key={staffmember.id}>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm" src={
                      typeof staffmember.avatar === 'string'
                      ? staffmember.avatar
                      : URL.createObjectURL(staffmember.avatar)
                    }/>
                    <div>
                      <Typography level="body-xs">{staffmember.user.firstname} {staffmember.user.lastname} </Typography>
                      <Typography level="body-xs" sx={{fontSize: '10px', fontWeight: 'bold'}}>{staffmember.specialization}</Typography>
                    </div>
                    
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2,  }}>
                      
                      <div>
                        <Typography level="body-xs">+{staffmember.contact_number}</Typography>
                        <Typography level="body-xs">{staffmember.user.email}</Typography>
                      </div>
                      
                  </Box>
                </td>
                
                <td>
                  <Typography level="body-xs" sx={{ display: 'flex', gap: 1}}>
                  {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                      <Chip key={index} size="sm" color={staffmember.working_days.includes(day) ? 'primary' : 'neutral'} variant="solid">
                        {day.charAt(0)}
                      </Chip>
                    ))}
                    
                  </Typography>
                </td>
                <td>
                    <Typography level="body-xs">{staffmember.assigned_treatment}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    
                    color={
                      getStatusColor(staffmember.work_status)
                    }
                  >
                    {staffmember.work_status.toUpperCase()}
                  </Chip>
                </td>
                
               
               
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    
                    <RowMenu staffmember={staffmember}/>
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