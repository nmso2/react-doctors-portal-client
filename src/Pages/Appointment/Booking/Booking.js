import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BookingModal from '../BookingModal/BookingModal';

const Booking = ({ booking, date }) => {
    const [openBooking, setOpenBooking] = React.useState(false);
    const handleBookingOpen = () => setOpenBooking(true);
    const handleBookingClose = () => setOpenBooking(false);

    return (
        <>
            <Paper elevation={3}>
                <Typography variant="h5" component="div" sx={{ color: '#31C0B3', paddingTop: '50px' }}>
                    {booking.name}
                </Typography>
                <Typography variant="h6" sx={{ padding: '10px' }} gutterBottom>
                    {booking.time}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mb: 2 }} color="text.secondary">
                    {booking.space} SPACE AVAILABLE
                </Typography>
                <Button variant="contained" style={{ backgroundColor: '#5CE7ED', marginBottom: 25 }} onClick={handleBookingOpen}>Book Appointment</Button>
            </Paper>
            <BookingModal handleBookingClose={handleBookingClose} openBooking={openBooking} booking={booking} date={date}></BookingModal>
        </>
    );
};

export default Booking;