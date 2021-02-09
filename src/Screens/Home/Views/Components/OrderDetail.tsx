import React from 'react';
import { Divider, Grid } from 'semantic-ui-react';
import { Text } from '../../../../Components/Texts/Text';
import Card from '../../../../Components/Cards/Base';
import Spacing, { SpaceTypes } from '../../../../Components/Spacing';
import { DetailItem, DetailItemSkeleton } from './OrderDetailItem';
import { FormatMoney } from '../../../../Utils/formatNumber';

export default function OrderDetail({ 
  loading = false,
  products = [],
  total_cost = 0,
}: any) {
  return (
    <Card style={{ width: '100%', borderRadius: '15px', minHeight: '20rem' }}>
      <Text size="small">
        <b>Your Last Order</b>
      </Text>
      <Spacing size={SpaceTypes.normal} />
      <Grid>
        <Grid.Column computer={16}>
          {loading && <DetailItemSkeleton />}
          {!loading && products.length === 0 && (
            <Text
              size="m"
              color="gray"
              align="center"
              style={{ marginTop: '1.5rem' }}
            >
              No order found
            </Text>
          )}
          {!loading && products.length > 0 && (
            <div>
              <Grid style={{ minHeight: '15rem' }}>
                {products.map((product: any) => (
                  <DetailItem
                    key={product.id_order_product}
                    cost_unit={product.cost_unit}
                    quantity={product.quantity}
                    owner_product={product.owner_product}
                  />
                ))}
              </Grid>
              <Divider />
              <Text align="left" color="gray">
                Total
              </Text>
              <Text align="left" weight="bolder">
                {FormatMoney(total_cost, 'USD')}
              </Text>
            </div>
          )}
        </Grid.Column>
      </Grid>
    </Card>
  );
}
