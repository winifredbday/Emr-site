import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

function App() {
  return (
    <Router>
       <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Header />
            <Sidebar />
            <div className="content" style={{ flex: 1 }}>
              <Suspense fallback={<CircularProgress sx={{ display: 'flex', height: '100vh', justifyContent: 'center', width: '100%', alignItems: 'center'}} />}>
                <Routes>
                  {routes.map(({ path, component: Component }, index) => (
                    <Route key={index} path={path} element={<Component />} />
                  ))}
                </Routes>
              </Suspense>
            </div>
          </Box>
        </CssVarsProvider>
    </Router>
  );
}

export default App;
