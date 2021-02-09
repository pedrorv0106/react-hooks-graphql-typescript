import PostRequest from '../../../../Global/Api/Request/Post';
import GetRequest from '../../../../Global/Api/Request/Get';
import { GetToken } from '../../../Auth/helpers/amplify';

const FindCustomerSubscription = async (CustomerId: string, Uuid: string) => {
  const token = await GetToken();
  const Request: any = await GetRequest({
    baseUrl: process.env.REACT_APP_MICROSERVICE_PAYMENTS_V2,
    url: '/subscriptions/getSubscription',
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

const FindCustomer = async (EmailAddress: string, Uuid: string) => {
  const token = await GetToken();
  const Request: any = await PostRequest({
    baseUrl: process.env.REACT_APP_MICROSERVICE_PAYMENTS_V2,
    url: '/subscriptions/checkCustomer',
    data: {
      email: EmailAddress,
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

export { FindCustomer, FindCustomerSubscription };
