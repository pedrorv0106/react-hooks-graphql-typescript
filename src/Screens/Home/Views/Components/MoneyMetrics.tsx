import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Button, Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Card from '../../../../Components/Cards/Base';
import Spacing, { SpaceTypes } from '../../../../Components/Spacing';
import { Text } from '../../../../Components/Texts/Text';
import { FormatDate } from '../../../../Utils/formatDate';
import { FormatMoney } from '../../../../Utils/formatNumber';

const PayNowButton = styled(Button)`
  padding: 1em 2em !important;
  background-color: #fff !important;
  color: #333 !important;
  font-size: 1.4em !important;
  margin-top: 1.5em !important;
  margin-right: 1em !important;
  border-radius: 16px !important;
`;

function MoneyMetrics({
  fee = 0,
  next_fee = null,
  earnings = 0,
  next_earning = new Date().toISOString(),
  currency = 'usd',
  loading = true,
  history,
}: any) {
  function GoToPay() {
    history.push('/billing');
  }

  return (
    <Grid>
      <Grid.Column computer="16" mobile="16">
        <Card
          style={{
            width: '100%',
            borderRadius: '15px',
            backgroundImage: 'linear-gradient(293deg, #93f07d ,#29c78a)',
          }}
        >
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column computer={10}>
                <Text size="small" color="white">
                  <b>Fee Per Month</b>
                </Text>
                <Spacing size={SpaceTypes.normal} />
                <Text size="s" color="white">
                  Next Owner Payment
                </Text>
                <Spacing size={SpaceTypes.small} />
                {/* Fee */}
                <Text size="l" weight="bolder" color="white">
                  {loading ? (
                    <Skeleton height="30px" />
                  ) : (
                    FormatMoney(fee, currency)
                  )}
                </Text>
                {/* Fee Date */}
                <Spacing size={SpaceTypes.small} />
                <Text size="xs" color="white">
                  {loading && <Skeleton height="15px" width="50px" />}
                  {next_fee && FormatDate(next_fee, 'LL')}
                  {!next_fee && !loading && 'Now'}
                </Text>
              </Grid.Column>
              <Grid.Column computer={6} textAlign="right">
                {!loading &&
                  (!next_fee || new Date() >= new Date(next_fee) ? (
                    <PayNowButton onClick={GoToPay}>Pay Now</PayNowButton>
                  ) : (
                    <Text
                      weight="bold"
                      size="m"
                      color="white"
                      style={{ marginTop: '1.5em' }}
                    >
                      Next payment <br />
                      {next_fee ? FormatDate(next_fee, 'LL') : 'NOW'}
                    </Text>
                  ))}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card>
      </Grid.Column>
      <Grid.Column computer="8" mobile="16" style={{ display: 'none' }}>
        <Card
          style={{
            width: '100%',
            borderRadius: '15px',
            backgroundImage: 'linear-gradient(293deg, #93f07d ,#29c78a)',
          }}
        >
          <Text size="small" color="white">
            <b>Your Earnings</b>
          </Text>

          <Spacing size={SpaceTypes.normal} />
          <Text size="s" color="white">
            Next Cosmic Partner
          </Text>
          <Spacing size={SpaceTypes.small} />
          {/* Earning Cost */}
          <Text size="l" weight="bolder" color="white">
            {FormatMoney(earnings, currency)}
          </Text>
          {/* Earning Date */}
          <Spacing size={SpaceTypes.small} />
          <Text size="xs" color="white">
            {FormatDate(next_earning, 'LL')}
          </Text>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default withRouter(MoneyMetrics);
