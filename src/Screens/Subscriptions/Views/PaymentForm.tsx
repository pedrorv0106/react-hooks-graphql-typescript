import PropTypes from "prop-types";
import styled from "styled-components";

const PaymentForm = styled.form`
  background-color: white;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 350px;
  border-radius: 8px;
  padding: 20px;
`;

PaymentForm.propTypes = { children: PropTypes.node };

export default PaymentForm;
