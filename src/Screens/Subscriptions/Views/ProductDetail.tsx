import React from 'react';
import { Card, Header } from 'semantic-ui-react';

interface ProductCardDetailProps {
  name: string;
  amount: number;
  currency: string;
  description?: string;
  image?: string;
  qty: number;
}

const ProductCardDetail = ({
  name,
  description = 'Includes data in one flat fee',
  amount,
  image,
  qty = 1,
  currency,
}: ProductCardDetailProps) => {
  const TotalAmount = (amount * qty).toFixed(2);

  return (
    <Card
      style={{
        padding: '1rem',
        width: '380px',
        marginBottom: '3px',
        boxShadow: '2px 2px 30px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      {image && <img src={image} width="100%" alt="Product Reference" />}
      <Header size="large">{name}</Header>
      <div style={{ textAlign: 'left' }}>
        <p>
          Cost Per Unit &nbsp;
          <strong>
            {amount} {currency}
          </strong>
        </p>
        <p>
          Total Devices &nbsp;
          <strong>{qty}</strong>
        </p>
        <p style={{ textAlign: 'right' }}>
          Total Monthly Cost
          <strong style={{ display: 'block', fontSize: '1.2rem' }}>
            {TotalAmount} {currency}
          </strong>
        </p>
        <p style={{ textAlign: 'right' }}>
          <i>{description}</i>
        </p>
      </div>
    </Card>
  );
};

export default ProductCardDetail;
