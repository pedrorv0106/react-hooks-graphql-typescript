import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import Card from 'react-credit-cards';
import { Icon } from 'semantic-ui-react';
import Swal from 'sweetalert2';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Button from '../../../../Buttons';
import ButtonClean from '../../../../Buttons/ButtonClean';
import Colors from '../../../../../Styles/colors';

import AddPaymentMethod from './AddPaymentMethod';
import ListPaymentMethods from './ListPaymentMethods';

import findCustomer from '../../Api/Customer/FindCustomer';
import listCards from '../../Api/Card/List';

import { useBilling } from '../../Context/BillingContext';
import { CreateOwnerProduct } from '../../../../../GraphQL/Mutations/OwnersOrders';

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_TOKEN || 'INSERT_YOUR_API_KEY'
);

const paymentMethodInitial = {
  id: '',
  fourNumber: '',
  brand: '',
  expiry: '',
  name: '',
};

const PaymentMethodsContainer = styled.div`
  border-radius: 10px;
  box-shadow: 2px 2px 15px 0 rgba(0, 0, 0, 0.05);
  padding: 2rem;
  height: 100%;
`;

const PaymentMethods = ({ onShowResponse }: any) => {
  const { email, uuid } = useSelector((state: any) => state.auth);

  const [paymentMethods, setPaymentMethods] = useState([paymentMethodInitial]);
  const [success, setSuccess] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [checked, setCheck] = useState(paymentMethodInitial);
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState('');
  // const [timeStamp] = useState('September 28');

  const { total, idProduct, quantity } = useBilling();

  const [createOwnerProduct] = useMutation(CreateOwnerProduct, {
    onError: (err) => {
      console.log('[Error: ]', err);
      setLoading(false);
      onShowResponse(false);
    },
    onCompleted: (resp) => {
      console.log('[Succ: ]', resp);
      setLoading(false);
      onShowResponse(true, '29 sept');
    },
  });

  const fetchCustomer = useCallback(async () => {
    const { data, error } = await findCustomer(email, uuid);

    if (data) {
      const Data: { customer: { customerId: string } } = data;
      setCustomerId(Data.customer.customerId);
    }
    if (error) Swal.fire('Error', error.message || 'Customer error', 'error');
  }, [email, uuid]);

  const buyProducts = () => {
    setLoading(true);
    createOwnerProduct({
      variables: {
        data: {
          product: {
            quantity,
            id_product: idProduct,
          },
          idPaymentMethod: checked.id,
        },
      },
    });
  };

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  useEffect(() => {
    const fetchCards = async () => {
      if (!customerId) return;
      const { data: d, error }: any = await listCards(customerId);
      const { paymentMethods: data } = d;

      const res = data.map(({ card, id }: any) => ({
        id,
        brand: card.brand,
        fourNumber: card.last4,
        expiry: `${card.exp_month}/${card.exp_year}`,
        name: '',
      }));
      setPaymentMethods(res);

      if (error)
        Swal.fire('Error', error?.message || 'Customer error', 'error');
    };
    fetchCards();
  }, [customerId, success]);

  return (
    <PaymentMethodsContainer>
      <Elements stripe={stripePromise}>
        {!showAdd ? (
          <>
            <Card
              number={`**** **** **** ${checked.fourNumber || ''}`}
              name={checked.name || ''}
              cvc=""
              expiry={checked.expiry || ''}
              issuer={checked.brand || ''}
              preview
            />
            <ButtonClean
              icon
              labelPosition="left"
              onClick={() => setShowAdd(true)}
            >
              <Icon
                name="plus"
                style={{ color: Colors.primary, background: 'white' }}
              />
              Add a Payment Method
            </ButtonClean>
            <ListPaymentMethods
              paymentMethods={paymentMethods}
              checked={checked}
              setCheck={(check: any) =>
                setCheck(check === checked ? {} : check)
              }
            />
            <Button
              style={{ marginTop: 30 }}
              disabled={!checked.id}
              primary
              fluid
              loading={loading}
              onClick={() => buyProducts()}
            >
              Pay ${(total / 2).toLocaleString()}
            </Button>
          </>
        ) : (
          <AddPaymentMethod
            customerId={customerId}
            onCancel={() => setShowAdd(false)}
            onSuccess={() => {
              setShowAdd(false);
              setSuccess(true);
            }}
          />
        )}
      </Elements>
    </PaymentMethodsContainer>
  );
};

export default PaymentMethods;
