import React from 'react';
import { Image } from 'semantic-ui-react';
import { Text } from '../../../../Texts/Text';
import imageSuccess from '../../Resources/payment_successful_cosmic_payment.png';
import './response.scss';

interface SuccessResponseProps {
  returnDate: string;
}

const SuccessResponse = ({ returnDate }: SuccessResponseProps) => {
  return (
    <div>
      <Image
        src={imageSuccess}
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
        label="Payment successful!"
        size="xxxl"
        align="center"
        color="lightdark"
      />
      <div>
        <p
          className="success"
          style={{ marginTop: '50px', marginBottom: '50px' }}
        >
          Come back on{' '}
          <span style={{ fontWeight: 'bolder' }}>{returnDate}</span> to make the{' '}
          to make the second payment of your fleet.
        </p>
      </div>
    </div>
  );
};

export default SuccessResponse;
