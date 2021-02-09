import React from 'react';
import { Button, Container, Icon } from 'semantic-ui-react';
import styled from "styled-components";

type ButtonProps = {
  rightPanel: React.ReactNode;
  setVisible: Function;
};

const ContainerFragment = styled(Container)`
  width: 100% !important;
  padding: 7px 0;
  .filter-button {
    border-radius: 3px;
    background-color: #ffffff;
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.05);
    color: #1270e3;
  }
  .filter-button:focus, .filter-button:hover, .filter-button:active {
    background-color: #ffffff;
    color: #1270e3;
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.05);
  }
`;

const FilterButton = ( props: ButtonProps ) => {
  const { setVisible } = props;
  
  return (
    <ContainerFragment>
      <Button onClick={() => {setVisible(true)}} className="filter-button">
        Filter
        <Icon name="filter"/>
      </Button>
      {props.rightPanel}
    </ContainerFragment>
  );
};

export default FilterButton;