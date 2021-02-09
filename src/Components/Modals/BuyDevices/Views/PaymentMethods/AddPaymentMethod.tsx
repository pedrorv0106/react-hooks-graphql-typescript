import React, { useCallback, useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';

import { Form, Icon } from 'semantic-ui-react';
import { Text } from '../../../../Texts/Text';
import colors from '../../../../../Styles/colors';
import Button from '../../../../Buttons';
import ButtonClean from '../../../../Buttons/ButtonClean';

import findClientSecret from '../../Api/Customer/FindClientSecret';
import { AddOwnerPaymentMethod } from '../../../../../GraphQL/Mutations/OwnersOrders';

import 'react-credit-cards/es/styles-compiled.css';

interface AddPaymentMethodProps {
  customerId: string;
  onCancel(): void;
  onSuccess(): void;
}

const AddPaymentMethod = ({
  customerId,
  onCancel,
  onSuccess,
}: AddPaymentMethodProps) => {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [addOwnerPaymentMethod] = useMutation(AddOwnerPaymentMethod, {
    onError: () => {
      setLoading(false);
      console.log('error!');
    }, // never gets called
    onCompleted: () => {
      setLoading(false);
      onSuccess();
    }, // never gets called
  });

  const stripe = useStripe();
  const elements = useElements();

  const fetchClientSecret = useCallback(async () => {
    const { data, error } = await findClientSecret(customerId);

    if (data) {
      const { client_secret } = data;
      setClientSecret(client_secret);
    }
    if (error)
      Swal.fire('Error', error.message || 'Client Secret error', 'error');
  }, [customerId]);

  useEffect(() => {
    fetchClientSecret();
  }, [fetchClientSecret]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
    if (result.error) {
      setLoading(false);
      Swal.fire('Error', result.error?.message || 'Card Error', 'error');
      return;
    }

    const data = result.setupIntent;

    addOwnerPaymentMethod({
      variables: { paymentMethod: data?.payment_method },
    });
  };

  return (
    <div className="App-payment">
      <Text size="m" style={{ color: colors.primary, fontWeight: '600' }}>
        Add New <br /> Payment Method
      </Text>
      <Form style={{ marginTop: 20 }} onSubmit={(e: any) => handleSubmit(e)}>
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
          style={{ marginTop: 30 }}
          loading={loading}
          primary
          type="submit"
          fluid
        >
          Save
        </Button>
      </Form>
      <ButtonClean icon labelPosition="left" onClick={onCancel}>
        <Icon
          name="arrow left"
          style={{ color: colors.primary, background: 'white' }}
        />
        Cancel
      </ButtonClean>
    </div>
  );
};

export default AddPaymentMethod;
