import * as React from 'react';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import TreatmentTable from '../../components/treatments/TreatmentTable';
import TreatmentList from '../../components/treatments/MobileList';
import Divider from '@mui/joy/Divider';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import axios from 'axios'
import AddTreatmentModal from '../../components/treatments/AddTreatmentModal';

interface Treatment {
  id: number;
  name: string;
  price: number;
  estimated_duration: string;
  visit_type: string;
}

const Treatments: React.FC = () => {
  const [treatments, setTreatments] = React.useState<Treatment[]>([]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await axios.get('https://emr-backend.up.railway.app/clinic/treatments/');
        setTreatments(response.data);
      } catch (error) {
        console.error('Failed to fetch treatments:', error);
      }
    };

    fetchTreatments();
  }, []);

  // const handleAddTreatment = async (newTreatment: any) => {
  //   try {
  //     const response = await axios.get('https://emr-backend.up.railway.app/clinic/treatments/');
  //     console.log(response.data)
  //     setTreatments((prev) => [...prev, response.data]);
  //     setModalOpen(false);
  //   } catch (error) {
  //     console.error('Failed to add treatment:', error);
  //   }
  // };

  const handleDeleteTreatment = (id: number) => {
    setTreatments((prev) => prev.filter((treatment) => treatment.id !== id));
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        px: { xs: 2, md: 6 },
        pt: {
          xs: 'calc(12px + var(--Header-height))',
          sm: 'calc(12px + var(--Header-height))',
          md: 3,
        },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100dvh',
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="small" />}
          sx={{ pl: 0 }}
        >
          <Link
            underline="none"
            color="neutral"
            href="#some-link"
            aria-label="Home"
          >
            <HomeRoundedIcon />
          </Link>
          <Link
            underline="hover"
            color="neutral"
            href="#some-link"
            fontSize={12}
            fontWeight={500}
          >
            Clinic
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            Treatments
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: 'flex',
          mb: 1,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Typography level="h2" component="h1">
          Treatments
        </Typography>
        
      </Box>
      <Divider />
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1}}>
        <FormatListBulletedIcon/>
        <Typography component="h2" level="h2">{treatments.length}</Typography>
        <Typography level="body-sm" fontWeight={600}>Active treatments</Typography>
      </Box>
      <TreatmentTable treatments={treatments} onTreatmentDeleted={handleDeleteTreatment} onOpenModal={handleOpenModal} />
      <TreatmentList />
      <AddTreatmentModal open={modalOpen} onClose={() => setModalOpen(false)}  />
    </Box>
  );
};
export default Treatments