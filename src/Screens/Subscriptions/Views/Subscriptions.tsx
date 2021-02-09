import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Card, Dimmer, Header, Icon, Loader } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import CustomBackground from './CustomBackground';
import CheckOutForm from './CheckOutForm';

import {
  FindCustomer,
  FindCustomerSubscription,
} from '../Api/Customer/FindCustomer';
import FindProduct from '../Api/Product/FindProduct';

import SubscriptionDetail from './SubscriptionDetails';

// Views
import ProductDetail from './ProductDetail';
import ImageLogo from '../../../Components/Image/Logo';

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_TOKEN || 'INSERT_YOUR_API_KEY'
);

interface IProductDetail {
  currency: string;
  amount: number;
  name: string;
  description?: string;
  image?: string;
  productId: string;
  priceId: string;
  billing_scheme: string;
  interval: string;
}

export interface ISubscriptionDetails {
  active: boolean;
  end_date: string;
  start_date: string;
  qty: number;
}

const SubscriptionsScreen = () => {
  const { email, uuid } = useSelector((state: any) => state.auth);
  const [customerId, setCustomerId] = useState('');
  const [productDetail, setProductDetails] = useState<null | IProductDetail>(
    null
  );
  const [deviceQty, setDeviceQty] = useState(1);
  const [loadingData, setLoadingData] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState<null | boolean>(null);
  const [
    subscriptionDetails,
    setSubscriptionDetails,
  ] = useState<null | ISubscriptionDetails>(null);

  const fetchCustomer = async () => {
    const { data, error } = await FindCustomer(email, uuid);
    if (data) {
      const Data: { customer: { customerId: string } } = data;
      setCustomerId(Data.customer.customerId);
    }
    if (error) {
      Swal.fire('Error', error.message || 'Customer error', 'error');
      // eslint-disable-next-line no-console
      console.log(error);
    }
    setLoadingData(false);
  };

  const fetchProduct = async () => {
    const { data, error } = await FindProduct(customerId, uuid);
    if (data) {
      const Data: { product: IProductDetail; devices: number } = data;
      setProductDetails(Data.product);
      setDeviceQty(Data.devices);
    }
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      Swal.fire('Error', error.message || 'Product error', 'error');
    }
    setLoadingData(false);
  };

  const fetchSubscription = async () => {
    const { data, error } = await FindCustomerSubscription(customerId, uuid);
    // eslint-disable-next-line no-console
    console.log(error);
    if (error) {
      setIsSubscribed(false);
    } else if (data) {
      const Data: { subscription: ISubscriptionDetails } = data;
      setIsSubscribed(true);
      setSubscriptionDetails(Data.subscription);
    }
  };

  // First render
  useEffect(() => {
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CustomerId Fetched
  useEffect(() => {
    if (customerId) {
      fetchProduct();
      fetchSubscription();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  // Show Loading when is loading the customer and product details
  if (loadingData) {
    return (
      <CustomBackground>
        <Dimmer active inverted>
          <div style={{ marginBottom: 300 }}>
            <ImageLogo size={110} align="center" />
          </div>
          <Loader size="big" inverted>
            Loading
          </Loader>
        </Dimmer>
      </CustomBackground>
    );
  }
  return (
    <CustomBackground>
      <div>{/* <ImageLogo size={80} /> */}</div>
      <Elements stripe={stripePromise}>
        {/* Show Product Details */}
        {productDetail && (
          <ProductDetail
            name={productDetail?.name}
            description={productDetail?.description}
            image={productDetail?.image}
            amount={productDetail?.amount}
            currency={productDetail?.currency.toUpperCase()}
            qty={deviceQty}
          />
        )}

        {/* Show if Customer Is Not In An Active Subscription */}
        {isSubscribed === false && productDetail && deviceQty > 0 && (
          <CheckOutForm
            priceId={productDetail.priceId}
            customerId={customerId}
            qty={deviceQty}
          />
        )}

        {deviceQty === 0 && (
          <Card
            style={{
              padding: '1rem',
              width: '380px',
              marginBottom: '3px',
              boxShadow: '2px 2px 30px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            <Header as="h3" icon textAlign="center">
              <Icon
                name="cart arrow down"
                size="mini"
                style={{
                  color: '#1270e3',
                  marginBottom: '1.5rem',
                }}
              />
              You don&apos;t have devices <i>(yet...)</i>
              <Header.Subheader style={{ marginTop: '0.5rem' }}>
                Buy a device and <a href="https://cosmicgo.co">start earning</a>
                &nbsp; with Cosmic.
              </Header.Subheader>
            </Header>
          </Card>
        )}

        {/* Show if Customer has an active subscription */}
        {isSubscribed && subscriptionDetails !== null && (
          <SubscriptionDetail details={subscriptionDetails} />
        )}
      </Elements>
    </CustomBackground>
  );
};

export default SubscriptionsScreen;
