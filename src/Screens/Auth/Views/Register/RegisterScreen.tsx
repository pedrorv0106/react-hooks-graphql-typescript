import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { Grid, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import backgroundStars from '../../Resources/Images/bg_1_register_view.png';
import Button from '../../../../Components/Buttons/index';

import RegisterForm from './RegisterForm';

const ContainerRegister = styled(Grid)`
  min-height: 100vh;
  margin: 0 !important;
  background: fixed;
  background-image: url(${backgroundStars});
  background-color: white;
  background-size: auto 58%;
  background-repeat: no-repeat;
  background-position: bottom left;
  font-family: 'Poppins';
  align-items: center;
  padding: 6rem !important;
  .infoRegister {
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
    color: #454142;
    h1 {
      font-size: 64px;
      font-weight: 600;
    }
    h3 {
      font-size: 27px;
      font-weight: 600;
    }
    button {
      min-width: 100%;
      margin-top: 2rem !important;
      max-width: 280px !important;
    }
  }
  .login {
    color: white !important;
    max-width: 17rem;
    position: fixed !important;
    bottom: 0;
    margin-bottom: 3rem;
    z-index: 9;
  }
`;

const RegisterScreen = ({ history }: RouteChildrenProps) => {
  const handleGoToLogin = () => {
    history.push('/auth/login');
  };

  return (
    <ContainerRegister>
      <Grid.Column
        only="computer"
        style={{ position: 'fixed' }}
        computer={7}
        className="infoRegister"
      >
        <h1>Welcome!</h1>
        <h3>We need some billing details before you make the payment.</h3>
      </Grid.Column>
      <Grid.Column only="computer" computer={7} className="infoRegister login">
        <h3>Do you already have an account?</h3>
        <h3>Enter now!</h3>
        <Button icon labelPosition="right" onClick={handleGoToLogin}>
          <Icon name="long arrow alternate right" />
          Login
        </Button>
      </Grid.Column>
      <Grid.Column only="computer" computer={7} className="infoRegister" />
      <Grid.Column mobile={16} computer={9}>
        <RegisterForm history={history} />
      </Grid.Column>
    </ContainerRegister>
  );
};

export default RegisterScreen;
