import moment from 'moment';
import React from 'react';
import { Card, Header, Icon, Segment } from 'semantic-ui-react';

export interface ISubscriptionDetails {
  active: boolean;
  end_date: string;
  start_date: string;
  qty: number;
}

interface SubscriptionDetailScreenProps {
  details: ISubscriptionDetails;
}

const SubscriptionDetailScreen = ({
  details,
}: SubscriptionDetailScreenProps) => {
  const startDate = moment(details.start_date).format('LL');
  const endDate = moment(details.end_date).format('LL');
  // const { active } = details;
  // let message: String;
  // if (active) {
  //   message = 'You have an active subscription!';
  // } else {
  //   message = 'You have an inactive subscription!';
  // }

  return (
    <Card
      style={{
        padding: '1rem',
        width: '380px',
        marginBottom: '3px',
        boxShadow: '2px 2px 30px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <div>
        <Header as="h2" icon>
          <Icon
            name="credit card outline"
            style={{ fontSize: '3rem', color: '#1270e3' }}
          />
          <Header.Content>Subscription Details</Header.Content>
        </Header>
      </div>
      <Segment style={{ marginBottom: -5, borderTop: 'solid 3px #A9E26B' }}>
        <Header as="h5" style={{ marginLeft: 10 }} textAlign="left">
          <Icon name="check circle outline" style={{ color: '#A9E26B' }} />
          <Header.Content>
            Current Payment
            <Header.Subheader>{startDate}</Header.Subheader>
          </Header.Content>
        </Header>
      </Segment>
      <Segment style={{ marginBottom: 10 }} color="grey">
        <Header as="h5" style={{ marginLeft: 10 }} textAlign="left">
          <Icon name="calendar check outline" color="grey" />
          <Header.Content>
            Next Payment
            <Header.Subheader>{endDate}</Header.Subheader>
          </Header.Content>
        </Header>
      </Segment>
    </Card>
  );
};

export default SubscriptionDetailScreen;
