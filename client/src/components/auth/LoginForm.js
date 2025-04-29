import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  useTheme,
  alpha,
  Divider,
  Stack,
  Link
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  LockOutlined,
  Person as PersonIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setLoginError('Please enter both username and password');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setLoginError('');
      
      await login(username, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.response?.data?.message || 'Invalid username or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box width="100%">
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        fontWeight="bold"
        color="primary"
        sx={{ mb: 1 }}
      >
        Welcome back
      </Typography>
      
      <Typography 
        variant="body1" 
        gutterBottom 
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Sign in to your account to continue
      </Typography>
      
      {loginError && (
        <Alert 
          severity="error" 
          sx={{ 
            width: '100%', 
            mb: 3,
            border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
            borderRadius: 1
          }}
        >
          {loginError}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} width="100%">
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isSubmitting}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 1.5,
            }
          }}
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
          variant="outlined"
          sx={{
            mb: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: 1.5,
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <Link href="#" variant="body2" color="primary.main" underline="hover">
            Forgot password?
          </Link>
        </Box>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ 
            py: 1.5, 
            borderRadius: 1.5,
            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
            mb: 3,
            fontWeight: 600
          }}
          disabled={isSubmitting}
          startIcon={!isSubmitting && <LoginIcon />}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Sign In'
          )}
        </Button>
        
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
            OR
          </Typography>
        </Divider>
        
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="outlined"
            color="primary"
            sx={{ borderRadius: 1.5, fontWeight: 500 }}
          >
            Contact Admin
          </Button>
          <Button
            variant="text"
            color="primary"
            sx={{ borderRadius: 1.5, fontWeight: 500 }}
          >
            Help
          </Button>
        </Stack>
      </Box>
      
      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          HRIS Administration System © {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm; 