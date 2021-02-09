import React, { useEffect } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { RouteChildrenProps } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../../Components/Buttons/index';
import backgroundImageDark from '../../Resources/Images/bg_2_register_view.png';
import backgroundStars from '../../Resources/Images/bg_1_register_view.png';
import LoginForm from './LoginForm';

const ContainerLogin = styled(Grid)`
  min-height: 100vh;
  margin: 0 !important;
  background-image: url(${backgroundStars}), url(${backgroundImageDark});
  background-color: #283b52;
  background-size: auto 58%, auto 100%;
  background-repeat: no-repeat;
  background-position: bottom left, center;
  font-family: 'Poppins';
  align-items: center;
  padding: 4rem 6rem !important;
  color: white;
`;

const LoginScreen = ({ history }: RouteChildrenProps): any => {
  const { sesionStatus } = useSelector((state: any) => state.auth);

  const handleGoToRegister = () => {
    history.push('/auth/register');
  };

  useEffect(() => {
    if (sesionStatus) {
      history.replace('/');
    }
  }, [history, sesionStatus]);

  return (
    <ContainerLogin verticalAlign="middle">
      <Grid.Column computer={6} tablet={8} mobile={16}>
        <h1>Welcome Rider!</h1>
        <h3 style={{ marginBottom: '5rem' }}>
          Log in to proceed with the payment method.
        </h3>

        <LoginForm history={history} />

        <a
          style={{
            marginTop: '1rem',
            display: 'block',
            color: 'white',
            fontWeight: 'bold',
            marginBottom: '5rem',
          }}
          href="/auth/reset_password"
        >
          Forgot your password?
        </a>
        <Button icon labelPosition="left" onClick={handleGoToRegister}>
          <Icon name="long arrow alternate left" />
          Back to register
        </Button>
      </Grid.Column>
    </ContainerLogin>
  );
};

export default LoginScreen;
