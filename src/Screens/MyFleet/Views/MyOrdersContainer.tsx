import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, Icon, Image } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import VectorMap from '../../../Components/Map/VectorMap';
import CompleteMark from './CompleteMark';
import factory from '../Resources/icons/Factory.svg';
import factoryIcon from '../Resources/icons/Factory_icon.svg';
import ship from '../Resources/icons/Ship.svg';
import shipIcon from '../Resources/icons/Ship_icon.svg';
import box from '../Resources/icons/Box.svg';
import boxIcon from '../Resources/icons/Box_icon.svg';
import person from '../Resources/icons/Person.svg';
import { FindOrderProducts } from '../../../Global/GraphQL/Queries/Order';
import { FormatMoney } from '../../../Utils/formatNumber';

const ContainerFragment = styled(Container)`
  width: 100% !important;
  height: 100%;
  .vector-map {
    margin-top: 2.5rem;
  }
  .none-order {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #454142;
  }
  .scooter-type {
    display: flex;
    padding: 8px 0;
    img {
      width: 38px;
      height: 38px;
    }
    .scooter-comment {
      padding: 0 16px;
      font-size: 14px;
      color: #454142;
      .scooter-title {
        font-weight: bold;
      }
    }
  }
  .progress-status {
    font-size: 23px;
    font-weight: bold;
    color: #454142;
  }
  .order-process {
    display: flex;
    padding: 10px 0;
    padding-bottom: 30px;
    .one-progress {
      display: flex;
      align-items: center;
      .progress-image {
        display: flex;
        justify-content: center;
        align-items: center;
        border: solid 4px #1270e3;
        background-color: #d1f0fe;
        border-radius: 50%;
        width: 66px;
        height: 66px;
        cursor: pointer;
        img {
          width: 40px;
          height: 40px;
        }
      }
      .non-progress-image {
        display: flex;
        justify-content: center;
        align-items: center;
        border: solid 4px #edf3f9;
        background-color: #ffffff;
        border-radius: 50%;
        width: 44px;
        height: 44px;
        cursor: pointer;
        img {
          width: 30px;
          height: 30px;
        }
      }
      .last-process {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        border: solid 4px #edf3f9;
        color: #edf3f9;
        border-radius: 50%;
        width: 44px;
        height: 44px;
        cursor: pointer;
        font-size: x-large;
      }
      .progress-line {
        background-color: #edf3f9;
        height: 4px;
        width: 100px;
      }
    }
    .complete-mark {
      display: flex;
      align-items: center;
      .complete-image {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #1270e3;
        color: white;
        border-radius: 50%;
        width: 44px;
        height: 44px;
        font-size: x-large;
        cursor: pointer;
      }
      .complete-line {
        background-color: #1270e3;
        height: 4px;
        width: 100px;
      }
    }
  }
`;

