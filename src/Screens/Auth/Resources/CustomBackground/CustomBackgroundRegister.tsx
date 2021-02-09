import styled from "styled-components";
import PropTypes from "prop-types";
import bagroundImage from "../Images/bg_1_register_view.png";
// import bagroundImageDark from "../Images/bg_2_register_view.png";

const CustomBackgroundRegister = styled.div`
  /* background-image: url(https://i.pinimg.com/originals/22/df/03/22df0390c03d80cab2be412dcbd93b75.jpg); */
  /* background: image("../../Resources/bg_1_register_view.png"); */
  background-image: url(${bagroundImage});
  /* background-image: url(${bagroundImage}); */
  /* background-image: linear-gradient(red, yellow, green); */
  background-repeat: no-repeat;
  display: flex;
  position: fixed;
  background-size: cover;
  /* background-position: enter; */
  justify-content: center;
  align-items: center;
  min-height: 100%;
  min-width: 100%;
`;

CustomBackgroundRegister.propTypes = { children: PropTypes.node };

// const DivStyled = (component) => {
//     console.log(component);

//     return (
//         <StyledBackground >

//         </StyledBackground>
//     )
// };

export default CustomBackgroundRegister;
