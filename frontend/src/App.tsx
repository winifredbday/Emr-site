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
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      {!isAuthPage && <Header />}
      {!isAuthPage && <Sidebar />}
      <div className="content" style={{ flex: 1 }}>
        {children}
      </div>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Suspense fallback={<CircularProgress sx={{ display: 'flex', height: '100vh', justifyContent: 'center', width: '100%', alignItems: 'center'}} />}>
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
