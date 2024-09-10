import React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
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
import axios from 'axios';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import AddTreatmentModal from './AddTreatmentModal';

interface Treatment {
  id: number;
  name: string;
  price: number;
  estimated_duration: string;
  visit_type: string;
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
interface TreatmentTableProps {
  treatments: Treatment[];
  onOpenModal: () => void;
  onTreatmentDeleted: (id: number) => void; // Callback to update the state after deletion
}

const deleteTreatment = async (id: number) => {
  await axios.delete(`https://emr-backend.up.railway.app/clinic/treatments/${id}/`);
};

const RowMenu: React.FC<{ treatmentId: number; onDelete: (id: number) => void }> = ({ treatmentId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteTreatment(treatmentId); // DELETE request to Django API
      onDelete(treatmentId); // Update the state in the parent component
    } catch (error) {
      console.error('Failed to delete treatment:', error);
    }
  };

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <Divider />
        <MenuItem color="danger" onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
};

const TreatmentTable: React.FC<TreatmentTableProps> = ({ treatments, onTreatmentDeleted, onOpenModal }) => {
  const [order, setOrder] = React.useState<'asc' | 'desc'>('desc');
  const [selected, setSelected] = React.useState<number[]>([]);
  const [open, setOpen] = React.useState(false);
  // const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleDelete = (id: number) => {
    onTreatmentDeleted(id);
  };

  const handleOpen = () => onOpenModal();
  const handleClose = () => setOpen(false);

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Type of Visit</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by visit"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
        >
          <Option value="single">Single Visit</Option>
          <Option value="multiple">Multiple Visit</Option>
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
          flexWrap: { xs: 'wrap' },
          my: 1,
          gap: 1,
        }}
      >
        <Button
          color="primary"
          startDecorator={<AddRoundedIcon />}
          size="sm"
          sx={{ display: "flex", alignItems: "center", mb: { xs: 1 } }}
          onClick={handleOpen}
        >
          Add Treatment
        </Button>
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
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for treatment</FormLabel>
          <Input size="sm" placeholder="Search by treatment name" sx={{ width: { sm: "50%", xs: "100%" } }} startDecorator={<SearchIcon />} />
        </FormControl>
        {renderFilters()}
        <Button
          color="primary"
          startDecorator={<AddRoundedIcon />}
          size="sm"
          sx={{ display: "flex", alignItems: "center" }}
          onClick={handleOpen}
        >
          Add Treatment
        </Button>
      </Box>
      <Sheet
        className="RevenueTableContainer"
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
              <th style={{ width: 35, textAlign: 'center', padding: '12px 6px' }}>
                <Checkbox
                  size="sm"
                  indeterminate={selected.length > 0 && selected.length !== treatments.length}
                  checked={selected.length === treatments.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? treatments.map((row) => row.id) : [],
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === treatments.length
                      ? 'primary'
                      : undefined
                  }
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
              <th style={{ width: 240, padding: '12px 6px' }}>
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
                  Treatment Name
                </Link>
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>Price</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Estimated Duration</th>
              <th style={{ width: 100, padding: '12px 6px' }}>Type of Visit</th>
              <th style={{ width: 50, padding: '12px 6px' }}> </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(treatments) && stableSort(treatments, getComparator(order, 'name')).map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? 'primary' : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(row.id)
                          : ids.filter((itemId) => itemId !== row.id),
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                    sx={{ verticalAlign: 'text-bottom' }}
                  />
                </td>
                <td>
                  <Typography level="body-xs" fontWeight={'bold'}>{row.name}</Typography>
                </td>
                <td>
                  <Typography level="body-xs"> <b>${row.price}</b></Typography>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Typography level="body-xs">{row.estimated_duration}</Typography>
                  </Box>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    color={
                      {
                        single: 'success',
                        multiple: 'warning',
                      }[row.visit_type] as ColorPaletteProp
                    }
                  >
                    {row.visit_type === "single" ? "Single Visit" : "Multiple Visit"}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <RowMenu
                      key={row.id}
                      treatmentId={row.id}
                      onDelete={handleDelete}
                    />
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
};

export default TreatmentTable;
