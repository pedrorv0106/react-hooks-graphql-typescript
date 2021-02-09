import React, { useEffect, useState } from 'react';
import { Grid, Container } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import Swal from 'sweetalert2';
import DefaultCard from '../../../Components/Cards/DefaultCard';
import { useModal } from '../../../Components/Modal/ScooterDetail/WrapperHooks';
import iconCalendar from '../Resources/icon_calendar.png';
import iconScooter from '../Resources/icon_scooter.png';
import iconRoi from '../Resources/icon_roi.png';
import { FindOwnerMetrics } from '../../../Global/GraphQL/Queries/Metrics';
import { FormatMoney } from '../../../Utils/formatNumber';

import MyFleetNavigation from './MyFleetNavigation';

const ContainerFleet = styled(Grid)`
  min-height: 100vh;
  margin: 0 !important;
  font-family: 'Poppins';
  align-items: center;
  background-color: #f5f5fb;
  flex-direction: column !important;
  position: relative;
  .flex-1 {
    flex: 1;
  }
  .left-menu {
    height: 100%;
    padding: 26px;
    width: 100%;
    box-shadow: 2px 2px 30px 0 rgba(0, 0, 0, 0.05) !important;
    .list-menu {
      width: 100%;
      border: none !important;
      box-shadow: none !important;
    }
    .item {
      border: none !important;
      font-size: 15px;
      font-weight: 500 !important;
      line-height: 1.53;
      letter-spacing: 0.25px;
      color: #787993 !important;
    }
    .item::before {
      display: none !important;
    }
    .active {
      border-radius: 3px !important;
      background-color: rgba(0, 108, 230, 0.1) !important;
      color: #1270e3 !important;
    }
  }
  .right-menu {
    width: 100% !important;
    height: 100%;
    padding: 17px;
    box-shadow: 2px 2px 30px 0 rgba(0, 0, 0, 0.05) !important;
  }
  #overlay {
    position: absolute;
    opacity: 0.77;
    background-color: #454142;
    width: 100%;
    height: 100%;
  }
`;

interface MyFleetMetrics {
  totalOperationScooters: number;
  totalScooters: number;
  totalOperationEarnings: number;
  totalEarnings: number;
  currentMonth: string;
  currentMonthOperationRides: number;
}

const MyFleetMetricsBase: MyFleetMetrics = {
  totalOperationScooters: 0,
  totalScooters: 0,
  totalOperationEarnings: 0,
  totalEarnings: 0,
  currentMonth: moment().format('MMMM'),
  currentMonthOperationRides: 0,
};

const MyFleet = () => {
  // Local Management
  const [visible,] = useState(false);
  const [fleetMetrics, setFleetMetrics] = useState<MyFleetMetrics>(
    MyFleetMetricsBase
  );

  // Apollo
  const {
    loading: OwnerLoading,
    error: OwnerMetricError,
    data: OwnerMetricData,
  } = useQuery(FindOwnerMetrics);

  const { modal } = useModal();

  // Hasndle Error
  useEffect(() => {
    if (OwnerMetricError) Swal.fire('Ups!', OwnerMetricError.message, 'error');
  }, [OwnerMetricError]);

  // Handle Loaded Data
  useEffect(() => {
    if (OwnerMetricData) {
      setFleetMetrics(OwnerMetricData?.OwnerMetrics);
    }
  }, [OwnerMetricData]);

  return (
    <Container style={{ maxWidth: '1900px !important', width: '90%' }}>
      <ContainerFleet>
        <Grid.Row columns={5}>
          <Grid.Column computer="3" tablet="8" mobile="8">
            <DefaultCard
              title={fleetMetrics?.totalOperationScooters || 0}
              loading={OwnerLoading}
              subtitle="Scooter in Ops"
              icon={iconScooter}
            />
          </Grid.Column>
          <Grid.Column computer="3" tablet="8" mobile="8">
            <DefaultCard
              title={fleetMetrics?.totalScooters || 0}
              loading={OwnerLoading}
              subtitle="My Scooters"
              icon={iconScooter}
            />
          </Grid.Column>
          <Grid.Column computer="4" tablet="8" mobile="8">
            <DefaultCard
              title={FormatMoney(fleetMetrics.totalOperationEarnings, 'USD')}
              loading={OwnerLoading}
              subtitle={`Revenue Ops in ${fleetMetrics?.currentMonth || '...'}`}
              icon={iconRoi}
            />
          </Grid.Column>
          <Grid.Column computer="3" tablet="8" mobile="8">
            <DefaultCard
              loading={OwnerLoading}
              title={FormatMoney(fleetMetrics?.totalEarnings, 'USD') || 0}
              subtitle={`My Revenue in ${fleetMetrics?.currentMonth || '...'}`}
              icon={iconRoi}
            />
          </Grid.Column>
          <Grid.Column computer="3" tablet="8" mobile="8">
            <DefaultCard
              title={fleetMetrics?.currentMonthOperationRides || 0}
              loading={OwnerLoading}
              subtitle={`${fleetMetrics?.currentMonth || '...'} Ops Rides`}
              icon={iconCalendar}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="flex-1">
          <MyFleetNavigation loading={OwnerLoading} metricData={OwnerMetricData}/>
        </Grid.Row>
        {(visible || modal.show) && <div id="overlay" />}
      </ContainerFleet>
    </Container>
  );
};

export default MyFleet;
