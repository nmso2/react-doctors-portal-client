import { Container, Grid, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import login from '../../../images/login.png'

const Login = () => {
    const [loginData, setLoginData] = useState({})
    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>Login</Typography>
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: "75%", m: 1 }}
                            id="outlined-email-input"
                            label="Email"
                            name="email"
                            onChange={handleOnChange}
                            type="email"
                            autoComplete="current-email"
                            variant="standard"
                        />
                        <TextField
                            sx={{ width: "75%", m: 1 }}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            autoComplete="current-password"
                            variant="standard"
                        />

                        <Button sx={{ width: "75%", m: 1 }} variant="contained" style={{ backgroundColor: '#5CE7ED', marginBottom: 25 }} type="submit">Login</Button>
                        <NavLink style={{ textDecoration: 'none' }} to="registration">
                            <Button variant="text">New user? Please register</Button>
                        </NavLink>
                    </form>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={login} style={{ width: '100%' }} alt="" srcset="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;