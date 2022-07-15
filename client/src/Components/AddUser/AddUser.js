import {
  faAngleDoubleLeft,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import Axios from "axios";
import ClinicianNav from "../Navbar/ClinicianNav";
import { Link, Navigate, useNavigate } from "react-router-dom";
function AddUser() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [contactNo, setcontactNo] = useState("");
  const [picture, setpicture] = useState("");
  const [imgurl, setimgurl] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [preImg, setpreImg] = useState(
    "https://res.cloudinary.com/dlvt2lnkh/image/upload/v1656746343/emovaultClient/egj5r6ccwa0my7skdkfc.png"
  );
  const token = localStorage.getItem("token");

  const submit = () => {
    //regex
    const nameRegex = /^([a-zA-Z\s\.]{1,50})$/;
    const usernameRegex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._!-]+(?<![_.])$/;
    const numberRegex = /^([0-9]{11})$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const emailRegex = /^[\w-\._0-9]+@([\w-]+\.)+[\w-]{2,50}$/;
    if (document.getElementById("inputImage").files.length === 0) {
      document.getElementById("inputImageErr").style.display = "block";
    }
    //
    if (
      document.getElementById("clientFN").value === "" ||
      !nameRegex.test(document.getElementById("clientFN").value)
    ) {
      document.getElementById("clientFNErr").style.display = "block";
    }

    if (
      document.getElementById("clientLN").value === "" ||
      !nameRegex.test(document.getElementById("clientLN").value)
    ) {
      document.getElementById("clientLNErr").style.display = "block";
    }

    if (
      document.getElementById("clientContact").value === "" ||
      !numberRegex.test(document.getElementById("clientContact").value)
    ) {
      document.getElementById("clientContactErr").style.display = "block";
    }

    if (
      document.getElementById("clientEmail").value === "" ||
      !emailRegex.test(document.getElementById("clientEmail").value)
    ) {
      document.getElementById("clientEmailErr").style.display = "block";
    }

    if (
      document.getElementById("clientUsername").value === "" ||
      !usernameRegex.test(document.getElementById("clientUsername").value)
    ) {
      document.getElementById("clientUsernameErr").style.display = "block";
    }

    if (
      document.getElementById("clientPass").value === "" ||
      !passRegex.test(document.getElementById("clientPass").value)
    ) {
      document.getElementById("clientPassErr").style.display = "block";
    }

    if (
      document.getElementById("inputImage").files.length === 1 &&
      nameRegex.test(document.getElementById("clientFN").value) &&
      nameRegex.test(document.getElementById("clientLN").value) &&
      numberRegex.test(document.getElementById("clientContact").value) &&
      emailRegex.test(document.getElementById("clientEmail").value) &&
      usernameRegex.test(document.getElementById("clientUsername").value) &&
      passRegex.test(document.getElementById("clientPass").value)
    ) {
      setIsVisible(true);
      const formData = new FormData();
      formData.append("file", picture);
      formData.append("upload_preset", "emovaultClient");
      console.log(picture);
      Axios.defaults.withCredentials = false;
      Axios.post(
        "https://api.cloudinary.com/v1_1/dlvt2lnkh/image/upload",
        formData
      )
        .then((response) => {
          console.log(response);
          console.log(response.data.secure_url);
          setimgurl(response.data.secure_url);
          Axios.defaults.withCredentials = true;

          Axios.post(
            "/api/users/patient?token=${token}",
            {
              token: token,
              firstName: firstName,
              lastName: lastName,
              contactNo: contactNo,
              email: email,
              picture: response.data.secure_url,
              username: username,
              password: password,
            }
          )
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const up = () => {
    document.getElementById("clientPassErr").style.display = "none";
    document.getElementById("clientUsernameErr").style.display = "none";
    document.getElementById("clientContactErr").style.display = "none";
    document.getElementById("clientEmailErr").style.display = "none";
    document.getElementById("clientLNErr").style.display = "none";
    document.getElementById("clientFNErr").style.display = "none";
    document.getElementById("inputImageErr").style.display = "none";
  };
  const navigate = useNavigate();
  const back = () => {
    navigate("/UserManagement");
    window.location.reload();
  };
  return (
    <div>
      <ClinicianNav />
      <div
        className="updateClientBg"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div
          className="updateClientIn"
          style={{ padding: "50px", width: "500px" }}
        >
          <center>
            <img
              className="mb-3"
              src={window.location.origin + "/yehey2.svg"}
              alt="trash"
              style={{
                width: "200px",
                align: "center",
              }}
            />
          </center>
          <Row>
            <h2 className="fw-bold text-center mb-2">Yehey!</h2>
            <p className="text-center mb-4">Account Created Successfully</p>
          </Row>

          <Row>
            <Button
              style={{
                width: "100%",
                background: "var(--dvio)",
                borderColor: "var(--dvio)",
                outline: "none",
                boxShadow: "none",
              }}
              as={Link}
              to={"/ClinicianClients"}
            >
              Home
            </Button>
          </Row>
        </div>
      </div>
      <div className="adduser-tb-bg">
        <div className="adduser-tb-in">
          <Form.Group>
            <Row>
              <Col>
                <h1 className="fw-bold">Add New User</h1>
              </Col>
              <Col>
                <Form.Group className="back-cont">
                  <Form.Label
                    className="text-right mb-2 um-back-btn"
                    onClick={back}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      border: "none",
                      padding: "2%",
                    }}
                  >
                    <FontAwesomeIcon
                      id="left-arrow"
                      icon={faAngleDoubleLeft}
                    ></FontAwesomeIcon>
                    Back
                  </Form.Label>
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>
          <Form>
            <Row className="mb-4">
              <Col
                style={{
                  padding: "0",
                }}
                xs="auto"
              >
                <Image
                  style={{ width: 100, height: 100, borderRadius: 100 }}
                  src={preImg}
                />
              </Col>
              <Col style={{ margin: "auto" }}>
                <Form.Control
                  type="file"
                  id="inputImage"
                  onChange={(event) => {
                    setpicture(event.target.files[0]);
                  }}
                />
              </Col>
              <Form.Label
                className="mt-2"
                id="inputImageErr"
                style={{
                  color: "red",
                  fontWeight: "bold",
                  display: "none",
                }}
              >
                Please upload your image
              </Form.Label>
            </Row>
            <Row>
              <Col>
                <h2>Personal Information</h2>
                <Form.Group>
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        id="clientFN"
                        onClick={up}
                        type="text"
                        onChange={(event) => {
                          setfirstName(event.target.value);
                        }}
                      />
                      <Form.Label
                        className="mt-2"
                        id="clientFNErr"
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          display: "none",
                        }}
                      >
                        First Name must contain letters only
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        id="clientLN"
                        onClick={up}
                        onChange={(event) => {
                          setlastName(event.target.value);
                        }}
                      />
                      <Form.Label
                        className="mt-2"
                        id="clientLNErr"
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          display: "none",
                        }}
                      >
                        Last Name must contain letters only
                      </Form.Label>
                    </Col>
                  </Row>

                  <h2>Contact Information</h2>
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        id="clientContact"
                        type="tel"
                        onClick={up}
                        onChange={(event) => {
                          setcontactNo(event.target.value);
                        }}
                      />
                      <Form.Label
                        className="mt-2"
                        id="clientContactErr"
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          display: "none",
                        }}
                      >
                        Contact Number must contain numbers only
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        onClick={up}
                        type="email"
                        id="clientEmail"
                        onChange={(event) => {
                          setemail(event.target.value);
                        }}
                      />
                      <Form.Label
                        className="mt-2"
                        id="clientEmailErr"
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          display: "none",
                        }}
                      >
                        Please enter valid email address
                      </Form.Label>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>

              <h2>Account Information</h2>
              <Row className="mb-5">
                <Col>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    onClick={up}
                    id="clientUsername"
                    type="text"
                    onChange={(event) => {
                      setusername(event.target.value);
                    }}
                  />
                  <Form.Label
                    className="mt-2"
                    id="clientUsernameErr"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      display: "none",
                    }}
                  >
                    Please enter valid username (minimum of 8)
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label>Password</Form.Label>
                  <Form.Group style={{ display: "flex" }}>
                    <Form.Control
                      onClick={up}
                      type="password"
                      id="clientPass"
                      style={{ width: "100%" }}
                      onChange={(event) => {
                        setpassword(event.target.value);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faArrowsRotate}
                      style={{
                        background: "var(--vio)",
                        padding: "10px",
                        borderRadius: "5px",
                        color: "var(--dvio)",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                    ></FontAwesomeIcon>
                  </Form.Group>
                  <Form.Label
                    className="mt-2"
                    id="clientPassErr"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      display: "none",
                    }}
                  >
                    Password should have 8-10 characters, at least one uppercase
                    letter, one lowercase letter, one number and one special
                    character
                  </Form.Label>
                </Col>
              </Row>
              <Button
                onClick={submit}
                style={{
                  width: "100%",
                  color: "var(--dvio)",
                  background: "var(--vio)",
                  border: "none",
                }}
              >
                Create Account
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
