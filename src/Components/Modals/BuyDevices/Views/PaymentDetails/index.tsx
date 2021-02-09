import React, { useState } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { Text } from '../../../../Texts/Text';
import colors from '../../../../../Styles/colors';
import PaymentDetailsForm from './PaymentDetailsForm';

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  border-radius: 10px;
  box-shadow: 2px 2px 15px 0 rgba(0, 0, 0, 0.05);
  padding: 1rem;
  background: white;
`;

const PaymentDetails = () => {
  const [active, setActive] = useState(true);
  const iconShow = active ? 'angle down' : 'angle up';

  return (
    <Accordion>
      <Accordion.Title active={active} onClick={() => setActive(!active)}>
        <TitleContainer>
          <Text
            style={{ fontWeight: 'bolder', color: colors.primary, margin: 0 }}
            label={`${active ? 'Hide' : 'Show'} the payment details`}
            size="normal"
          />
          <Icon
            name={iconShow}
            color="blue"
            size="big"
            flipped="horizontally"
          />
        </TitleContainer>
      </Accordion.Title>
      <Accordion.Content active={active} content={<PaymentDetailsForm />} />
    </Accordion>
  );
};

export default PaymentDetails;
