import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, Grid, GridRow, Image, Input } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import useCounter from '../../../../../Hooks/useCounter';
import colors from '../../../../../Styles/colors';

import { GetOwnerProducts } from '../../../../../GraphQL/Queries/PaymentDetails';
import { useBilling } from '../../Context/BillingContext';

const PaymentContainer = styled.div`
  align-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 2px 2px 15px 0 rgba(0, 0, 0, 0.05);
  padding: 1rem;
  background: white;
`;

const InputForm = styled(Input)`
  &&& input {
    text-align: center;
  }
`;

const PaymentDetailsForm = () => {
  const { counter, increment, decrement, custom } = useCounter(1);
  const { setIdProduct, setQuantity, setTotal, total } = useBilling();

  const { data, loading } = useQuery(GetOwnerProducts);

  const handleInputChange = ({ target }: any) => {
    const { value } = target;
    return Number(value) && value.length < 5 ? custom(Number(value)) : 0;
  };

  useEffect(() => {
    if (data && data.owner_products.length) {
      setTotal(data.owner_products[0].price * counter);
      setIdProduct(data.owner_products[0].id_product);
      setQuantity(counter);
    }
  }, [counter, data, setTotal, setIdProduct, setQuantity]);

  return data && data.owner_products.length ? (
    <PaymentContainer>
      <Grid>
        <GridRow columns={2}>
          <Grid.Column
            width={8}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Image
              src={data.owner_products[0].image_url}
              size="small"
              centered
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Grid>
              <GridRow centered>
                <Grid.Column>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '15px' }}>
                      <b>{data.owner_products[0].name}</b>
                      <br />
                      <b>
                        ${data.owner_products[0].price.toLocaleString()} x
                        Scooter
                      </b>
                    </p>
                    <p style={{ textAlign: 'left', fontSize: '12px' }}>
                      <b>Quantity</b>
                    </p>
                    <Form
                      type="submit"
                      style={{ textAlign: 'center', marginBottom: '14px' }}
                    >
                      <Form.Group
                        style={{
                          alignContent: 'center',
                          marginBlockEnd: '10',
                        }}
                      >
                        <Button
                          primary
                          onClick={() => decrement()}
                          icon="minus"
                          disabled={counter < 2}
                          style={{
                            width: '2rem',
                            height: '2rem',
                            padding: 0,
                            marginRight: '0.25rem',
                            backgroundColor: colors.primary,
                          }}
                        />
                        <InputForm
                          type="tel"
                          style={{
                            width: '6rem',
                            height: '2rem',
                          }}
                          onChange={handleInputChange}
                          name="account"
                          value={counter}
                        />
                        <Button
                          primary
                          onClick={() => increment()}
                          icon="plus"
                          style={{
                            width: '2rem',
                            height: '2rem',
                            padding: 0,
                            marginLeft: '0.25rem',
                            backgroundColor: colors.primary,
                          }}
                        />
                      </Form.Group>
                    </Form>
                    <Grid>
                      <GridRow columns={2} style={{ textAlign: 'left' }}>
                        <Grid.Column width={6}>
                          <p style={{ fontSize: '12px' }}>
                            <b>Subtotal:</b>
                          </p>
                          <p style={{ fontSize: '14px' }}>
                            <b>Total:</b>
                          </p>
                        </Grid.Column>
                        <Grid.Column width={10}>
                          <p style={{ fontSize: '12px' }}>
                            <b>${total.toLocaleString()}</b>
                          </p>
                          <p
                            style={{
                              fontSize: '14px',
                              color: colors.primary,
                            }}
                          >
                            <b>${total.toLocaleString()}</b>
                          </p>
                        </Grid.Column>
                      </GridRow>
                    </Grid>
                  </div>
                </Grid.Column>
              </GridRow>
            </Grid>
          </Grid.Column>
        </GridRow>
      </Grid>
    </PaymentContainer>
  ) : (
    <div>${loading ? 'Loading...' : 'Error Loading Products'}</div>
  );
};

export default PaymentDetailsForm;
