import React from 'react';
import styled from 'styled-components';
import { Button, Dropdown, Grid, Icon, Image } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { ApolloConsumer } from '@apollo/client';
import { Text } from '../Texts/Text';
import Colors from '../../Styles/colors';
import { startLogout } from '../../Screens/Auth/helpers/amplify';
import { logout } from '../../Screens/Auth/actions';
import { FormatDecimal } from '../../Utils/formatNumber';
import { GTM_DATALAYER } from '../../Global/Metrics/Gtm';

const FloatingButton = styled(Button)`
  background: transparent !important;
  position: fixed;
  z-index: 1000;
`;

const WhiteRoundedContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 16px;
  background-color: ${Colors.primary};
`;

const PaddingContainer = styled.div`
  padding: 0em 1em;
`;

const FlexContainer = styled.div`
  align-items: center;
  display: flex;
  flex-align: flex-end;
  justify-content: flex-end;
  padding: 1rem 2rem;
  width: 100%;
`;

export interface TopBarProps {
  isNavigationVisible: boolean;
  toggleNavigation: void;
}

interface stateProps {
  auth: any;
  owner: any;
}

function TopBar({ isNavigationVisible, toggleNavigation }: any) {
  const { auth, owner } = useSelector((state: stateProps) => state);
  const dispatch = useDispatch();

  async function handleLogout(client: any) {
    console.log('Loging out...');
    GTM_DATALAYER({
      userLogout: new Date().toISOString(),
      topBarLogout: 'true',
    });
    await client.cache.reset();
    await startLogout();
    dispatch(logout());
  }

  return (
    <Grid style={{ backgroundColor: Colors.background }}>
      <Grid.Row columns={2}>
        <Grid.Column computer={4}>
          <FloatingButton
            icon={isNavigationVisible ? 'arrow left' : 'arrow right'}
            onClick={toggleNavigation}
            size="large"
          />
        </Grid.Column>
        <Grid.Column computer={12} textAlign="right">
          <FlexContainer>
            <PaddingContainer>
              <Text size="s">{auth?.userName || 'Cosmic Investor'}</Text>
              <Text size="s" color="gray" align="right">
                <Icon name="star" size="small" />
                {FormatDecimal(owner.avgRating, 1)}
              </Text>
            </PaddingContainer>

            <Dropdown icon={<WhiteRoundedContainer>
                <Image
                  src={require('../../Global/Assets/icon_cosmic.png')}
                  alt="Profile Picture"
                  style={{ width: '100%', height: '100%' }}
                  />
              </WhiteRoundedContainer>}>
              <Dropdown.Menu direction="left">
                <ApolloConsumer>
                  {(client) => (
                    <Dropdown.Item
                      text="Logout"
                      onClick={() => handleLogout(client)}
                    />
                  )}
                </ApolloConsumer>
              </Dropdown.Menu>
            </Dropdown>
          </FlexContainer>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default TopBar;
