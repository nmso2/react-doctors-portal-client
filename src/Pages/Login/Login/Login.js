import { Alert, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import login from '../../../images/login.png'

const Login = () => {

    const { logInUsingGoogle, setIsLoading, loginWithEmailPassword, handaleEmailChange, handalePasswordChange, email, password, setUser, error, setError, logInUsingGithub, logInUsingFacebook, isLoading, saveUser, user } = useAuth();

    const location = useLocation();
    const history = useHistory()
    const redirect_uri = location.state?.from || '/';

    const [loginData, setLoginData] = useState({})
    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleGoogleLogIn = () => {
        logInUsingGoogle()
            .then((result) => {
                history.push(redirect_uri);
                setError('');
                saveUser(result.user.email, result.user.displayName, 'PUT');
            }).catch((error) => {
                setError(error.message);
            }).finally(() => setIsLoading(false));
    }

    const handleEmailLogin = e => {
        e.preventDefault();
        loginWithEmailPassword(loginData.email, loginData.password)
            .then(result => {
                history.push(redirect_uri);
                setError('');
                setUser(result);
            }).catch((error) => {
                setError(error.message);
            }).finally(() => setIsLoading(false));
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>Login</Typography>
                    <form onSubmit={handleEmailLogin}>
                        <TextField
                            sx={{ width: "75%", m: 1 }}
                            id="outlined-email-input"
                            label="Email"
                            name="email"
                            onBlur={handleOnChange}
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
                            onBlur={handleOnChange}
                            autoComplete="current-password"
                            variant="standard"
                        />

                        <Button sx={{ width: "75%", m: 1 }} variant="contained" style={{ backgroundColor: '#5CE7ED', marginBottom: 25 }} type="submit">Login</Button>
                        <NavLink style={{ textDecoration: 'none' }} to="registration">
                            <Button variant="text">New user? Please register</Button>
                        </NavLink>
                    </form>
                    
                    <Button sx={{ width: "75%", m: 1 }} variant="contained" style={{ backgroundColor: '#5CE7ED', marginBottom: 25 }} onClick={handleGoogleLogIn}>Login With Google</Button>

                    {isLoading && <CircularProgress />}
                    {email && <Alert severity="success">Registration Successfull!</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={login} style={{ width: '100%' }} alt="" srcset="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;