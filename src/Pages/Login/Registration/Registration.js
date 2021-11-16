import { Alert, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import login from '../../../images/login.png'

const Registration = () => {
    const { logInUsingGoogle, setIsLoading, createNewUser, handleNameChange, handaleEmailChange, handalePasswordChange, email, password, setUserName, error, setError, logInUsingGithub, logInUsingFacebook, isLoading, user, saveUser } = useAuth();

    const [success, setSuccess] = useState(false);

    const location = useLocation();
    const history = useHistory()
    const redirect_uri = location.state?.from || '/';


    const handleCreateUser = (e) => {
        e.preventDefault();
        if (loginData.password !== loginData.confirmPassword) {
            alert("Password didn't match!");
            return
        }
        createNewUser(loginData.email, loginData.password)
            .then(userCredential => {
                setUserName();
                history.push('/login');
                setError('');
                saveUser(loginData.email, loginData.name, 'POST');
                setSuccess(true);
            }).catch((error) => {
                setError(error.message);
            }).finally(() => { setIsLoading(false) });
    }


    const [loginData, setLoginData] = useState({})
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>Please Register</Typography>
                    {!isLoading && <form onSubmit={handleCreateUser}>
                        <TextField
                            sx={{ width: "75%", m: 1 }}
                            id="outlined-email-input"
                            label="Your Name"
                            name="name"
                            onBlur={handleOnBlur}
                            type="name"
                            variant="standard"
                        />
                        <TextField
                            sx={{ width: "75%", m: 1 }}
                            id="outlined-email-input"
                            label="Email"
                            name="email"
                            onBlur={handleOnBlur}
                            type="email"
                            variant="standard"
                        />
                        <TextField
                            sx={{ width: "75%", m: 1 }}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            name="password"
                            onBlur={handleOnBlur}
                            variant="standard"
                        />
                        <TextField
                            sx={{ width: "75%", m: 1 }}
                            id="outlined-password-input"
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            onBlur={handleOnBlur}
                            variant="standard"
                        />

                        <Button sx={{ width: "75%", m: 1 }} variant="contained" style={{ backgroundColor: '#5CE7ED', marginBottom: 25 }} type="submit">Register</Button>
                        <NavLink style={{ textDecoration: 'none' }} to="login">
                            <Button variant="text">Already registerd? Please login</Button>
                        </NavLink>
                    </form>}
                    {isLoading && <CircularProgress />}
                    {success && <Alert severity="success">Registration Successfull!</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={login} style={{ width: '100%' }} alt="" srcset="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Registration;