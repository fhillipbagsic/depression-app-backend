import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";

function Login() {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const submit_login = () => {
    const userEmail = document.getElementById("userEmail").value;
    const userPass = document.getElementById("userEmail").value;

    localStorage.setItem("user", userEmail);
    Axios.post("/api/auth/login", {
      email: email,
      password: password,
    })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        console.log(response.data.token);
        if (response.data.role === "Clinician") {
          navigate("/ClinicianClients");
        }
        if (response.data.role === "Patient") {
          navigate("/DatePick");
        }
        if (response.data.role === "Admin") {
          navigate("/ClinicianList");
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setErrMsg(error.response.data.message);
        document.getElementById("errorMsg").style.display = "block";
      });
  };
  const up = () => {
    document.getElementById("errorMsg").style.display = "none";
  };
  return (
    <div className="login-bg">
      <Form className="login-form">
        <Form.Group className="mb-3 text-center ">
          <img
            src={process.env.PUBLIC_URL + "/client.png"}
            alt=""
            style={{ width: "100px", marginBottom: "5px" }}
          />
          <Form.Label
            as="h2"
            className="fw-bold"
            style={{ color: "var(--dblue)" }}
          >
            Welcome to Emovault
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
          {/* <Form.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget
            totor lacus, mi morbi egestas suscipit.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="mb-2"
            type="text"
            id="userEmail"
            placeholder="Enter Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            onClick={up}
          />
          <Form.Text id="emailErr" style={{ color: "red", display: "none" }}>
            Email is required
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="userPass"
            className="mb-2"
            type="password"
            placeholder="Enter password"
            onClick={up}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Form.Text id="passErr" style={{ color: "red", display: "none" }}>
            Password is required
          </Form.Text>
        </Form.Group>
        <Button id="login_btn" className="mt-2" onClick={submit_login}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
