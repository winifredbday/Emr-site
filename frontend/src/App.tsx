import React, { Suspense, ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import routes from './routes';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup'; // Update paths as needed

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {!isAuthPage && <Header />}
      {!isAuthPage && <Sidebar />}
      <Box sx={{ flex: 1, position: 'relative' }}>
        {children}
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Suspense
          fallback={
            <Box sx={{ position: 'relative', height: '100vh' }}>
              <CircularProgress
                sx={{
                  display: 'flex',
                  height: '100vh',
                  justifyContent: 'center',
                  width: '100%',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: -9999, // Ensure it's above other content but below the sidebar
                }}
              />
            </Box>
          }
        >
          <Routes>
            {routes.map(({ path, component: Component }, index) => (
              <Route
                key={index}
                path={path}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              />
            ))}
          </Routes>
        </Suspense>
      </CssVarsProvider>
    </Router>
  );
}

export default App;
