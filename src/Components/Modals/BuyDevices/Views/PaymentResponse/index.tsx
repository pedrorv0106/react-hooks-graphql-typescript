import React from 'react';
import FailedResponse from './Failed';
import SuccessResponse from './Success';
import './response.scss';

interface PaymentResponseProps {
  response: boolean;
  date: string;
  onFailedReturn: any;
}

const PaymentResponse = ({
  response,
  date,
  onFailedReturn,
}: PaymentResponseProps) => {
  return (
    <div className="response_container">
      {response ? (
        <SuccessResponse returnDate={date} />
      ) : (
        <FailedResponse onCancel={onFailedReturn} />
      )}
    </div>
  );
};

export default PaymentResponse;
