import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Modal as ModalSemantic } from 'semantic-ui-react';
import PaymentTimeline from './Views/Timeline';
import PaymentDetails from './Views/PaymentDetails';
import PaymentMethods from './Views/PaymentMethods';
import { Text } from '../../Texts/Text';
import colors from '../../../Styles/colors';
import PaymentResponse from './Views/PaymentResponse';
import { BillingContext } from './Context/BillingContext';

interface BuyDevicesProps {
  open: boolean;
  onOpen: any;
}

const Modal = styled(ModalSemantic)`
  &&&&& {
    width: 80%;
    box-shadow: 10px 10px 40px 0 rgba(0, 0, 0, 0.1);
    border-radius: 26px;
  }
  && i.close {
    display: flex;
    background: ${colors.primary};
    color: white;
    border-radius: 50px;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center;
  }
`;

const BuyDevices = ({ open, onOpen }: BuyDevicesProps) => {
  const [showResponse, setShowResponse] = useState(false);
  const [typeResponse, setTypeResponse] = useState(false);
  const [timeStamp, setTimeStamp] = useState('');

  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [idProduct, setIdProduct] = useState('');
  return (
    <Modal
      closeIcon
      open={open}
      dimmer={<Modal.Dimmer inverted style={{ padding: '2rem' }} />}
      closeOnDimmerClick={false}
      onClose={() => onOpen(false)}
    >
      <Modal.Content style={{ borderRadius: 26, padding: '4rem' }}>
        {showResponse ? (
          <PaymentResponse
            response={typeResponse}
            date={timeStamp}
            onFailedReturn={() => setShowResponse(false)}
          />
        ) : (
          <BillingContext.Provider
            value={{
              total,
              setTotal,
              quantity,
              setQuantity,
              idProduct,
              setIdProduct,
            }}
          >
            <Grid>
              <Grid.Column computer={7} mobile={16}>
                <Text
                  style={{ fontWeight: 'bolder' }}
                  label="Your order"
                  size="small"
                />
                <Text
                  style={{ fontWeight: 'bolder', color: colors.primary }}
                  label={`${total.toLocaleString()} COP`}
                  size="xxxl"
                />
                <PaymentTimeline />
                <PaymentDetails />
              </Grid.Column>
              <Grid.Column only="computer" computer={3} />
              <Grid.Column computer={6} mobile={16}>
                <PaymentMethods
                  onShowResponse={(
                    _typeResponse: boolean,
                    _timeStamp: string
                  ) => {
                    setTimeStamp(_timeStamp);
                    setTypeResponse(_typeResponse);
                    setShowResponse(true);
                  }}
                />
              </Grid.Column>
            </Grid>
          </BillingContext.Provider>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default BuyDevices;
