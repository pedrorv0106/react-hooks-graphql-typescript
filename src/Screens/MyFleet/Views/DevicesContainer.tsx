import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';
import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import FilterPanel from './FilterPanel';
import DevicesTable from './DevicesTable';
import SimplePagination from '../../../Components/Pagination/Simple';
import FilterButton from '../../../Components/Buttons/FilterButton';
import MarkerMap from '../../../Components/Map/MarkerMap';
import { FindDevicesByOwnerOperations } from '../GraphQL/Queries/Devices';
import {
  FindOwnerOperations,
  FindServicesByOwnerOperations,
} from '../GraphQL/Queries/Operations';

const ContainerFragment = styled(Container)`
  width: 100% !important;
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    .header-left {
      display: flex;
      align-items: center;
      button {
        margin: 0 10px;
        background: none;
        opacity: 0.52;
        border-radius: 3px;
        border: dashed 1px #979797;
      }
    }
    .header-right {
      box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.05);
      background-color: #ffffff;
      color: #1270e3 !important;
      font-size: 15px;
      border: none;
      min-width: 94px;
    }
  }
  .pagination {
    float: right;
  }
  .overlay {
    margin: 31px 41px !important;
    border-radius: 26px !important;
    padding: 15px !important;
    background-color: white;
    height: calc(100vh - 62px) !important;
  }
`;

type ContainerProps = {
  visible: boolean;
  setVisible: Function;
};

function FormatDevicesInOperations(Operations: Array<any>) {
  console.log(Operations);

  const Devices = Operations.reduce(
    (acum, val) => [...acum, ...val.devices],
    []
  );

  return Devices;
}

function FormatServicesInOperations(Rides: Array<any>, Rentals: Array<any>) {
  let ServicesArray: any = [];

  ServicesArray = Rides.reduce((acum, val) => {
    return [
      ...acum,
      {
        id_service: val.id_service,
        id_device: val.device.id_device,
        serial: val.device.serial,
        service_type: 'Ride',
        cost: val.users_payments[0]?.total_cost,
        cost_usd: val.users_payments[0]?.usd_cost,
        currency: val.users_payments[0]?.currency,
        createdAt: val.created_at,
      },
    ];
  }, ServicesArray);

  ServicesArray = Rentals.reduce((acum, val) => {
    return [
      ...acum,
      {
        id_service: val.id_rental,
        id_device: val.device.id_device,
        serial: val.device.serial,
        service_type: 'Rental',
        cost:
          val.rentals_reservation?.rentals_reservations_payments[0]?.total_cost,
        cost_usd:
          val.rentals_reservation?.rentals_reservations_payments[0]?.usd_cost,
        currency:
          val.rentals_reservation?.rentals_types_pricing?.rentals_type?.country
            ?.currency,
        createdAt: val.created_at,
      },
    ];
  }, ServicesArray);

  return ServicesArray.sort((a: any, b: any) => {
    const DateA = new Date(a.createdAt);
    const DataB = new Date(b.createdAt);

    if (DateA > DataB) return -1;
    if (DataB > DateA) return 1;
    return 0;
  });
}

const DevicesContainer = (props: ContainerProps) => {
  const { visible, setVisible } = props;
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const { auth } = useSelector((state: any) => state);
  const [devices, setDevices] = useState([]);
  const [operations, setOperations] = useState([]);
  const [services, setServices] = useState([]);
  const [startDate, setStartDate] = useState<null | string>(null);
  const [endDate, setEndDate] = useState<null | string>(null);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // APOLLO
  // Devices Markers
  const [getDeviceMarkers, { loading, error, data }] = useLazyQuery(
    FindDevicesByOwnerOperations
  );

  // Owner Active Operations
  const [
    getOwnerOperations,
    { error: OperationError, data: OwnerOperations },
  ] = useLazyQuery(FindOwnerOperations);

  // Devices Rides And Rentals In Active Operations
  const [
    getServices,
    { loading: ServicesLoading, error: ServicesError, data: ServicesData },
  ] = useLazyQuery(FindServicesByOwnerOperations);

  // Handle when auth loads
  useEffect(() => {
    getDeviceMarkers({
      variables: {
        uuid: auth.uuid,
      },
    });

    getOwnerOperations({
      variables: {
        uuid: auth.uuid,
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  // Handle Devices Marker
  useEffect(() => {
    if (data) {
      const DeviceFormatted = FormatDevicesInOperations(
        data.operators_operation
      );
      setDevices(DeviceFormatted);
      setCenter({
        lat: parseFloat(DeviceFormatted[0]?.lat),
        lng: parseFloat(DeviceFormatted[0]?.lon),
      });
    }
  }, [data]);

  // Handle Owner Operatiosns
  useEffect(() => {
    if (OwnerOperations) {
      const OperationsByOwner = OwnerOperations?.operators_operation?.reduce(
        (acum: any, val: any) => [...acum, val.id_operator_operation],
        []
      );

      setOperations(OperationsByOwner);
    }
  }, [OwnerOperations]);

  // Handle Refetch Services When Operations Get changed
  useEffect(() => {
    if (operations) {
      getServices({
        variables: {
          operations,
          offset,
          limit,
          startDate: startDate || '2000-01-01',
          endDate: endDate || '2999-01-01',
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operations]);

  // Handle Services Data
  useEffect(() => {
    console.log('Service Data', ServicesData);
    if (ServicesData) {
      const Services = FormatServicesInOperations(
        ServicesData?.services,
        ServicesData?.rentals
      );

      setServices(Services);
    }
  }, [ServicesData]);

  // Handle data when error
  useEffect(() => {
    console.warn('[ERROR]', error, OperationError, ServicesError);
    const ErrorData = error || OperationError || ServicesError;

    if (ErrorData) Swal.fire('Ups!', ErrorData.message, 'error');
  }, [error, OperationError, ServicesError]);

  // Handle data when error
  useEffect(() => {
    console.warn('[LOADING]', loading);
  }, [loading]);

  // Handle Pagination
  function handleNextPage() {
    if (ServicesLoading) return;
    if (!ServicesLoading && ServicesData.length === 0) return;
    setPage((currentPage) => currentPage + 1);
  }

  function handlePreviousPage() {
    if (ServicesLoading) return;
    if (page === 1) return;
    setPage(page - 1);
  }

  useEffect(() => {
    setOffset((page - 1) * limit);
  }, [page, limit]);

  useEffect(() => {
    if (operations) {
      getServices({
        variables: {
          operations,
          offset,
          limit,
          startDate: startDate || '2000-01-01',
          endDate: endDate || '2999-01-01',
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, startDate, endDate]);

  // Handle Update filter Date
  function SetFilterDates(StartDate: any, EndDate: any) {
    setStartDate(StartDate);
    setEndDate(EndDate);
    setPage(1);
  }

  return (
    <ContainerFragment>
      <div style={{ height: '300px', width: '100%' }}>
        <MarkerMap markers={devices} center={center} />
      </div>
      <FilterButton
        setVisible={setVisible}
        rightPanel={
          <FilterPanel
            visible={visible}
            setVisible={setVisible}
            onSave={(a: any, b: any) => SetFilterDates(a, b)}
            startDate={startDate}
            endDate={endDate}
            loading={ServicesLoading}
          />
        }
      />
      <DevicesTable services={services} />
      <SimplePagination
        loading={ServicesLoading}
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
      />
    </ContainerFragment>
  );
};

export default DevicesContainer;
