import PostRequest from '../../../../../Global/Api/Request/Post';
import { GetToken } from '../../../../../Screens/Auth/helpers/amplify';

interface CreateCardProps {
  id: string;
  customerId: string;
}

const createCard = async ({ id, customerId }: CreateCardProps) => {
  const token = await GetToken();
  const Request = await PostRequest({
    baseUrl: process.env.REACT_APP_MICROSERVICE_PAYMENTS_V2,
    url: '/subscriptions/addCard',
    data: {
      customerId,
      cardId: id,
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

export default createCard;
