import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Grid, Image } from 'semantic-ui-react';
import { Text } from '../../../../Components/Texts/Text';
import CosmicLogo from '../../../../Global/Assets/icon_cosmic.png';
import { FormatMoney } from '../../../../Utils/formatNumber';

function DetailItemSkeleton() {
  return (
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column computer={2}>
          <div style={{ margin: 'auto', textAlign: 'right' }}>
            <Skeleton circle height={40} width={40} />
          </div>
        </Grid.Column>
        <Grid.Column computer={10}>
          <Skeleton height={20} width={300} /> <br />
          <Skeleton height={18} width={100} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column computer={2}>
          <div style={{ margin: 'auto', textAlign: 'right' }}>
            <Skeleton circle height={40} width={40} />
          </div>
        </Grid.Column>
        <Grid.Column computer={10}>
          <Skeleton height={20} width={300} /> <br />
          <Skeleton height={18} width={100} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column computer={2}>
          <div style={{ margin: 'auto', textAlign: 'right' }}>
            <Skeleton circle height={40} width={40} />
          </div>
        </Grid.Column>
        <Grid.Column computer={10}>
          <Skeleton height={20} width={300} /> <br />
          <Skeleton height={18} width={100} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function DetailItem({ cost_unit = 0, quantity = 0, owner_product }: any) {
  return (
    <Grid.Row columns={2}>
      <Grid.Column computer={2}>
        <div style={{ margin: 'auto', textAlign: 'center' }}>
          <Image
            src={owner_product?.image_url || CosmicLogo}
            style={{
              width: 50,
              height: 50,
              margin: 'auto',
              borderRadius: '10px',
            }}
          />
        </div>
      </Grid.Column>
      <Grid.Column computer={10}>
        <Text label={owner_product?.name} weight="bold" size="m" />
        <Text size="s">
          {FormatMoney(cost_unit, 'USD')} x {quantity} unid.
        </Text>
      </Grid.Column>
    </Grid.Row>
  );
}

export { DetailItemSkeleton, DetailItem };
