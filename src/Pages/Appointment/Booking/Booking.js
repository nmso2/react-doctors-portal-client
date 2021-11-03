import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Booking = ({booking}) => {
    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ color: '#31C0B3' }} gutterBottom>
                        {booking.name}
                    </Typography>
                    <Typography variant="h3" sx={{ fontSize: 16, fontWeight: 600 }} gutterBottom>
                        {booking.time}
                    </Typography>

                    <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                        {booking.space} SPACE AVAILABLE
                    </Typography>
                </CardContent>
                <Button variant="contained" style={{ backgroundColor: '#5CE7ED', marginBottom: 25}}>Book Appointment</Button>
            </Card>
        </div>
    );
};

export default Booking;