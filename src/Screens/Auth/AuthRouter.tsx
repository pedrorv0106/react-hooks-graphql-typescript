import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginScreen from './Views/Login/LoginScreen';
import RegisterScreen from './Views/Register/RegisterScreen';
import ResetPasswordScreen from './Views/ResetPassword/ResetPasswordScreen';
import VerifyEmailScreen from './Views/VerifyEmail/VerifyEmailScreen';

const AuthRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/auth/login" component={LoginScreen} />

        <Route exact path="/auth/register" component={RegisterScreen} />

        <Route exact path="/auth/verify_email" component={VerifyEmailScreen} />

        <Route
          exact
          path="/auth/reset_password"
          component={ResetPasswordScreen}
        />

        <Redirect to="/auth/register" />
      </Switch>
    </div>
  );
};

export default AuthRouter;
