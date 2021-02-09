import React, { useState } from 'react';
import Banner from './Base';
import BuyDevices from '../Modals/BuyDevices';

export default function WelcomeBanner() {
  const [openBuyDevices, setOpenBuyDevices] = useState(false);
  return (
    <>
      <BuyDevices
        open={openBuyDevices}
        onOpen={(state: boolean) => setOpenBuyDevices(state)}
      />
      <Banner
        title="Welcome!"
        subtitle="Buy a vehicle and start earning with Cosmic."
        image={require('./Resources/welcome_banner.png')}
        color="#42474b"
        subImage={require('./Resources/welcome_banner_person.png')}
        type={1}
        icon={require('../../Screens/MyFleet/Resources/add_new.png')}
        onClick={() => {
          setOpenBuyDevices(!openBuyDevices);
          console.log('heeyy');
        }}
      />
    </>
  );
}
