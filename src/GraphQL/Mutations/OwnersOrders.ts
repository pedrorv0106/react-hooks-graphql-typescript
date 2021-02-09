import { gql } from '@apollo/client';

export const AddOwnerPaymentMethod = gql`
  mutation($paymentMethod: String!) {
    createOwnerPaymentMethod(paymentMethod: $paymentMethod) {
    }
  }
`;

export const CreateOwnerProduct = gql`
  mutation($data: createOwnerOrderInput) {
    createOwnerOrder(data: $data) {
    }
  }
`;
