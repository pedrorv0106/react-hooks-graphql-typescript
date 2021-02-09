import React from 'react';
import styled from 'styled-components';

import { Divider, Header, Image } from 'semantic-ui-react';

const CenteredContainer = styled.div`
  width: 100%;
  margin: auto;
  text-align: center;

  & > img {
    margin: auto;
    margin-top: 1.5rem;
  }

`;

const TopSide = () => {
  return (
    <CenteredContainer>
      <Image src={require('../../../Global/Assets/icon_cosmic.png')} size="tiny" alt="Cosmic Logo" />

      <Header style={{ margin: '1.5em auto', fontSize: '1rem' }}>
        Share The World
      </Header>
      <Divider style={{ width: '80%', margin: '2em auto' }} />
    </CenteredContainer>
  );
};

export default TopSide;
