import * as React from 'react';

export interface BillingContextType {
  total: number;
  quantity: number;
  idProduct: string;
  setTotal: (value: number) => void;
  setQuantity: (value: number) => void;
  setIdProduct: (value: string) => void;
}

export const BillingContext = React.createContext<BillingContextType>({
  total: 0,
  quantity: 0,
  idProduct: '',
  setTotal: () => {},
  setQuantity: () => {},
  setIdProduct: () => {},
});

export const useBilling = () => React.useContext(BillingContext);
