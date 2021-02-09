import React from 'react';
import { Button, Icon, Image } from 'semantic-ui-react';
import { Text } from '../../../../Texts/Text';
import './response.scss';
import colors from '../../../../../Styles/colors';
import imageError from '../../Resources/payment_not_processed_cosmic_payment.png';

const FailedResponse = ({ onCancel }: any) => {
  return (
    <div>
      <Image
        src={imageError}
        wrapped
        style={{ width: '400px', height: 'auto', marginTop: '50px' }}
      />
      <Text
        style={{
          fontWeight: 'bolder',
          marginTop: '20px',
          width: '60%',
          margin: 'auto',
        }}
        label="Payment could not be processed!"
        size="xxxl"
        align="center"
        color="lightdark"
      />
      <div>
        <p className="error" style={{ marginTop: '50px' }}>
          Your card could not process the payment, it may be due to insufficient
          funds, we recommend you go back to the payment methods and add a new
          one.
        </p>
      </div>
      <Button
        primary
        icon
        labelPosition="left"
        onClick={onCancel}
        style={{
          display: 'flex',
          alignContent: 'flex-start',
          marginTop: '80px',
          backgroundColor: colors.primary,
          height: '3rem',
        }}
      >
        <Icon name="long arrow alternate left" />
        Back to Payment Methods
      </Button>
    </div>
  );
};

export default FailedResponse;
