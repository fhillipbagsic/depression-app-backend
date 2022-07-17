import React from "react";
import { Form, Button } from "react-bootstrap";
function NewPass() {
  return (
    <div className="login-bg">
      <Form className="login-form">
        <Form.Group className="mb-3">
          <Form.Label
            as="h2"
            className="fw-bold"
            style={{ color: "var(--dblue)" }}
          >
            Reset Password
          </Form.Label>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            className="mb-2"
            type="text"
            id="userEmail"
            placeholder="Enter New Password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            id="userPass"
            className="mb-2"
            type="password"
            placeholder="Enter confirm password"
          />
        </Form.Group>
        <Button id="login_btn" className="mt-2">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default NewPass;
