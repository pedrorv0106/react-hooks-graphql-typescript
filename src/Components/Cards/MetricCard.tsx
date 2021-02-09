import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import styled from 'styled-components';

type CardProps = {
  image: string;
  icon: string;
  title: string;
  color: string;
  subImage: string;
  type: Number;
  onClick: Function;
};

const ContainerCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 2px 2px 30px 0 rgba(0, 0, 0, 0.05);
  font-family: Poppins;
  min-height: 257px !important;
  background-image: url(${(props) => props.background}) !important;
  width: auto !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  flex-direction: row !important;
  padding: ${(props) => (props.type === 1 ? 10 : 20)}px !important;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .content::after {
    display: none !important;
  }
  .header {
    font-size: ${(props) => (props.type === 1 ? 30 : 39)}px !important;
    font-weight: 600 !important;
    line-height: ${(props) => (props.type === 1 ? 1 : 1.15)} !important;
    color: ${(props) => props.subcolor} !important;
  }
  .sub-image-1 {
    background: none !important;
    width: 250px !important;
    display: flex !important;
    align-items: flex-end !important;
    margin-right: 150px;
  }
  .sub-image-2 {
    background: none !important;
    display: flex !important;
    align-items: flex-end !important;
    width: 450px !important;
  }
`;

const ImageScaled = styled(Image)`
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    transform: scale(1.015);
  }
`;

const MetricCard = (props: CardProps) => {
  const { icon, title, image, color, subImage, type, onClick } = props;
  return (
    <ContainerCard background={image} subcolor={color} type={type}>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <ImageScaled src={icon} wrapped ui={false} onClick={onClick} />
      </Card.Content>
      <Image
        className={`sub-image-${type}`}
        src={subImage}
        wrapped
        ui={false}
      />
    </ContainerCard>
  );
};

export default MetricCard;
