import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BookingModal = ({ openBooking, handleBookingClose, booking, date }) => {

    const { user } = useAuth();

    const timeRef = useRef();
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const dateRef = useRef();

    const handleBookingSubmit = e => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        const time = timeRef.current.value;
        const date = dateRef.current.value;
        const serviceName = booking.name;

        const appointments = { name, email, phone, time, date, serviceName };

        fetch('http://localhost:5000/appointments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(appointments)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Appointment Confirmed!');
                }
            })
        handleBookingClose();
        e.preventDefault();
    }
    return (
        <Modal
            open={openBooking}
            onClose={handleBookingClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {booking.name}
                </Typography>
                <form onSubmit={handleBookingSubmit}>
                    <TextField
                        sx={{ width: '90%', m: 1 }}
                        disabled
                        id="outlined-size-small"
                        size="small"
                        defaultValue={booking.time}
                        inputRef={timeRef}
                    />
                    <TextField
                        sx={{ width: '90%', m: 1 }}
                        disabled
                        id="outlined-size-small"
                        size="small"
                        defaultValue={date.toLocaleDateString()}
                        inputRef={dateRef}
                    />
                    <TextField
                        sx={{ width: '90%', m: 1 }}
                        id="outlined-size-small"
                        size="small"
                        defaultValue={user.displayName}
                        inputRef={nameRef}
                    />
                    <TextField
                        sx={{ width: '90%', m: 1 }}
                        id="outlined-size-small"
                        size="small"
                        defaultValue={user.email}
                        inputRef={emailRef}
                    />
                    <TextField
                        sx={{ width: '90%', m: 1 }}
                        id="outlined-size-small"
                        size="small"
                        placeholder='Phone Number'
                        type='tel'
                        inputRef={phoneRef}
                    />


                    <Button variant="contained" style={{ backgroundColor: '#5CE7ED', marginBottom: 25 }} type="submit">SEND</Button>
                </form>
            </Box>
        </Modal>
    );
};

export default BookingModal;