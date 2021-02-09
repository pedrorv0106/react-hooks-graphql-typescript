import GetRequest from '../../../../../Global/Api/Request/Get';
import { GetToken } from '../../../../../Screens/Auth/helpers/amplify';

const findClientSecret = async (customerId: string) => {
  const token = await GetToken();
  const Request: any = await GetRequest({
    baseUrl: process.env.REACT_APP_MICROSERVICE_PAYMENTS_V2,
    url: '/subscriptions/getClientSecret',
    data: {
      customerId,
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

export default findClientSecret;
