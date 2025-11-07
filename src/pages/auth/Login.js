import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Alert
} from '@mui/material';
import { School, AdminPanelSettings } from '@mui/icons-material';

const Login = ({ setUser }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Define valid credentials with email format
    const validCredentials = {
      student: { email: 'student@gmail.com', password: 'student' },
      admin: { email: 'admin@gmail.com', password: 'admin' }
    };

    const currentRole = credentials.role;
    const valid = validCredentials[currentRole];

    // Check credentials
    if (credentials.email === valid.email && credentials.password === valid.password) {
      // Successful login
      const userData = {
        email: credentials.email,
        role: credentials.role,
        name: credentials.role === 'student' ? 'Logesh' : 'Librarian Admin',
        id: credentials.role === 'student' ? 1 : 1001
      };
      
      setUser(userData);
      
      // Navigate to the appropriate dashboard
      if (credentials.role === 'student') {
        navigate('/student');
      } else {
        navigate('/librarian');
      }
    } else {
      // Failed login
      setError(`Invalid ${currentRole} credentials! Use: ${valid.email} / ${valid.password}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <School sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h4" component="h1" gutterBottom>
              College Library Portal
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <FormLabel component="legend">Login As</FormLabel>
            <RadioGroup
              row
              value={credentials.role}
              onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
              sx={{ mb: 2, justifyContent: 'center' }}
            >
              <FormControlLabel 
                value="student" 
                control={<Radio />} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <School sx={{ mr: 1 }} />
                    Student
                  </Box>
                } 
              />
              <FormControlLabel 
                value="admin" 
                control={<Radio />} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AdminPanelSettings sx={{ mr: 1 }} />
                    Librarian Admin
                  </Box>
                } 
              />
            </RadioGroup>

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              margin="normal"
              required
              placeholder="Enter your email"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              margin="normal"
              required
              placeholder="Enter your password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
            >
              Sign In
            </Button>
          </form>

          <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" color="textSecondary">
              <strong>Demo Credentials:</strong>
              <br />
              • <strong>Student:</strong> email: <code>student@gmail.com</code> | password: <code>student</code>
              <br />
              • <strong>Admin:</strong> email: <code>admin@gmail.com</code> | password: <code>admin</code>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
