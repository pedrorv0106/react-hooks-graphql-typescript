import styled from 'styled-components';
import {
  Button as BtnSemantic,
  ButtonProps as BtnPropsSemantic,
} from 'semantic-ui-react';
import Colors from '../../Styles/colors';

export interface ButtonProps extends BtnPropsSemantic {
  colorBtn?: string;
}

const ButtonClean = styled(BtnSemantic)<ButtonProps>`
  &&& {
    margin-top: 2rem;
    color: ${(props) => props.colorBtn || Colors.gray};
    background: white;
    text-align: left;
  }
`;

export default ButtonClean;
