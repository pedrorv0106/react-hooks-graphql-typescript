import React, { FormEvent, useState } from 'react';
import { Form } from 'semantic-ui-react';
import validator from 'validator';
import styled from 'styled-components';
import { startRegister } from '../../helpers/amplify';
import Password from '../../../../Components/Forms/Password';

import Input from '../../../../Components/Forms/Input';
import Button from '../../../../Components/Buttons/index';
import useForm from '../../../../Hooks/useForm';
import {
  singleError,
  singleWarning,
  successMessage,
} from '../../helpers/sweetAlert';

const FormContainer = styled.div`
  border-radius: 10px;
  box-shadow: 2px 2px 15px 0 rgba(0, 0, 0, 0.05);
  padding: 2rem;
  background: white;
`;

export interface RegisterFormProps {
  history: any;
}

const RegisterForm = ({ history }: RegisterFormProps) => {
  const [loading, setLoading] = useState(false);

  const [formValues, handleInputChange]: any = useForm({
    email: '',
    password: '',
    givenName: '',
    familyName: '',
    country: '',
    address: '',
    city: '',
    phoneNumber: '',
    indicative: '',
  });

  const {
    email,
    password,
    givenName,
    familyName,
    country,
    address,
    city,
    phoneNumber,
    indicative,
  } = formValues;

  const verifyEmail = () => history.push('/auth/verify_email', { email });

  const attributes = {
    email,
    given_name: givenName,
    family_name: familyName,
    address,
    'custom:indicative': indicative,
    phone_number: indicative + phoneNumber,
  };

  const userInfo = {
    email,
    password,
    givenName,
    familyName,
    country,
    address,
    city,
    phoneNumber,
    indicative,
  };

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
    if (givenName === '') {
      singleWarning('Please enter a name');
      return false;
    }
    if (familyName === '') {
      singleWarning('Please enter a last name');
      return false;
    }
    if (country === '') {
      singleWarning('Please enter a country');
      return false;
    }
    if (address === '') {
      singleWarning('Please enter an address');
      return false;
    }
    if (city === '') {
      singleWarning('Please enter a city');
      return false;
    }
    if (indicative === '') {
      singleWarning('Please enter an indicative');
      return false;
    }
    if (phoneNumber === '') {
      singleWarning('Please enter a phone number');
      return false;
    }
    return true;
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      setLoading(true);
      const { error }: any = await startRegister({
        userInfo,
        attributes,
      });
      setLoading(false);
      if (error) {
        singleError(error?.message);
        return;
      }
      successMessage(
        'Registration completed successfully',
        'To activate your account check your email and confirm your registration'
      ).then((res: any) => {
        if (res.isConfirmed) {
          verifyEmail();
        }
      });
    }
  };

  return (
    <FormContainer>
      <Form
        size="tiny"
        key="tiny"
        unstackable
        onSubmit={(e: FormEvent) => handleRegister(e)}
      >
        <Form.Group widths="equal">
          <Input
            color="#3b3b3b"
            background="#f7f7f7"
            name="email"
            label="Email"
            value={email}
            onChange={handleInputChange}
          />

          <Form.Field>
            <Password
              color="#3b3b3b"
              background="#f7f7f7"
              value={password}
              onChange={handleInputChange}
              label="Password"
              name="password"
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Input
            color="#3b3b3b"
            background="#f7f7f7"
            name="givenName"
            label="First name"
            autoComplete="off"
            value={givenName}
            onChange={handleInputChange}
          />
          <Input
            color="#3b3b3b"
            background="#f7f7f7"
            name="familyName"
            autoComplete="off"
            value={familyName}
            onChange={handleInputChange}
            label="Last name"
          />
        </Form.Group>
        <Input
          color="#3b3b3b"
          background="#f7f7f7"
          label="Country"
          type="text"
          name="country"
          value={country}
          autoComplete="off"
          onChange={handleInputChange}
        />
        <Input
          color="#3b3b3b"
          background="#f7f7f7"
          label="Street address"
          type="text"
          name="address"
          value={address}
          autoComplete="off"
          onChange={handleInputChange}
        />
        <Input
          color="#3b3b3b"
          background="#f7f7f7"
          label="Town / City"
          type="text"
          name="city"
          value={city}
          autoComplete="off"
          onChange={handleInputChange}
        />

        <Form.Group>
          <Input
            color="#3b3b3b"
            background="#f7f7f7"
            width={3}
            label="Indicative"
            type="text"
            name="indicative"
            value={indicative}
            autoComplete="off"
            onChange={handleInputChange}
          />
          <Input
            color="#3b3b3b"
            background="#f7f7f7"
            width={13}
            type="text"
            label=" Phone "
            name="phoneNumber"
            value={phoneNumber}
            autoComplete="off"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button
          style={{ marginTop: 30, width: '100%' }}
          type="submit"
          primary
          loading={loading}
          disabled={loading}
        >
          Register
        </Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;
