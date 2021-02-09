import React from 'react';
import { Card, Menu } from 'semantic-ui-react';

type SideNavProps = {
  menu: Number;
  updateMenu: Function;
};

const SideNav = ( props: SideNavProps ) => {
  const {menu, updateMenu} = props;
  return (
    <Card className="left-menu">
      <Menu vertical className="list-menu">
        <Menu.Item name='Devices' active={menu === 1}
          onClick={()=>{updateMenu(1)}}/>
        <Menu.Item name='My Orders' active={menu === 2}
          onClick={()=>{updateMenu(2)}}/>
        {/* <Menu.Item name='SIMS & Data' active={menu === 3}
          onClick={()=>{updateMenu(3)}}/>
        <Menu.Item name='Insurance & Claims' active={menu === 4}
          onClick={()=>{updateMenu(4)}}/>
        <Menu.Item name='Spots' active={menu === 5}
          onClick={()=>{updateMenu(5)}}/> */}
      </Menu>
    </Card>
  );
};

export default SideNav;