import PostRequest from '../../../../../Global/Api/Request/Post';
import { GetToken } from '../../../../../Screens/Auth/helpers/amplify';

const findCustomer = async (email: string, uuid: string) => {
  const token = await GetToken();
  const Request: any = await PostRequest({
    baseUrl: process.env.REACT_APP_MICROSERVICE_PAYMENTS_V2,
    url: '/subscriptions/checkCustomer',
    data: {
      email,
      uuid,
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

export default findCustomer;
