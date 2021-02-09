import { gql } from '@apollo/client';

/**
 * @description Find the current order billing and 
 * products information
*/
export const FindOrderProducts = gql`
  query OwnerOrderProducts($uuid: uuid!) {
    owner_orders(
      where: {
      }
      order_by:{
      }
      limit: 1
    ) {
    }
  }
`;
