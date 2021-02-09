import {
  Button as BtnSemantic,
  ButtonProps as BtnPropsSemantic,
} from 'semantic-ui-react';
import styled from 'styled-components';

export interface ButtonProps extends BtnPropsSemantic {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Button = styled(BtnSemantic)<ButtonProps>`
  border-radius: 10px !important;
  height: 55px;
  font-size: 14px;
  color: ${(props) => (props.primary ? 'white' : '#1270e3')} !important;
  background-color: ${(props) =>
    props.primary ? '#1270e3' : 'white'} !important;
  i {
    background-color: white !important;
  }
`;

export default Button;
