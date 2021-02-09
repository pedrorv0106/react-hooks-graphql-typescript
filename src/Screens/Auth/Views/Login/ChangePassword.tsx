import React from "react";
import { Button, Input } from "semantic-ui-react";
import styled from "styled-components";
import "../../style.less";

const ChangePassword = styled.body`
  background: transparent;
  border-radius: 8px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0px;
  width: 300px;
  padding: 30px;
  text-align: center;
`;

const ChangePasswordPopup = () => {
  const handleGetCode = () => {};
  return (
    <ChangePassword>
      <body>
        <h3>Reset your password</h3>
        <h4>
          Enter your email address and we will send you a confirmation code
        </h4>
        <Input
          icon="mail"
          style={{ width: "100%", marginTop: "10px" }}
          iconPosition="left"
          placeholder="Email"
        />
        <Button
          primary
          style={{
            marginTop: 20,
            marginBottom: 10,
            width: "100%",
          }}
          onClick={handleGetCode}
        >
          Get code
        </Button>
      </body>
    </ChangePassword>
  );
};

export default ChangePasswordPopup;
