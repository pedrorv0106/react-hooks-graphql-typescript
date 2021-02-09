import React from 'react';
import styled from 'styled-components';
import { Grid, Icon } from 'semantic-ui-react';
import { requestCode } from '../../helpers/amplify';
import Button from '../../../../Components/Buttons/index';
import VerifyEmailForm from './VerifyEmailForm';
import backgroundImageDark from '../../Resources/Images/bg_2_register_view.png';
import backgroundStars from '../../Resources/Images/bg_1_register_view.png';
import { singleSuccess } from '../../helpers/sweetAlert';

interface VerifyEmailProps {
  location: any;
  history: any;
}

const ContainerVerifyEmail = styled(Grid)`
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

const VerifyEmailScreen = ({ location, history }: VerifyEmailProps) => {
  const { email } = location.state;
  const handleGoToLogin = () => {
    history.push('/auth/login');
  };

  const tryAgain = async () => {
    const { CodeDeliveryDetails } = await requestCode(email);
    const { Destination } = CodeDeliveryDetails;
    singleSuccess(`Code forwarded to ${Destination}`, 5);
  };

  return (
    <ContainerVerifyEmail>
      <Grid.Column computer={6} tablet={8} mobile={16}>
        <h1>Hello Rider!</h1>
        <h3 style={{ marginBottom: '5rem' }}>
          Enter the code that we send you to the email.
        </h3>
        <VerifyEmailForm email={email} history={history} />
        <button
          type="button"
          style={{
            boxShadow: 'none',
            marginTop: '2rem',
            display: 'block',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
          onClick={tryAgain}
        >
          Try again?
        </button>
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
    </ContainerVerifyEmail>
  );
};

export default VerifyEmailScreen;
