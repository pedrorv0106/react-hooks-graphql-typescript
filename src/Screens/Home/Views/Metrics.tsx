import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';
import Swal from 'sweetalert2';

import WelcomeBanner from '../../../Components/Banners/Welcome';
import { FindOrderProducts } from '../../../Global/GraphQL/Queries/Order';
import {
  FindCustomer,
  FindCustomerSubscription,
} from '../../Subscriptions/Api/Customer/FindCustomer';
import FindProduct from '../../Subscriptions/Api/Product/FindProduct';
import { updateRating } from '../actions';
import { FindOwnerMetrics } from '../../../Global/GraphQL/Queries/Metrics';
import MoneyMetrics from './Components/MoneyMetrics';
import Notifications from './Components/Notifications';
import OrderDetail from './Components/OrderDetail';
import StatisticMetrics from './Components/Statistics';

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

async function FindOwnerSubscriptionDetails(
  emailAddress: string,
  uuid: string
) {
  const Customer = await FindCustomer(emailAddress, uuid);
  if (Customer.error) {
    return null;
  }
  const CustomerData: { customer: { customerId: string } } = Customer.data;
  const CustomerId = CustomerData.customer.customerId;

  const Product = await FindProduct(CustomerId, uuid);
  if (Product.error) {
    return null;
  }
  const ProductData: { product: IProductDetail; devices: number } =
    Product.data;

  const Subscription = await FindCustomerSubscription(CustomerId, uuid);
  const SubscriptionData: { subscription: ISubscriptionDetails } =
    Subscription.data;

  const monthlyCost = ProductData.product.amount * ProductData.devices;

  return {
    product: ProductData.product,
    devicesQty: ProductData.devices,
    subscription: SubscriptionData?.subscription,
    monthlyCost,
  };
}

const HomeScreen = () => {
  // Local State Management
  const [fee, setFee] = useState(0);
  const [nextFeeDate, setNextFeeDate] = useState<null | string>(null);
  const [loadingFee, setLoadingFee] = useState(true);

  // Redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state: any) => state);

  // Apollo
  const { loading: StatisticLoading, error, data } = useQuery(FindOwnerMetrics);
  const {
    loading: OrderLoading,
    error: OrderError,
    data: OrderData,
  } = useQuery(FindOrderProducts, {
    variables: {
      uuid: auth?.uuid,
    },
  });

  function UpdateOwnerStore() {
    dispatch(updateRating(data?.OwnerMetrics?.avgRating));
  }

  function UpdateSubscriptionDetail(Details: any) {
    if (Details) {
      const { monthlyCost, subscription } = Details;

      if (monthlyCost) setFee(monthlyCost);
      if (subscription) setNextFeeDate(subscription.end_date);
    }
    setLoadingFee(false);
  }

  // Execute when `data` is updated
  useEffect(() => {
    if (data) UpdateOwnerStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Execute when `error` is detected
  useEffect(() => {
    if (error) Swal.fire('Ups!', error.message, 'error');
    else if (OrderError) Swal.fire('Ups!', OrderError.message, 'error');
  }, [error, OrderError]);

  // Execute whe the app just started
  useEffect(() => {
    FindOwnerSubscriptionDetails(auth.email, auth.uuid).then(
      UpdateSubscriptionDetail
    );
  }, [auth]);

  return (
    <Container
      style={{
        marginTop: '2em',
        width: '100% !important',
      }}
    >
      <WelcomeBanner />

      {/* METRICS */}
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column
            computer={10}
            mobile={16}
            style={{ margin: '1em 0em 1em 0em' }}
          >
            <StatisticMetrics
              loading={StatisticLoading}
              avgOperationRating={data?.OwnerMetrics?.avgOperationRating}
              roi={data?.OwnerMetrics?.roi}
              totalScooters={data?.OwnerMetrics?.totalScooters}
              totalOperationScooters={data?.OwnerMetrics?.totalOperationScooters}
              co2={data?.OwnerMetrics?.co2}
              currentMonth={data?.OwnerMetrics?.currentMonth}
              totalEarnings={data?.OwnerMetrics?.totalEarnings}
              currentMonthOperationRides={data?.OwnerMetrics?.currentMonthOperationRides}
              currentMonthOperationRentals={data?.OwnerMetrics?.currentMonthOperationRentals || 0}
            />
            <MoneyMetrics
              fee={fee}
              next_fee={nextFeeDate}
              loading={loadingFee}
            />

            <OrderDetail
              loading={OrderLoading}
              products={OrderData?.owner_orders[0]?.owner_orders_products}
              total_cost={OrderData?.owner_orders[0]?.total_cost_usd}
            />
          </Grid.Column>

          <Grid.Column
            computer={6}
            mobile={16}
            style={{ margin: '1em 0em 1em 0em' }}
          >
            <Notifications notifications={[]} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default HomeScreen;
