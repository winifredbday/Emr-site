import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ColorSchemeToggle from './ColorSchemeToggle';
import { closeSidebar } from '../utils/utils';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth'; // Import the useAuth hook

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // Fetch user data from the hook

  const handleSignout = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (!token) {
        console.error('No token found'); // Log error if token is not found
        alert('No token found. Please log in again.');
        return;
      }

      const response = await axios.post(
        'https://emr-backend.up.railway.app/accounts/signout/',
        {},
        {
          headers: {
            Authorization: `Token ${token}`, // Include token in the Authorization header
          },
        }
      );

      console.log('Sign out response:', response); // Log response for debugging
      localStorage.removeItem('token'); // Remove token from local storage
      navigate('/signin'); // Redirect to sign-in page
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Signout error:', error.response?.data || error.message);
        alert('Failed to log out. Please try again.');
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleListItemClick = () => {
    closeSidebar(); // Close the sidebar in mobile view
  };

  const renderSidebarLinks = () => {
    if (!user) return null;

    switch (user.role) {
      case 'patient':
        return (
          <>
            <ListItem>
              <ListItemButton
                role="menuitem"
                component={Link}
                to="/"
                onClick={handleListItemClick}
                selected={location.pathname === '/' ? true : false}>
                <DashboardRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Dashboard</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                role="menuitem"
                component={Link}
                to="/messages"
                onClick={handleListItemClick}
                selected={location.pathname === '/messages' ? true : false}
              >
                <QuestionAnswerRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Messages</Typography>
                </ListItemContent>
                <Chip size="sm" color="primary" variant="solid">
                  4
                </Chip>
              </ListItemButton>
            </ListItem>
            
            <ListItem>
              <ListItemButton
                role="menuitem"
                component={Link}
                to="/appointments"
                onClick={handleListItemClick}
                selected={location.pathname === '/appointments' ? true : false}>
                <AssignmentRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Appointments</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                role="menuitem"
                component={Link}
                to="/prescriptions"
                onClick={handleListItemClick}
                selected={location.pathname === '/prescriptions' ? true : false}>
                <AssignmentRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Prescriptions</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                role="menuitem"
                component={Link}
                to="/profile"
                onClick={handleListItemClick}
                selected={location.pathname === '/profile' ? true : false}>
                <PersonRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Profile</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          </>
        );

      case 'admin':
        return (
          <>
            <ListItem>
              <ListItemButton
                role="menuitem"
                component={Link}
                to="/"
                onClick={handleListItemClick}
                selected={location.pathname === '/' ? true : false}>
                <DashboardRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Dashboard</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>

            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}>
                    <AssignmentRoundedIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Clinic</Typography>
                    </ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                    />
                  </ListItemButton>
                )}
              >
                <List sx={{ gap: 0.5 }}>
                  <ListItem >
                    <ListItemButton
                      role="menuitem"
                      component={Link}
                      
                      to="/patients"
                      onClick={handleListItemClick}
                      selected={location.pathname === '/patients' ? true : false}>
                      <Typography level='title-sm'>Patients</Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      role="menuitem"
                      component={Link}
                      to="/staff"
                      onClick={handleListItemClick}
                      selected={location.pathname === '/staff' ? true : false}>
                      <Typography level='title-sm'>Staff List</Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      role="menuitem"
                      component={Link}
                      to="/appointments"
                      onClick={handleListItemClick}
                      selected={location.pathname === '/appointments' ? true : false}>
                      <Typography level='title-sm'>Appointments</Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      role="menuitem"
                      component={Link}
                      to="/treatments"
                      onClick={handleListItemClick}
                      selected={location.pathname === '/treatments' ? true : false}>
                      <Typography level='title-sm'>Treatments</Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      role="menuitem"
                      component={Link}
                      to="/prescriptions"
                      onClick={handleListItemClick}
                      selected={location.pathname === '/prescriptions' ? true : false}>
                      <Typography level='title-sm'>Prescriptions</Typography>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Toggler>
            </ListItem>

            <ListItem>
              <ListItemButton
                role="menuitem"
                component={Link}
                to="/messages"
                onClick={handleListItemClick}
                selected={location.pathname === '/messages' ? true : false}
              >
                <QuestionAnswerRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Messages</Typography>
                </ListItemContent>
                <Chip size="sm" color="primary" variant="solid">
                  4
                </Chip>
              </ListItemButton>
            </ListItem>

            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}>
                    <AttachMoneyRoundedIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Billing</Typography>
                    </ListItemContent>
                    <KeyboardArrowDownIcon
                      sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                    />
                  </ListItemButton>
                )}
              >
                <List sx={{ gap: 0.5 }}>
                  <ListItem>
                    <ListItemButton
                      role="menuitem"
                      component={Link}
                      to="/transactions"
                      onClick={handleListItemClick}
                      selected={location.pathname === '/transactions' ? true : false}>
                      <Typography level='title-sm'>Transactions</Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      role="menuitem"
                      component={Link}
                      to="/invoice"
                      onClick={handleListItemClick}
                      selected={location.pathname === '/invoice' ? true : false}>
                      <Typography level='title-sm'>Invoice</Typography>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Toggler>
            </ListItem>

            <ListItem>
              <ListItemButton
                role="menuitem"
                component={Link}
                to="/profile"
                onClick={handleListItemClick}
                selected={location.pathname === '/profile' ? true : false}>
                <PersonRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Profile</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          [`.${listItemButtonClasses.root}`]: {
            borderRadius: theme.radius.sm,
            '&:hover': {
              bgcolor: theme.palette.background.level1,
            },
          },
        })}
      />

<Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton variant="soft" color="primary" size="sm">
            <BrightnessAutoRoundedIcon />
          </IconButton>
          <Typography level="title-lg">Logo</Typography>
          <ColorSchemeToggle sx={{ ml: 'auto' }} />
        </Box>
        
        <Divider />
        <List
          sx={{
            py: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {renderSidebarLinks()}
        </List>
        <Box/>
        <Divider />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        
          <Box component={Link} to="/profile" sx={{ display: 'flex', textDecoration: 'none', gap: 1, alignItems: 'center' }}>
            <Avatar
              variant="outlined"
              size="sm"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
            />
            <Box sx={{ minWidth: 0, boxSizing: 'border-box', flex: 1 }}>
              <Typography level="title-sm">{user?.firstname} {user?.lastname}</Typography>
              <Typography level="body-xs" sx={{fontSize: '10px'}}>{user?.email}</Typography>
            </Box>
          </Box>
          <IconButton size="sm" variant="plain" color="neutral" onClick={handleSignout}>
            <LogoutRoundedIcon />
          </IconButton>
        
      </Box>
    
    </Sheet>
  );
}
