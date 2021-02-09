import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

type RoutePrivate = {
  isAutenticated: boolean;
  component: any;
  exact?: boolean;
  path?: string;
};

const PrivateRoute = ({
  isAutenticated,
  component: Component,
  path,
  exact,
}: RoutePrivate) => {
  return (
    <Route
      path={path}
      exact={exact}
      component={({ history, location, match }: RouteComponentProps) =>
        isAutenticated ? (
          <Component history={history} location={location} match={match} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
};

PrivateRoute.defaultProps = {
  exact: true,
  path: '',
};

PrivateRoute.propTypes = {
  isAutenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
