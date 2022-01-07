import React, { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';


const CheckOutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        // setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
            // setSuccess('');
            console.log(error);
        }
        else {
            setError('');
            console.log(paymentMethod);
        }

        // // payment intent
        // const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
        //     clientSecret,
        //     {
        //         payment_method: {
        //             card: card,
        //             billing_details: {
        //                 name: patientName,
        //                 email: user.email
        //             },
        //         },
        //     },
        // );

        // if (intentError) {
        //     setError(intentError.message);
        //     setSuccess('');
        // }
        // else {
        //     setError('');
        //     setSuccess('Your payment processed successfully.')
        //     console.log(paymentIntent);
        //     setProcessing(false);
        //     // save to database
        //     const payment = {
        //         amount: paymentIntent.amount,
        //         created: paymentIntent.created,
        //         last4: paymentMethod.card.last4,
        //         transaction: paymentIntent.client_secret.slice('_secret')[0]
        //     }
        //     const url = `http://localhost:5000/appointments/${_id}`;
        //     fetch(url, {
        //         method: 'PUT',
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         body: JSON.stringify(payment)
        //     })
        //         .then(res => res.json())
        //         .then(data => console.log(data));
        // }

    }

    return (
        <div>
        {
            error && <p style={{ color: 'red' }}>{error}</p>
        }
        {
            success && <p style={{ color: 'green' }}>{success}</p>
        }
            <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                        style: {
                            base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                            },
                            invalid: {
                            color: '#9e2146',
                            },
                        },
                        }}
                    />
                    <button type="submit" disabled={!stripe}>
                      Pay
                    </button>
            </form>
        </div>
    );
};

export default CheckOutForm;