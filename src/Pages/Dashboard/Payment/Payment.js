import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51JwTadEGJLqgTMwCymQd3XezaIEJOXENzUhp0LKWlsMDdl20jV8G4kpN1x4Pmt7iLY2sW7ZNvXYe7H0YqAg9ixVf006VlpcUYE');


const Payment = () => {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState({});

    useEffect(() => {
        fetch(`https://doctors-portel.herokuapp.com/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data));
    }, [appointmentId]);
    return (
        <div>
            <h2>Please pay for {appointment?.name} for {appointment?.serviceName}</h2>
            <h3>Pay: ${appointment?.price}</h3>

            {appointment?.price && <Elements stripe={stripePromise}>
                <CheckoutForm appointment={appointment} />
            </Elements>}
        </div>
    );
};

export default Payment;