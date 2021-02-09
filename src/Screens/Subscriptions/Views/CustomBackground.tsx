import styled from "styled-components";
import PropTypes from "prop-types";

const CustomBackground = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5fb;
  position: fixed;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 3rem;
  min-height: 100%;
  min-width: 100%;
`;

CustomBackground.propTypes = { children: PropTypes.node };

export default CustomBackground;
