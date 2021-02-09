import React from 'react';
import { Card } from 'semantic-ui-react';
import styled from "styled-components";

type CardProps = {
  title: string;
  value: string;
};

const ContainerCard = styled(Card)`
  border-radius: 12px !important;
  background-color: #f5f5fb !important;
  min-height: 70px !important;
  width: 100% !important;
  padding: 13px !important;
  box-shadow: none !important;
  .card-title {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.17;
    color: #1270e3;
    flex: 1;
    display: flex;
    align-items: flex-end;
  }
  .card-value {
    font-size: 20px;
    font-weight: bold;
    line-height: 0.7;
    color: #42474b;
    flex: 1;
  }
`;

const DefaultSimpleCard2 = ( props: CardProps ) => {
  const {title, value} = props;
  return (
    <ContainerCard>
      <div className="card-value">{value}</div>
      <div className="card-title">{title}</div>
    </ContainerCard>
  );
};

export default DefaultSimpleCard2;