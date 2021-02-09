import React from "react";
import PropTypes from "prop-types";

import { Route, Redirect, RouteComponentProps } from "react-router-dom";

type RoutePrivate = {
  isAutenticated: boolean;
  component: any;
  exact?: boolean;
  path?: string;
};

const PublicRoute = ({
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
          <Redirect to="/" />
        ) : (
          <Component history={history} location={location} match={match} />
        )
      }
    />
  );
};

PublicRoute.defaultProps = {
  exact: false,
  path: "",
};

PublicRoute.propTypes = {
  isAutenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default PublicRoute;
