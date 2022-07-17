import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
function ForgotPassword() {
  const navigate = useNavigate();
  const click = () => {
    navigate("/NewPass");
  };
  return (
    <div className="login-bg">
      <Form className="login-form">
        <Form.Group className="mb-3">
          <Form.Label
            as="h2"
            className="fw-bold"
            style={{ color: "var(--dblue)" }}
          >
            Forgot Password
          </Form.Label>
          <Form.Label>Enter your email address</Form.Label>
          <Form.Control
            className="mb-2"
            type="text"
            id="userEmail"
            placeholder="Enter Email"
          />
        </Form.Group>
        <Button id="login_btn" className="mt-2" onClick={click}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ForgotPassword;
