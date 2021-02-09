import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Card, Image } from 'semantic-ui-react';
import styled from "styled-components";

type CardProps = {
  icon: string;
  title: string | number;
  subtitle: string;
  loading: boolean;
};

const ContainerCard = styled(Card)`
  border-radius: 10px !important;
  box-shadow: 2px 2px 30px 0 rgba(0, 0, 0, 0.05) !important;
  background-color: #ffffff;
  font-family: Poppins;
  flex-direction: row !important;
  min-height: 142px !important;
  width: 100% !important;
  .header {
    font-size: 2em !important;
    font-weight: 600 !important;
    line-height: 1.46 !important;
    letter-spacing: 0.51px !important;
    color: #1270e3 !important;
    margin-bottom: 7px;
  }
  .meta {
    font-size: 14px !important;
    font-weight: 500 !important;
    line-height: 1.14 !important;
    letter-spacing: 0.3px !important;
    color: #a6a6a6 !important;
  }
  .image {
    background: none !important;
    padding: 1em !important;
    display: flex !important;
    align-items: flex-end;
    img {
      max-width: 58px;
      max-height: 58px;
    }
  }
`;

const DefaultCard = ( props: CardProps ) => {
  const {icon, title, subtitle, loading} = props;
  return (
    <ContainerCard style={{ marginBottom: '1em' }}>
      <Card.Content>
        <Card.Header>
          { loading ? <Skeleton height="26px" /> : title}
        </Card.Header>
        {subtitle.split(' ').map((word, index) => <Card.Meta key={index}>{word}</Card.Meta>)}
      </Card.Content>
      <Image src={icon} wrapped ui={false} />
    </ContainerCard>
  );
};

export default DefaultCard;