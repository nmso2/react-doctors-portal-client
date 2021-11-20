import { SettingsApplicationsRounded } from '@mui/icons-material';
import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState();
    const [success, setSuccess] = useState(false);

    const { token } = useAuth();

    const handleAdminSubmit = e => {
        const user = { email };
        fetch('https://doctors-portel.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSuccess(true);
            })
        e.preventDefault();
    }
    const handleOnBlur = e => {
        setEmail(e.target.value);
    }
    return (
        <div>
            <h2>Make Admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <TextField label="Email"
                    variant="standard"
                    type="email"
                    onBlur={handleOnBlur}
                />
                <Button type="submit" variant="contained" style={{ backgroundColor: '#5CE7ED', marginBottom: 25 }}>Make Admin</Button>
            </form>
            {success && <Alert severity="success">Admid added Successfully!</Alert>}
        </div>
    );
};

export default MakeAdmin;