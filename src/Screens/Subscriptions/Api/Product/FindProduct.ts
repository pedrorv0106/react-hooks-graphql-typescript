import GetRequest from '../../../../Global/Api/Request/Get';
import { GetToken } from '../../../Auth/helpers/amplify';

const FindProduct = async (CustomerId: string, Uuid: string) => {
  const token = await GetToken();
  const Request: any = await GetRequest({
    baseUrl: process.env.REACT_APP_MICROSERVICE_PAYMENTS_V2,
    url: '/subscriptions/getProduct',
    data: {
      customerId: CustomerId,
      uuid: Uuid,
    },
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  if (Request.error) {
    return {
      error: Request.error?.error || Request.error,
      data: null,
    };
  }

  return {
    error: null,
    data: Request.data,
  };
};

export default FindProduct;
