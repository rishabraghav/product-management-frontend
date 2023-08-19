

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginAsync } from '../features/authSlice';
import React, { useState } from 'react';
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


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector(state => state.auth);


    const handleLogin = async (event) => {
        event.preventDefault();
        console.log(email, password);
        try {
            await dispatch(loginAsync({ email, password }));
            navigate('/');
        } catch (error) {
            console.log(error)
        }

        setEmail("");
        setPassword("");

    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            {error && <p>{error}</p>}
            {/* <form onSubmit={handleLogin} className="flex flex-col"> */}
            {/* <input placeholder="email" value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} /> */}
            {/* <Button type='submit' variant="outlined">{loading ? "Loading..." : "Login"}</Button> */}
            {/* </form> */}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 3 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            value={password} type="password" onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                    backgroundColor: "#4E4FEB",
                                    '&:hover': {
                                        backgroundColor: "#3A3BBA",
                                    },
                                    mt: 3, mb: 2
                                }}
                        >
                            {loading ? "Loading..." : "Login"}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link className='hover:text-blue-500' to='/register' variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Container>
        </div>
    );
}

export default Login;