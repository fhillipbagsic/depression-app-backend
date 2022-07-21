import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import React, { useState } from "react";
function NewPass() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setpassword] = useState("");
  const submitPass = () => {
    Axios.post(`/api/auth/changenewpassword`, {
      token: token,
      newPassword: password,
    }).then((response) => {
      alert("Password successfully changed");
      navigate("/Login");
    });
  };
  return (
    <div
      className="login-bg"
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#d3f8ff",
      }}
    >
      <Form
        className="login-form"
        style={{
          background: "#fff",
          padding: "50px",
          maxWidth: "500px",
          borderRadius: "10px",
          display: "inline-block",
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label as="h2" className="fw-bold" style={{ color: "#03aacc" }}>
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
            onChange={(event) => {
              setpassword(event.target.value);
            }}
          />
        </Form.Group>
        <Button
          id="login_btn"
          className="mt-2"
          onClick={submitPass}
          style={{ background: "#61dafb", width: "100%", color: "white" }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default NewPass;
