import React, { FormEvent, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import { login } from '../../actions';
import { startLogin } from '../../helpers/amplify';

import Input from '../../../../Components/Forms/Input';
import Password from '../../../../Components/Forms/Password';
import Button from '../../../../Components/Buttons/index';
import {
  singleError,
  singleWarning,
  singleInfo,
} from '../../helpers/sweetAlert';
import useForm from '../../../../Hooks/useForm';

export interface LoginFormProps {
  history: any;
}

const LoginForm = ({ history }: LoginFormProps): any => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formValues, handleInputChange]: any = useForm({
    email: '',
    password: '',
  });
  const { email, password } = formValues;

  const verifyEmail = () => history.push('/auth/verify_email', { email });

  const resetPasswordRequired = () =>
    history.push('/auth/reset_password', { email });

  const isFormValid = () => {
    if (email === '') {
      singleWarning('Please enter an Email');
      return false;
    }
    if (!validator.isEmail(email)) {
      singleError('Invalid mail format');
      return false;
    }
    if (password === '') {
      singleWarning('Please enter a password');
      return false;
    }
    if (password.length < 5) {
      singleError('Password must contain a minimum of 5 characters');
      return false;
    }
    return true;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      setLoading(true);
      const { attributes, error } = await startLogin({ email, password });
      setLoading(false);
      if (error) {
        // eslint-disable-next-line no-console
        console.log('[Error Login]', error);
        if (error.code === 'UserNotFoundException') {
          return singleError('User not found');
        }
        if (error.code === 'UserNotConfirmedException') {
          return verifyEmail();
        }
        if (error.code === 'NotAuthorizedException') {
          return singleError('Incorrect username or password');
        }
        if (error.code === 'PasswordResetRequiredException') {
          resetPasswordRequired();
          return singleInfo('Password reset required for the user');
        }
        return singleError(
          'It has not been possible to log in, contact support'
        );
      }
      if (attributes) {
        const {
          given_name: GivenName,
          family_name: familyName,
          sub,
        } = attributes;
        const userName = `${GivenName} ${familyName}`;
        const uuid = attributes['custom:uuid'] || sub;
        dispatch(login(uuid, userName, email));
      }
    }
    return null;
  };

  return (
    <Form
      style={{ maxWidth: '280px' }}
      onSubmit={(e: FormEvent) => handleLogin(e)}
    >
      <Form.Field>
        <Input
          color="white"
          label="Email"
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
      </Form.Field>

      <Form.Field>
        <Password
          value={password}
          onChange={handleInputChange}
          label="Password"
          name="password"
        />
      </Form.Field>

      <Button
        style={{ marginTop: 30 }}
        primary
        type="submit"
        disabled={loading}
        loading={loading}
        fluid
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
