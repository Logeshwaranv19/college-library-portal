import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import StudentPortal from './pages/student/StudentPortal';
import LibrarianPanel from './pages/librarian/LibrarianPanel';
import Login from './pages/auth/Login';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32',
    },
    secondary: {
      main: '#FF6F00',
    },
  },
});

function App() {
  const [user, setUser] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/student" 
              element={user ? <StudentPortal user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/librarian" 
              element={user ? <LibrarianPanel user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={<Login setUser={setUser} />} 
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;