import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import GraphProvider from '../graphql.init';

import AuthRouter from '../Screens/Auth/AuthRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { closeSesionStatus, login } from '../Screens/Auth/actions';

// Components - Views
import HomeLoader from '../Components/Loader/Home';
// import HomeScreen from '../Home/Views/Home';
import NavigationDrawer from '../Components/NavigationDrawer';
import SubscriptionsScreen from '../Screens/Subscriptions/Views/Subscriptions';
import MyFleetScreen from '../Screens/MyFleet/Views/MyFleet';
import MetricScreen from '../Screens/Home/Views/Metrics';
import HomeScreen from '../Screens/Home/Views/Home';

interface State {
  auth: any;
}

const AppRouter = () => {
  const dispatch = useDispatch();
  const { sesionStatus } = useSelector((state: State) => state.auth);

  const [isChecking, setisChecking] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    Auth.currentUserInfo()
      .then((userInfo) => {
        if (userInfo) {
          setisLoggedIn(true);
          const { attributes } = userInfo;

          const {
            sub,
            given_name: givenName,
            family_name: familyName,
            email,
          } = attributes;
          const uuid = attributes['custom:uuid'] || sub;
          const name = `${givenName} ${familyName}`;
          dispatch(login(uuid, name, email));
        }
        setisChecking(false);
      })
      .catch(() => {
        setisChecking(false);
        setisLoggedIn(false);
        dispatch(closeSesionStatus());
      });
  }, [setisLoggedIn, dispatch]);

  useEffect(() => {
    setisLoggedIn(sesionStatus || false);
  }, [sesionStatus]);

  if (isChecking) {
    return <HomeLoader />;
  }

  return (
    <Router>
      <Switch>
        <PublicRoute
          isAutenticated={isLoggedIn}
          path="/auth"
          component={AuthRouter}
        />
        {/* PRIVATE ROUTES */}
        <GraphProvider>
          <NavigationDrawer>
            <PrivateRoute
              exact
              isAutenticated={isLoggedIn}
              path="/"
              component={MetricScreen}
            />

            <PrivateRoute
              exact
              isAutenticated={isLoggedIn}
              path="/home"
              component={HomeScreen}
            />

            <PrivateRoute
              isAutenticated={isLoggedIn}
              path="/my-fleet"
              component={MyFleetScreen}
            />

            <PrivateRoute
              exact
              isAutenticated={isLoggedIn}
              path="/billing"
              component={SubscriptionsScreen}
            />
          </NavigationDrawer>
        </GraphProvider>
        <Redirect to="/auth" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
