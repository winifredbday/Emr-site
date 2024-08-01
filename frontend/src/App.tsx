import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';

function App() {
  return (
    <Router>
       <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />
          <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Header />
            <Sidebar />
            <div className="content" style={{ flex: 1 }}>
              <Suspense fallback={<div>Loading...</div>}>
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
