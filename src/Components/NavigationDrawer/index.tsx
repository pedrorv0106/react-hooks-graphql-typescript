import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Sidebar, Segment, Menu } from 'semantic-ui-react';

import { withRouter, useLocation } from 'react-router';
import TopSide from './Views/TopSide';
import NavMenu from './Views/NavMenu';

// Top Bar
import TopBar from '../TopBar';
import colors from '../../Styles/colors';

const FullScreenContainer = styled.div`
  display: block;
  width: 100%;
  height: 100%;

  .sidebar {
    background-color: white !important;
    border: 0 !important;
    border-right: solid 1px #ededf1 !important;
    height: 100%;
  }

  .sidebar:not(.visible) ~ .pusher {
    width: 100% !important;
  }

  .pusher {
    overflow-y: auto;
    width: calc(100% - 350px);
    transition: 0.1s ease;
    background-color: ${colors.background} !important;

    .ui.container {
      overflow:hidden;
    }
  }
`;

const GetSidebarState = () => {
  const savedValue = localStorage.getItem('sidebar_visible');
  if (!savedValue) return true;

  return savedValue === 'VISIBLE';
}

const NavigationDrawer = ({ children }: any) => {
  const { pathname: currentPath } = useLocation();
  const [visible, setVisible] = useState(GetSidebarState);

  // Save on LocalStorage the Last State
  useEffect(() => {
    localStorage.setItem('sidebar_visible', visible ? 'VISIBLE' : 'INVISIBLE');
  }, [visible]);

  return (
    <FullScreenContainer>
      <Sidebar.Pushable as={Segment} style={{ height: '100vh' }}>
        <Sidebar
          as={Menu}
          animation="push"
          icon="labeled"
          vertical
          visible={visible}
          width="wide"
        >
          <TopSide />

          <NavMenu activePath={currentPath} />
        </Sidebar>

        <Sidebar.Pusher>
          <TopBar
            isNavigationVisible={visible}
            toggleNavigation={() => setVisible(!visible)} />
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </FullScreenContainer>
  );
};

export default withRouter(NavigationDrawer);
