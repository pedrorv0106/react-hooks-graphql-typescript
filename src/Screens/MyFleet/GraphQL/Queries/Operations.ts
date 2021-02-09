import { gql } from '@apollo/client';

export const FindOwnerOperations = gql`
  query FindOwnerOperations($uuid: uuid) {
    operators_operation(
      where: { devices: { ownership: { _eq: $uuid } } }
      distinct_on: id_operator_operation
    ) {
      id_operator_operation
      id_operator
      id_country
    }
  }
`;

export const FindServicesByOwnerOperations = gql`
  query FindOwnerOperations(
    $operations: [uuid!]
    $offset: Int
    $limit: Int
    $startDate: timestamptz
    $endDate: timestamptz
  ) {
    services(
      offset: $offset
      limit: $limit
      order_by: { created_at: desc }
      where: {
        device: { id_operator_operation: { _in: $operations } }
        id_status_service: { _eq: 3 }
        created_at: { _gte: $startDate, _lte: $endDate }
      }
    ) {
      created_at
      id_service
      device {
        id_device
        serial
      }
      users_payments {
        total_cost
        currency
        usd_cost
      }
    }

    rentals(
      offset: $offset
      limit: $limit
      order_by: { created_at: desc }
      where: {
        device: { id_operator_operation: { _in: $operations } }
        created_at: { _gte: $startDate, _lte: $endDate }
      }
    ) {
      created_at
      id_rental
      device {
        id_device
        serial
        lat
        lon
      }
      rentals_reservation {
        created_at
        rentals_reservations_payments {
          total_cost
          usd_cost
        }

        rentals_types_pricing {
          rentals_type {
            country {
              currency
            }
          }
        }
      }
    }
  }
`;
