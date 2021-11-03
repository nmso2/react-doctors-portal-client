import React from 'react';

const AvailableAppointments = ({date}) => {
    return (
        <div>
            <h4>Available appointments at {date.toDateString()}</h4>
        </div>
    );
};

export default AvailableAppointments;