import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/register', { name, email, password });
      setOpen(true);
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box
          component="form"
          onSubmit={handleRegister}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h4" gutterBottom align="center">
            Register
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Register
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Box>
      </Paper>
      <Snackbar open={open} autoHideDuration={2000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Registration successful! Redirecting to login...
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={3000} onClose={() => setError(false)}>
        <Alert severity="error" sx={{ width: '100%' }}>
          Registration failed. Please try again.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
