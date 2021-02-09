import { gql } from '@apollo/client';

export const GetOwnerProducts = gql`
  query {
    owner_products(where: { active: { _eq: true } }) {
    }
  }
`;

export const GetProductById = gql`
  query MyQuery($id_order: uuid) {
    owner_orders_products(where: { id_order: { _eq: $id_order } }) {
    }
  }
`;
