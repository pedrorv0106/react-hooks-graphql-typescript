import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dimmer, Icon, Loader } from 'semantic-ui-react';
import { logout } from '../../Auth/actions';
import { startLogout } from '../../Auth/helpers/amplify';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.auth);

  const handleLogout = async () => {
    await startLogout();
    dispatch(logout());
  };

  return (
    <div className="ui segment">
      <h2 className="ui center aligned icon header">
        <i className="circular chess icon" />
        COSMIC DASHBOARD
      </h2>

      <Button
        style={{ marginTop: 50, marginBottom: 30 }}
        basic
        color="blue"
        icon
        labelPosition="left"
        onClick={handleLogout}
        disabled={loading}
        loading={loading}
      >
        <Icon name="share square outline" />
        Logout
      </Button>
      <Dimmer>
        <Loader indeterminate />
      </Dimmer>
    </div>
  );
};

export default HomeScreen;
