import React from 'react';
import { FormInput, FormInputProps } from 'semantic-ui-react';
import styled from 'styled-components';
import colors from '../../Styles/colors';

export interface InputProps extends FormInputProps {
  background?: string;
  color?: string;
  border?: string;
}

const Input = styled(FormInput)<InputProps>`
  &&& label {
    font-weight: normal;
    font-size: 14px;
    color: ${(props) => props.color || 'black'};
  }
  &&& input {
    font-family: 'Poppins';
    font-size: 14px;
    background-color: ${({ background }) => background || 'white'};
    border-radius: 10px;
    border: ${({ border }) => (border ? `1px solid ${border}` : 'none')};
    height: 55px;
  }
  &&& input:focus {
    border: 1px solid ${colors.primary};
    border-radius: 10px;
  }
`;

export const InputLight = (props: InputProps) => (
  <Input {...props} background={colors.backgroundInput} color={colors.gray} />
);

export default Input;
