import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import PaymentIcon from 'react-payment-icons';
import colors from '../../../../../Styles/colors';

const ContainerListPaymentMethod = styled.div`
  font-family: 'Poppins';
  box-shadow: 2px 2px 7px 0 rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem 0;
  .containerCard {
    display: flex;
    align-items: center;
    flex-direction: row;
  }
`;

interface paymentMethodProps {
  id: string;
  brand: string;
  fourNumber: string;
  expiry: string;
}

interface ListPaymentMethodProps {
  paymentMethods: any;
  checked: paymentMethodProps;
  setCheck(paymentMethod: paymentMethodProps): void;
}

const ListPaymentMethod = ({
  paymentMethods,
  setCheck,
  checked,
}: ListPaymentMethodProps) =>
  paymentMethods.map((paymentMethod: paymentMethodProps) => (
    <ContainerListPaymentMethod
      key={paymentMethod.id}
      onClick={() => setCheck(paymentMethod)}
    >
      <div className="containerCard">
        <PaymentIcon
          id={paymentMethod.brand}
          style={{ margin: 10, width: 50 }}
          className="payment-icon"
        />
        <span>**** **** **** {paymentMethod.fourNumber}</span>
      </div>
      <div className="checkBox">
        <Icon
          size="large"
          name={
            (checked && checked.id === paymentMethod.id && 'check circle') ||
            'circle outline'
          }
          style={{ color: colors.primary }}
        />
      </div>
    </ContainerListPaymentMethod>
  ));

export default ListPaymentMethod;
