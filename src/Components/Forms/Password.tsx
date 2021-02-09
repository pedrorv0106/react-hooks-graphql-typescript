import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import Input from './Input';

const InputPassword = (props: any) => {
  const [showPassword, SetShowPassword] = useState(false);
  const iconEye = showPassword ? 'eye slash' : 'eye';
  return (
    <Input
      icon={
        <Icon
          style={{ fontSize: '1.4rem' }}
          name={iconEye}
          link
          onClick={() => SetShowPassword(!showPassword)}
        />
      }
      color="white"
      type={showPassword ? 'text' : 'password'}
      {...props}
    />
  );
};

export default InputPassword;
