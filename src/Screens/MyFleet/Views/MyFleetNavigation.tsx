import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Card, Grid } from 'semantic-ui-react';
import Skeleton from 'react-loading-skeleton';
import MetricCard from '../../../Components/Cards/MetricCard';
import DevicesContainer from './DevicesContainer';
import MyOrdersContainer from './MyOrdersContainer';
import SideNav from './SideNav';

import welcomeBanner from '../Resources/welcome_banner.png';
import welcomeBannerPeople from '../Resources/welcome_banner_people.png';
import addNew from '../Resources/add_new.png';

import transitBanner from '../Resources/your_fleet_is_in_transit_banner_bg.png';
import transitBannerPeople from '../Resources/your_fleet_is_in_transit_banner_people.png';
import checkOrder from '../Resources/check_order.png';

function MyFleetNavigation(props: any) {
  const { loading, metricData } = props;
  const [menu, updateMenu] = useState(0);
  const [visible, setVisible] = useState(false);

  function handleClick(e: any) {
    console.log('e', e);
  }
  return (
    <>
      <Grid.Column computer={4} style={{ borderRadius: '10px !important' }}>
        <SideNav menu={menu} updateMenu={updateMenu} />
      </Grid.Column>
      <Grid.Column computer={12}>
        <Card className="right-menu">
          {menu === 1 && (
            <DevicesContainer visible={visible} setVisible={setVisible} />
          )}
          {menu === 2 && <MyOrdersContainer />}
          {menu === 0 && (loading ? <Skeleton height="26px" /> : <>
          {metricData ? 
            <MetricCard
              title="Your fleet is in transit!"
              image={transitBanner}
              icon={checkOrder}
              color="#1270e3"
              subImage={transitBannerPeople}
              type={2}
              onClick={handleClick}
            /> : <MetricCard
              title="Welcome! Buy a vehicle and start earning with Cosmic."
              image={welcomeBanner}
              icon={addNew}
              color="#42474b"
              subImage={welcomeBannerPeople}
              type={1}
              onClick={handleClick}
          />}
          </>)}
        </Card>
      </Grid.Column>
    </>
  );
}

export default withRouter(MyFleetNavigation);
