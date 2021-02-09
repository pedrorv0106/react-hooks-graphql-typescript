import React, { FormEvent, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../actions';
import useForm from '../../../../Hooks/useForm';
import { endRecoveryPassword } from '../../helpers/amplify';

import Input from '../../../../Components/Forms/Input';
import Password from '../../../../Components/Forms/Password';
import Button from '../../../../Components/Buttons/index';
import {
  singleError,
  singleWarning,
  singleSuccess,
} from '../../helpers/sweetAlert';

export interface ResePasswordFormProps {
  email: string;
}

const ChangePasswordForm = ({ email }: ResePasswordFormProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formValues, handleInputChange]: any = useForm({
    code: '',
    password: '',
    confirmPassword: '',
  });
  const { code, password, confirmPassword } = formValues;

  const isFormValid = () => {
    if (code === '') {
      singleWarning('Please enter a code');
      return false;
    }
    if (password !== confirmPassword) {
      singleError('Passwords must match');
      return false;
    }
    if (password === '') {
      singleWarning('Please enter a password');
      return false;
    }
    if (password.length < 5) {
      singleError('Passwords must contain a minimum of 5 characters');
      return false;
    }
    return true;
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      setLoading(true);
      const res: any = await endRecoveryPassword(email, code, password);
      setLoading(false);
      if (res?.error) {
        if (res.error.code === 'CodeMismatchException') {
          return singleError('Invalid verification code provided');
        }
        return console.log('[Error]', res.error);
      }
      singleSuccess('Password change has been successful');
      dispatch(resetPassword(email));
    }
    return null;
  };

  return (
    <Form
      style={{ maxWidth: '280px' }}
      onSubmit={(e: FormEvent) => handleResetPassword(e)}
    >
      <Form.Field>
        <Input
          color="white"
          label="Code"
          type="text"
          name="code"
          value={code}
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

      <Form.Field>
        <Password
          value={confirmPassword}
          onChange={handleInputChange}
          label="Confirm Password"
          name="confirmPassword"
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
        Change Password
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;
