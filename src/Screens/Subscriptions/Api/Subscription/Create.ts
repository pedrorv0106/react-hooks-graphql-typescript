import PostRequest from '../../../../Global/Api/Request/Post';
import { GetToken } from '../../../Auth/helpers/amplify';

interface CreateSubscriptionProps {
  customerId: string;
  priceId: string;
  qty: number;
}

const CreateSubscription = async (Data: CreateSubscriptionProps) => {
  const token = await GetToken();
  const Request = await PostRequest({
    baseUrl: process.env.REACT_APP_MICROSERVICE_PAYMENTS_V2,
    url: '/subscriptions/addSubscription',
    data: {
      ...Data,
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

export default CreateSubscription;
