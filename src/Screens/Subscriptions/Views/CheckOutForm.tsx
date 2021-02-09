import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Card, Image } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import PaymentForm from './PaymentForm';
import { singleError, singleSuccess } from '../../Auth/helpers/sweetAlert';

import { CreateCard } from '../Api/Card/Create';
import CreateSubscription from '../Api/Subscription/Create';

interface CheckOutFormProps {
  customerId: string;
  priceId: string;
  qty: number;
}

const CheckOutForm = ({ customerId, priceId, qty }: CheckOutFormProps) => {
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (elements) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        if (stripe) {
          setLoading(true);
          const { error, paymentMethod } = await stripe?.createPaymentMethod({
            type: 'card',
            card: cardElement,
          });
          if (error) {
            // eslint-disable-next-line no-console
            console.log('[error]', error);
            Swal.fire('Error', error.message, 'error');
          } else {
            // eslint-disable-next-line no-console
            console.log('payment method', paymentMethod);
            const CardRequest = await CreateCard({
              id: paymentMethod?.id || '',
              customerId,
            });

            if (CardRequest.error) {
              // eslint-disable-next-line no-console
              console.log('CardRequest', CardRequest.error);
              Swal.fire(
                'Error',
                'Card request error' || CardRequest.error,
                'error'
              );
            } else {
              const SubscriptionRequest = await CreateSubscription({
                customerId,
                priceId,
                qty,
              });

              if (SubscriptionRequest.error) {
                // eslint-disable-next-line no-console
                console.log('SubscriptionRequest', SubscriptionRequest.error);
                singleError(SubscriptionRequest.error);
              } else {
                singleSuccess('New subscription!', 2);
                setTimeout(() => {
                  document.location.reload();
                }, 2000);
              }
            }
          }
        }
      }
    }
    setLoading(false);
  };
  return (
    <Card
      style={{
        padding: '1rem',
        width: '380px',
        marginBottom: '3px',
        boxShadow: '2px 2px 30px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <PaymentForm onSubmit={handleSubmit}>
        <Image
          src={require('../Resources/Images/credit_card.png')}
          centered
          style={{ marginBottom: 30, padding: 5 }}
        />
        <p style={{ textAlign: 'right' }}>
          <i>
            <b>CP:</b> Postal Code
          </i>
        </p>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />

        <Button
          type="Submit"
          loading={loading}
          style={{
            marginTop: 30,
            width: '100%',
            backgroundColor: '#1270e3',
            color: '#fff',
            fontSize: '1.2rem',
          }}
          disabled={loading}
        >
          Let’s Do It
        </Button>

        <cite>
          By subscribing you agree to our&nbsp;
          <a
            href="https://cosmicgo.co/fees-payments-commissions/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
        </cite>
      </PaymentForm>
    </Card>
  );
};

export default CheckOutForm;
