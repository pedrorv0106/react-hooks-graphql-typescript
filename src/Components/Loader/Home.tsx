import React from 'react';
import styled from 'styled-components';
import { Dimmer, Loader } from 'semantic-ui-react';
import ImageLogo from '../Image/Logo';

const CustomBackground = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5fb;
  position: fixed;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 3rem;
  min-height: 100%;
  min-width: 100%;
`;

function HomeLoader() {
  return (
    <CustomBackground>
      <Dimmer active inverted>
        <div style={{ marginBottom: 300 }}>
          <ImageLogo size={110} align="center" />
        </div>
        <Loader size="big" inverted>
          Loading
        </Loader>
      </Dimmer>
    </CustomBackground>
  );
}

export default HomeLoader;
