import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
function ForgotPassword() {
  const [email, setemail] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const click = () => {
    Axios.post("/api/auth/sendchangepasswordurl", {
      email: email,
    })
      .then((response) => {
        console.log(response.data);
        alert("Please check your email address for password reset");
      })
      .catch((error) => {
        console.log(error.data.message);
        setErrMsg(error.data.message);
        document.getElementById("errorMsg").style.display = "block";
      });
  };

  const up = () => {
    document.getElementById("errorMsg").style.display = "none";
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
          <Form.Text
            id="errorMsg"
            style={{
              background: "red",
              color: "white",
              padding: "10px",
              display: "none",
            }}
          >
            {errorMsg}
          </Form.Text>
          <Form.Label>Enter your email address</Form.Label>
          <Form.Control
            className="mb-2"
            type="text"
            id="userEmail"
            onClick={click}
            placeholder="Enter Email"
            onChange={(event) => {
              setemail(event.target.value);
            }}
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
