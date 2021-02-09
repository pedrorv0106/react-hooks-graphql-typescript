import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Form, Grid, Header, Icon } from "semantic-ui-react";
import bagroundImageDark from "../Images/bg_2_register_view.png";

const CustomBackgroundLogin = styled(Grid)`
  background-image: url(${bagroundImageDark});
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-repeat: no-repeat;
  position: relative;
  background-size: cover;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  margin: 0 !important;
  min-height: 100vh;
  min-width: 100vh;
`;

CustomBackgroundLogin.propTypes = { children: PropTypes.node };

export default CustomBackgroundLogin;
