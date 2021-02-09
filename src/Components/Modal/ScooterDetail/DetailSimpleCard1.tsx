import React from 'react';
import { Card } from 'semantic-ui-react';
import styled from "styled-components";

type CardProps = {
  title: string;
  subtitle: string;
  value: string;
  isMoney: boolean;
};

const ContainerCard = styled(Card)`
  border-radius: 12px !important;
  background-color: #f5f5fb !important;
  min-height: 90px !important;
  width: 100% !important;
  padding: 8px 15px !important;
  flex-direction: row !important;
  justify-content: space-around;
  box-shadow: none !important;
  .card-title {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.17;
    color: #1270e3;
    width: 50px;
  }
  .card-content {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex: 1;
    .value {
      font-size: 20px;
      font-weight: bold;
      line-height: 0.7;
      color: #42474b;
    }
    .green {
      color: #29c78a;
    }
    .sub-title {
      font-size: 12px;
      font-weight: bold;
      line-height: 0.7;
      color: #42474b;
      margin-left: 10px;
    }
  }
`;

const DefaultSimpleCard1 = ( props: CardProps ) => {
  const {title, subtitle, value, isMoney} = props;
  return (
    <ContainerCard>
      <div className="card-title">{title}</div>
      <div className="card-content">
        <div className={isMoney ? 'value green' : 'value'}>{value}</div>
        <div className="sub-title">{subtitle}</div>
      </div>
    </ContainerCard>
  );
};

export default DefaultSimpleCard1;