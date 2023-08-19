import { useState } from "react";
import { useDispatch } from 'react-redux';
import { registerAsync } from '../features/authSlice';
import { useNavigate, Link } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Registration = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    console.log(name, email, password, role);

    try {
      dispatch(registerAsync({ name, email, password, confirmPassword, role }));
      navigate('/');
    } catch (error) {
      console.log(error);
    }

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("");
  }
  const handleChange = (event, newRole) => {
    setRole(newRole);
    console.log(role);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {/* <form onSubmit={handleRegister} className="flex flex-col">
        <input placeholder="name" value={name} type='text' onChange={(e) => setName(e.target.value)} />
        <input placeholder="email" value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
        <input placeholder="confirm password" value={confirmPassword} type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
        <ToggleButtonGroup onChange={handleChange} value={role} color="primary" exclusive aria-label="Platform">
          <ToggleButton value="user">User</ToggleButton>
          <ToggleButton value="admin">Admin</ToggleButton>
        </ToggleButtonGroup>
        <Button type='submit' variant="outlined">Register</Button>
      </form> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <ToggleButtonGroup
              value={role}
              exclusive
              onChange={handleChange}
              aria-label="Role"
            >
              <ToggleButton value="user">User</ToggleButton>
              <ToggleButton value="admin">Admin</ToggleButton>
            </ToggleButtonGroup>
            <Button type="submit" fullWidth variant="contained" sx={{
              backgroundColor: "#4E4FEB",
              '&:hover': {
                backgroundColor: "#3A3BBA",
              },
              mt: 3, mb: 2
            }}>
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link className='hover:text-blue-500' to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Container>
    </div>
  );
}

export default Registration;