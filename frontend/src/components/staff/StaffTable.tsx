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
import Checkbox from '@mui/joy/Checkbox';
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

import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const rows = [
  {
    id: 'STF1234',
    date: 'Feb 3, 2023',
    type: 'PartTime',
    assigned_treatment: 'Dental Service',
    staff: {
      initial: 'O',
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
      phone: '+233244750745',
      portfolio: 'Dentist',
      working_days: ['M', 'T', 'W']
    },
  },
  {
    id: 'STF1233',
    date: 'Feb 3, 2023',
    type: 'FullTime',
    assigned_treatment: 'Out-Patient Care',
    staff: {
      initial: 'S',
      name: 'Steve Hampton',
      email: 'steve.hamp@email.com',
      phone: '+233244750745',
      portfolio: 'ER Nurse',
      
    },
  },
  {
    id: 'STF1232',
    date: 'Feb 3, 2023',
    type: 'FullTime',
    assigned_treatment: 'Brain Tumor Surgery',
    staff: {
      initial: 'C',
      name: 'Ciaran Murray',
      email: 'ciaran.murray@email.com',
      phone: '+233244750745',
      portfolio: 'Neurologist'
    },
  },
  {
    id: 'STF1231',
    date: 'Feb 3, 2023',
    type: 'Suspended',
    assigned_treatment: 'Fibroid Surgical Removal',
    staff: {
      initial: 'M',
      name: 'Maria Macdonald',
      email: 'maria.mc@email.com',
      phone: '+233244750745',
      portfolio: 'Surgeon'
    },
  },
  {
    id: 'STF1230',
    date: 'Feb 3, 2023',
    type: 'PartTime',
    assigned_treatment: 'Injured Rehabilitation',
    staff: {
      initial: 'C',
      name: 'Charles Fulton',
      email: 'fulton@email.com',
      phone: '+233244750745',
      portfolio: 'Homeopathic Specialist'
    },
  },
  {
    id: 'STF1229',
    date: 'Feb 3, 2023',
    type: 'FullTime',
    assigned_treatment: 'Delivery Ward',
    staff: {
      initial: 'J',
      name: 'Jay Hooper',
      email: 'hooper@email.com',
      phone: '+233244750745',
      portfolio: 'Nurse'
    },
  },
  {
    id: 'STF1228',
    date: 'Feb 3, 2023',
    type: 'PartTime',
    assigned_treatment: 'Out-Patient Ward',
    staff: {
      initial: 'J',
      name: 'Jackie Conner',
      email: 'jackie@email.com',
      phone: '+233244750745',
      portfolio: 'Clerk'
    },
  }
  
];

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

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreVertIcon/>
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>View</MenuItem>
        
        
        <Divider />
        <MenuItem color="primary">Update Details</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function StaffTable() {
  const [order, setOrder] = React.useState<Order>('desc');
  const [open, setOpen] = React.useState(false);
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
              <th style={{ width: 100, padding: '12px 6px' }}>Type</th>
              <th style={{ width: 50, padding: '12px 6px' }}> </th>
            </tr>
          </thead>
          <tbody>
            {stableSort(rows, getComparator(order, 'id')).map((row) => (
              <tr key={row.id}>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar size="sm">{row.staff.initial}</Avatar>
                    <div>
                      <Typography level="body-xs">{row.staff.name}</Typography>
                      <Typography level="body-xs" sx={{fontSize: '10px', fontWeight: 'bold'}}>{row.staff.portfolio}</Typography>
                    </div>
                    
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2,  }}>
                      
                      <div>
                        <Typography level="body-xs">{row.staff.phone}</Typography>
                        <Typography level="body-xs">{row.staff.email}</Typography>
                      </div>
                      
                  </Box>
                </td>
                
                <td>
                  <Typography level="body-xs" sx={{ display: 'flex', gap: 1}}>
                  <Chip size="sm" color="primary" variant="solid">
                      S
                    </Chip>
                    <Chip size="sm" color="primary" variant="solid">
                      M
                    </Chip>
                    <Chip size="sm" color="neutral" variant="solid">
                      T
                    </Chip>
                    <Chip size="sm" color="neutral" variant="solid">
                      W
                    </Chip>
                    <Chip size="sm" color="primary" variant="solid">
                      T
                    </Chip>
                    <Chip size="sm" color="neutral" variant="solid">
                      F
                    </Chip>
                    <Chip size="sm" color="primary" variant="solid">
                      S
                    </Chip>
                    
                  </Typography>
                </td>
                <td>
                    <Typography level="body-xs">{row.assigned_treatment}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    
                    color={
                      {
                        FullTime: 'success',
                        PartTime: 'warning',
                        Suspended: 'danger',
                      }[row.type] as ColorPaletteProp
                    }
                  >
                    {row.type}
                  </Chip>
                </td>
                
               
               
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    
                    <RowMenu />
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