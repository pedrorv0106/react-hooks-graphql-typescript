import React from 'react';
import { withRouter } from 'react-router';
import NavItem from './NavItem';

const MenuItems = [
  {
    path: '/',
    name: 'Dashboard',
    icon: require('./Resources/icon_dashboard.svg'),
    activeIcon: require('./Resources/icon_dashboard_active.svg'),
  },
  {
    path: '/my-fleet',
    name: 'My Fleet',
    icon: require('./Resources/icon_fleet.svg'),
    activeIcon: require('./Resources/icon_fleet_active.svg'),
  },
  {
    path: '/billing',
    name: 'Billing',
    icon: require('./Resources/icon_wallet.svg'),
    activeIcon: require('./Resources/icon_wallet_active.svg'),
  },
];

const NavMenu = ({ activePath }: any) => {
  return (
    <>
      {MenuItems.map((item) => {
        return (
          <NavItem
            key={item.path}
            path={item.path}
            label={item.name}
            iconUrl={activePath === item.path ? item.activeIcon : item.icon}
            active={activePath === item.path}
          />
        );
      })}
    </>
  );
};

export default withRouter(NavMenu);
