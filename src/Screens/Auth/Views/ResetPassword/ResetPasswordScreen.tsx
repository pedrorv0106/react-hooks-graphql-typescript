import React, { useEffect, useState } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { RouteChildrenProps } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImageDark from '../../Resources/Images/bg_2_register_view.png';
import backgroundStars from '../../Resources/Images/bg_1_register_view.png';
import Button from '../../../../Components/Buttons/index';
import ResetPasswordForm from './ResetPasswordForm';
import ChangePasswordForm from './ChangePasswordForm';

const ContainerResetPassword = styled(Grid)`
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

const ResetPasswordScreen = ({ history }: RouteChildrenProps): any => {
  const { isRecoveredPassword } = useSelector((state: any) => state.auth);
  const [emailSent, setEmailSent] = useState('');
  useEffect(() => {
    if (isRecoveredPassword) {
      history.replace('/auth/login');
    }
  }, [history, isRecoveredPassword]);

  const handleGoToLogin = () => {
    history.push('/auth/login');
  };

  return (
    <ContainerResetPassword verticalAlign="middle">
      <Grid.Column computer={6} tablet={8} mobile={16}>
        <h1>Hello Rider!</h1>
        <h3 style={{ marginBottom: '5rem' }}>
          Enter your email address below and we&apos;ll send you a code to reset
          your password.
        </h3>
        {emailSent ? (
          <ChangePasswordForm email={emailSent} />
        ) : (
          <ResetPasswordForm emailSent={(e) => setEmailSent(e)} />
        )}
        <Button
          style={{ marginTop: '8rem', marginBottom: 30, maxWidth: '280px' }}
          icon
          fluid
          labelPosition="left"
          onClick={handleGoToLogin}
        >
          <Icon name="long arrow alternate left" />
          Back to login
        </Button>
      </Grid.Column>
    </ContainerResetPassword>
  );
};

export default ResetPasswordScreen;
