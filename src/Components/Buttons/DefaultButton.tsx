import React from "react";
import styled from "styled-components";
import { Button } from 'semantic-ui-react';

const StyledButton = styled(Button)`
  width: 135px;
  border-radius: 13px;
`;

type ButtonProps = {
  label: string;
  color: string;
  handleClick: Function;
};

const ButtonStyled = (props: ButtonProps) => {
  const {label, handleClick, color} = props;
  const clickButton = () => {
    handleClick()
  };
  return <StyledButton color={color} onClick={clickButton}>{label}</StyledButton>;
};

export default ButtonStyled;
