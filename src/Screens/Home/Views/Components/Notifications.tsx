import React from 'react';
import { Container, Divider, Grid } from 'semantic-ui-react';
import Card from '../../../../Components/Cards/Base';
import Spacer, { SpaceTypes } from '../../../../Components/Spacing';
import { Text } from '../../../../Components/Texts/Text';
import { FormatDate } from '../../../../Utils/formatDate';

interface NotificationType {
  id: number;
  text: string;
  date: string;
}

const NotificationsMock: Array<NotificationType> = [
  {
    id: 1,
    text: 'The scooter AX001 is damaged.',
    date: '2020-10-20 04:03:22',
  },
  {
    id: 2,
    text: 'Payment for your reservation in Santiago was unsuccesful.',
    date: '2020-10-19 04:03:22',
  },
  {
    id: 3,
    text: 'You have an unknown login attempt.',
    date: '2020-10-16 04:03:22',
  },
  {
    id: 4,
    text: 'Payment for your reservation in Pererira was unsuccesful.',
    date: '2020-10-16 04:03:22',
  },
];

export default function Notifications({
  notifications = NotificationsMock,
}: any) {
  return (
    <Card style={{ width: '100%', borderRadius: '15px', minHeight: '30rem' }}>
      <Text size="small">
        <b>Notifications</b>
      </Text>
      <Grid style={{ padding: '1em' }}>
        {notifications.map((notification: NotificationType) => {
          return (
            <div key={notification.id}>
              <Grid.Row style={{ paddingBottom: '0.5rem' }}>
                <Grid.Column computer={16} mobile={16} style={{ padding: 0 }}>
                  <Text style={{ fontSize: '1.2rem' }} color="lightdark">
                    {notification.text}
                  </Text>
                </Grid.Column>
                <Grid.Column
                  computer={16}
                  mobile={16}
                  style={{ padding: 0, marginTop: '0.5rem' }}
                >
                  <Text size="s" style={{ marginTop: '0.5rem' }} color="gray">
                    {notification.date && FormatDate(notification.date, 'LL')}
                  </Text>
                </Grid.Column>
              </Grid.Row>
              <Divider
                style={{ margin: '0rem', borderColor: 'rgba(0,0,0,.025)' }}
              />
            </div>
          );
        })}

        {
          notifications.length === 0 && (
            <Container>
              <Spacer size={SpaceTypes.large} />
              <Text size="small" align="center" color="gray">
                You have <b>0</b> notifications
              </Text>
            </Container>
          )
        }
      </Grid>
    </Card>
  );
}
