import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Icon, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import Colors from '../../../Styles/colors';

const HoverableText = styled.h3`
  color: #b2b2cc;
  font-family: Poppins;
  font-weight: 500;
  font-size: 1.2rem;
  text-align: justify;
  transition: 0.3s ease;
  padding: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;

  &.active {
    color: ${Colors.primary};
    border-right: 3px solid ${Colors.primary};
  }
`;

const NavItem = ({ label, icon, iconUrl, active = false, path }: any) => {
  return (
    <Link to={path}>
      <Grid style={{ margin: 'auto', width: '100%' }}>
        <Grid.Row columns={2}>
          <Grid.Column width="6">
            {icon && <Icon name={icon} size="small" />}
            {!icon && iconUrl && (
              <Image
                src={iconUrl}
                style={{ width: '20px', marginLeft: 'auto', marginTop: '0.5rem' }}
                alt={`${label} logo`}
              />
            )}
          </Grid.Column>
          <Grid.Column width="10" style={{ paddingRight: '0' }}>
            <HoverableText className={active && 'active'}>
              {label}
            </HoverableText>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Link>
  );
};

export default NavItem;
