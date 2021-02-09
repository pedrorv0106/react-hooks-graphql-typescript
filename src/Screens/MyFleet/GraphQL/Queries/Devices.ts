import { gql } from "@apollo/client";

export const FindDevicesByOwnerOperations = gql`
  query FindOwnerOperations($uuid:uuid) {
    operators_operation (
      where:{
        devices:{
          ownership:{
            _eq:$uuid
          }
        }
      }
      distinct_on: id_operator_operation
    ) {
      id_operator_operation
      id_operator
      id_country
      devices {
        id_device
        serial
        lat
        lon
        ownership
      }
    }
  }
`;