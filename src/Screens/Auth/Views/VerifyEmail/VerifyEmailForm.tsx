import React, { FormEvent, useState } from 'react';
import { Form } from 'semantic-ui-react';
import useForm from '../../../../Hooks/useForm';
import { verifyEmail } from '../../helpers/amplify';
import { singleError, successMessage } from '../../helpers/sweetAlert';

import Input from '../../../../Components/Forms/Input';
import Button from '../../../../Components/Buttons/index';

export interface VerifyEmailFormProps {
  email: string;
  history: any;
}

const VerifyEmailForm = ({ email, history }: VerifyEmailFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formValues, handleInputChange]: any = useForm({
    code: '',
  });
  const goToLoginScreen = () => history?.push('/auth/login');
  const { code } = formValues;

  const isFormValid = () => {
    return code.length === 6;
  };

  const handleVerifyEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      setLoading(true);
      const response = await verifyEmail(email, code);
      setLoading(false);
      if (response?.error) {
        singleError(response.error.message);
        return;
      }
      successMessage('Verification completed successfully', '').then(
        (res: any) => {
          if (res.isConfirmed) {
            goToLoginScreen();
          }
        }
      );
    }
  };

  return (
    <Form
      style={{ maxWidth: '280px' }}
      onSubmit={(e: FormEvent) => handleVerifyEmail(e)}
    >
      <Form.Field>
        <Input
          color="white"
          label="Code"
          type="text"
          name="code"
          value={code}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </Form.Field>

      <Button
        style={{ marginTop: 30 }}
        primary
        type="submit"
        disabled={loading || code.length !== 6}
        loading={loading}
        fluid
      >
        Submit
      </Button>
    </Form>
  );
};

export default VerifyEmailForm;
