import React, { FormEvent, useState } from 'react';
import { Form } from 'semantic-ui-react';
import validator from 'validator';
import useForm from '../../../../Hooks/useForm';
import { startRecoveryPassword } from '../../helpers/amplify';

import Input from '../../../../Components/Forms/Input';
import Button from '../../../../Components/Buttons/index';
import { singleError, singleWarning } from '../../helpers/sweetAlert';

export interface ResePasswordFormProps {
  emailSent: (sent: string) => void;
}

const ResetPasswordForm = ({ emailSent }: ResePasswordFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formValues, handleInputChange]: any = useForm({
    email: '',
  });
  const { email } = formValues;

  const isFormValid = () => {
    if (email === '') {
      singleWarning('Please enter an Email');
      return false;
    }
    if (!validator.isEmail(email)) {
      singleError('Invalid mail format');
      return false;
    }
    return true;
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      setLoading(true);
      const { error } = await startRecoveryPassword({ email });
      setLoading(false);
      if (error) {
        console.log(error);
        if (error.code === 'UserNotFoundException') {
          return singleError('User not found');
        }
        if (error.code === 'LimitExceededException') {
          return singleError(
            'Attempt limit exceeded, please try after some time'
          );
        }
        return singleError('Verification code could not be sent');
      }
      emailSent(email);
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
          label="Email"
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
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
        Send Code
      </Button>
    </Form>
  );
};

export default ResetPasswordForm;
