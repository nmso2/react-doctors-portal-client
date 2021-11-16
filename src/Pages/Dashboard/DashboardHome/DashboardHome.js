import * as React from 'react';
import { Grid } from '@mui/material';
import Calender from '../../Shared/Calender/Calender';
import DashboardAppointments from '../DashboardAppointments/DashboardAppointments';


const DashboardHome = () => {
    const [date, setDate] = React.useState(new Date());
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Calender date={date} setDate={setDate}></Calender>
            </Grid>
            <Grid item xs={12} md={8}>
                <DashboardAppointments date={date}></DashboardAppointments>
            </Grid>
        </Grid>
    );
};

export default DashboardHome;