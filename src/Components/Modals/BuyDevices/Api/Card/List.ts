import GetRequest from '../../../../../Global/Api/Request/Get';
import { GetToken } from '../../../../../Screens/Auth/helpers/amplify';

const listCard = async (customerId: string) => {
  const token = await GetToken();
  const Request = await GetRequest({
    baseUrl: process.env.REACT_APP_MICROSERVICE_PAYMENTS_V2,
    url: '/subscriptions/listCards',
    data: {
      customerId,
    },
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  if (Request.error) {
    return {
      error: Request.error,
      data: null,
    };
  }

  return {
    error: null,
    data: Request.data,
  };
};

export default listCard;