const MyOrdersContainer = () => {
  const [latLng, updateLatLng] = useState({ lat: 43.523342, lng: 94.254569 });
  const [orderStep, setOrderStep] = useState(1);
  const [orderCountry, setOrderCountry] = useState('CO');
  const [orderCoords, setOrderCoords] = useState({
    lat: 43.523342,
    lng: 94.254569,
  });
  const [orderProducts, setOrderProducts] = useState([]);

  const { auth } = useSelector((state: any) => state);
  const { data, error } = useQuery(FindOrderProducts, {
    variables: {
      uuid: auth.uuid,
    },
  });

  const [order, updateOrder] = useState({
    text: 'In Factory',
    status: 1,
    country: 'CN',
  });

  const updateProcess = (i: Number) => {
    if (i === 1) {
      updateOrder({ text: 'In Factory', status: 1, country: 'CN' });
      updateLatLng({ lat: 43.523342, lng: 94.254569 });
    } else if (i === 2) {
      updateOrder({ text: 'QA Process', status: 2, country: 'CN' });
      updateLatLng({ lat: 43.523342, lng: 94.254569 });
    } else if (i === 3) {
      updateOrder({ text: 'In Transit', status: 3, country: orderCountry });
      updateLatLng({ lat: -39.246416, lng: 1.340091 });
    } else if (i === 4) {
      updateOrder({ text: 'On Customs', status: 4, country: orderCountry });
      updateLatLng(orderCoords);
    } else if (i === 5) {
      updateOrder({ text: 'Delivered', status: 5, country: orderCountry });
      updateLatLng(orderCoords);
    }
  };

  useEffect(() => {
    if (data && (data.owner_orders || []).length > 0) {
      setOrderProducts(data.owner_orders[0].owner_orders_products);
      setOrderStep(
        data.owner_orders[0].statusOrderByStatusOrder.id_status_order
      );
      setOrderCountry(data.owner_orders[0].country.iso);
      setOrderCoords({
        lat: data.owner_orders[0].order_lat,
        lng: data.owner_orders[0].order_lon,
      });
    }
  }, [data]);

  useEffect(() => {
    console.warn('[ERROR]', error);
    if (error) {
      Swal.fire('Ups!', error.message, 'error');
    }
  }, [error]);

  useEffect(() => {
    updateProcess(orderStep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderStep]);

  if (data && (data.owner_orders || []).length > 0)
    return (
      <ContainerFragment>
        <div className="title">Your Order</div>
        {orderProducts.map((orderProduct: any, index) => (
          <div className="scooter-type" key={index}>
            <Image src={orderProduct.owner_product.image_url} />
            <div className="scooter-comment">
              <div className="scooter-title">
                {orderProduct.owner_product.name}
              </div>
              <div className="scooter-total">
                ${FormatMoney(orderProduct.cost, 'USD')} x{' '}
                {orderProduct.quantity} unid.
              </div>
            </div>
          </div>
        ))}

        <div className="vector-map">
          <VectorMap order={order} latLng={latLng} />
        </div>

        <div className="order-process">
          {/* In Factory */}
          {order.status === 1 && (
            <div className="one-progress">
              <div className="progress-image">
                <Image src={factory} />
              </div>
              <div className="progress-line" />
            </div>
          )}
          {order.status > 1 && <CompleteMark />}
          {/* QA Process */}
          {order.status < 2 && (
            <div className="one-progress">
              <div className="non-progress-image">
                <Image src={factoryIcon} />
              </div>
              <div className="progress-line" />
            </div>
          )}
          {order.status === 2 && (
            <div className="one-progress">
              <div className="progress-image">
                <Image src={factory} />
              </div>
              <div className="progress-line" />
            </div>
          )}
          {order.status > 2 && <CompleteMark />}
          {/* In Transit */}
          {order.status < 3 && (
            <div className="one-progress">
              <div className="non-progress-image">
                <Image src={shipIcon} />
              </div>
              <div className="progress-line" />
            </div>
          )}
          {order.status === 3 && (
            <div className="one-progress">
              <div className="progress-image">
                <Image src={ship} />
              </div>
              <div className="progress-line" />
            </div>
          )}
          {order.status > 3 && <CompleteMark />}
          {/* Delivered */}
          {order.status < 4 && (
            <div className="one-progress">
              <div className="non-progress-image">
                <Image src={boxIcon} />
              </div>
              <div className="progress-line" />
            </div>
          )}
          {order.status === 4 && (
            <div className="one-progress">
              <div className="progress-image">
                <Image src={box} />
              </div>
              <div className="progress-line" />
            </div>
          )}
          {order.status > 4 && <CompleteMark />}
          {/* Ready to Ride */}
          {order.status < 5 && (
            <div className="one-progress">
              <div className="last-process">
                <Icon name="check" />
              </div>
            </div>
          )}
          {order.status === 5 && (
            <div className="one-progress">
              <div className="progress-image">
                <Image src={person} />
              </div>
            </div>
          )}
        </div>
        <div className="progress-status">{order.text}</div>
      </ContainerFragment>
    );
  return (
    <ContainerFragment>
      <div className="none-order">You don&apos;t have an active order</div>
    </ContainerFragment>
  );
};

export default MyOrdersContainer;
