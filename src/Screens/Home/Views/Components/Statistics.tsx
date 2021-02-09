import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Divider, Grid, Icon } from 'semantic-ui-react';
import Card from '../../../../Components/Cards/Base';
import { Text } from '../../../../Components/Texts/Text';
import { FormatDecimal, FormatMoney } from '../../../../Utils/formatNumber';

export default function Statistics({
  avgOperationRating = 0,
  roi = 0,
  totalScooters = 0,
  totalOperationScooters = 0,
  co2 = 0,
  loading = true,
  currentMonth,
  totalEarnings = 0,
  currentMonthOperationRides = 0,
  currentMonthOperationRentals = 0,
}: any) {
  return (
    <Card style={{ width: '100%', borderRadius: '15px' }}>
      <Text size="small">
        <b>Statistics</b>
      </Text>

      <br />
      <Grid>
        <Grid.Row columns={4}>
          <Grid.Column computer={4} mobile={8}>
            <Text size="l">
              {loading ? <Skeleton height={50} /> : FormatDecimal(avgOperationRating)}
              {!loading && (
                <Icon
                  name="star"
                  color="green"
                  size="small"
                  style={{ marginLeft: '0.5em', transform: 'translateY(-3px)' }}
                />
              )}
            </Text>
            <Text size="s" color="gray">
              Ops Rating
            </Text>
          </Grid.Column>
          <Grid.Column computer={4} mobile={8}>
            <Text size="l">
              {loading ? <Skeleton height={50} /> : totalOperationScooters}
            </Text>
            <Text size="s" color="gray">
              Scooters in Ops
            </Text>
          </Grid.Column>
          <Grid.Column computer={4} mobile={8}>
            <Text size="m">
              {loading ? <Skeleton height={50} /> : currentMonthOperationRides}
            </Text>
            <Text size="s" color="gray">
              { currentMonth || '...' } Rides
            </Text>
          </Grid.Column>
          <Grid.Column computer={4} mobile={8}>
            <Text size="l">
              {loading ? <Skeleton height={50} /> : currentMonthOperationRentals}
            </Text>
            <Text size="s" color="gray">
            { currentMonth || '...' } Rentals
            </Text>
          </Grid.Column>
        </Grid.Row>

        <Divider />

        <Grid.Row columns={4}>
          <Grid.Column computer={4} mobile={8}>
            <Text size="l" color="success">
              {loading ? <Skeleton height={50} /> : FormatMoney(totalEarnings, 'USD') }
            </Text>
            <Text size="s" color="gray">
            { currentMonth || '...' } Revenue
            </Text>
          </Grid.Column>
          <Grid.Column computer={4} mobile={8}>
            <Text size="l">
              {loading ? <Skeleton height={50} /> : totalScooters }
            </Text>
            <Text size="s" color="gray">
              My Scooters
            </Text>
          </Grid.Column>
          <Grid.Column computer={4} mobile={8}>
            <Text size="l">
              {loading ? <Skeleton height={50} /> : FormatDecimal(roi) + ' %'}
            </Text>
            <Text size="s" color="gray">
              R.O.I
            </Text>
          </Grid.Column>
          <Grid.Column computer={4} mobile={8}>
            <Text size="l">
            {loading ? <Skeleton height={50} /> : FormatDecimal(co2, 0) + ' kgCO2'}
            </Text>
            <Text size="s" color="gray">
              SROI
            </Text>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card>
  );
}
