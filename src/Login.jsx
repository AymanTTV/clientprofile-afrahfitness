import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  axios.post('https://clientprofile.afrahfitness.com/api/login.php', {
    email,
    password
  })
  .then((response) => {
    if (response.data.status === 'success') {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('email', email);  // Store email here
      navigate('/reports');
    } else {
      setError(response.data.message || 'Invalid email or password');
    }
  })
  .catch((error) => {
    setError('An error occurred. Please try again.');
    console.error('Login error:', error);
  });
  

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: isMobile ? '20px' : '40px'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: isMobile ? '100%' : '400px',
          padding: isMobile ? '20px' : '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: isMobile ? '15px' : '20px'
        }}
      >
        <Typography variant={isMobile ? 'h5' : 'h4'} component="h1" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ padding: isMobile ? '10px' : '15px' }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
