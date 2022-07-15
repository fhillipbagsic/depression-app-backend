import {
  faAngleDoubleLeft,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ClinicianNav from "../Navbar/ClinicianNav";
function UpdateUser() {
  const [patientEmail, setpatientEmail] = useState("");
  const [patientFirstName, setpatientFirstName] = useState("");
  const [patientLastName, setpatientLastName] = useState("");
  const [patientContactNo, setpatientContactNo] = useState("");
  const [patientUsername, setpatientUsername] = useState("");
  const [patientPass, setpatientPass] = useState("");
  const [patientPic, setpatientPic] = useState("");
  const [imgurl, setimgurl] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const userEmail = localStorage.getItem("Update");
  console.log(userEmail);
  const token = localStorage.getItem("token");
  useEffect(() => {
    Axios.defaults.withCredentials = true;
    Axios.get(
      `/api/users/patient?token=${token}&email=${userEmail}`,
      {
        email: userEmail,
        token: token,
      }
    )
      .then((response) => {
        setpatientEmail(response.data.patient.email);
        setpatientFirstName(response.data.patient.firstName);
        setpatientLastName(response.data.patient.lastName);
        setpatientContactNo(response.data.patient.contactNo);
        setpatientUsername(response.data.patient.username);
        setpatientPass(response.data.patient.password);
        setimgurl(response.data.patient.picture);
        console.log(response.data);
        console.log("nays");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updatePatient = () => {
    //input value
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const lastN = document.getElementById("lastN").value;
    const firstN = document.getElementById("firstN").value;

    //regex
    const nameRegex = /^([a-zA-Z\s\.]{1,50})$/;
    const usernameRegex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._!-]+(?<![_.])$/;
    const numberRegex = /^([0-9]{11})$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const emailRegex = /^[\w-\._0-9]+@([\w-]+\.)+[\w-]{2,50}$/;

    if (!nameRegex.test(firstN) || !nameRegex.test(firstN)) {
      document.getElementById("clientfn").style.display = "block";
      document.getElementById("firstN").style.borderColor = "red";
    }

    if (!nameRegex.test(lastN) || !nameRegex.test(lastN)) {
      document.getElementById("clientln").style.display = "block";
      document.getElementById("lastN").style.borderColor = "red";
    }
    if (!usernameRegex.test(username)) {
      document.getElementById("clientUsername").style.display = "block";
      document.getElementById("username").style.borderColor = "red";
    }
    if (!numberRegex.test(contact)) {
      document.getElementById("clientCN").style.display = "block";
      document.getElementById("contact").style.borderColor = "red";
    }

    if (!passRegex.test(password)) {
      document.getElementById("clientPass").style.display = "block";
      document.getElementById("password").style.borderColor = "red";
    }

    if (!emailRegex.test(email)) {
      document.getElementById("clientEmail").style.display = "block";
      document.getElementById("email").style.borderColor = "red";
    }

    const prevImage = document.getElementById("img").src;

    if (
      document.getElementById("inputImage").files.length === 0 &&
      password !== "" &&
      username !== "" &&
      email !== "" &&
      contact !== "" &&
      lastN !== "" &&
      firstN !== "" &&
      nameRegex.test(lastN) &&
      nameRegex.test(firstN) &&
      numberRegex.test(contact) &&
      usernameRegex.test(username) &&
      passRegex.test(password) &&
      emailRegex.test(email)
    ) {
      setIsVisible(true);
      Axios.patch(
        `/api/users/patient?email=${userEmail}`,
        {
          token: token,
          firstName: patientFirstName,
          lastName: patientLastName,
          username: patientUsername,
          picture: prevImage,
          password: patientPass,
          currentEmail: userEmail,
          email: patientEmail,
          contactNo: patientContactNo,
        }
      )
        .then((response) => {
          console.log(response.data);
          console.log("nays");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    //setIsVisible(true);

    if (
      document.getElementById("inputImage").files.length === 1 &&
      password !== "" &&
      username !== "" &&
      email !== "" &&
      contact !== "" &&
      lastN !== "" &&
      firstN !== "" &&
      nameRegex.test(lastN) &&
      nameRegex.test(firstN) &&
      numberRegex.test(contact) &&
      usernameRegex.test(username) &&
      passRegex.test(password) &&
      emailRegex.test(email)
    ) {
      setIsVisible(true);
      const formData = new FormData();
      formData.append("file", patientPic);
      formData.append("upload_preset", "emovaultClient");
      console.log(patientPic);
      Axios.post(
        "https://api.cloudinary.com/v1_1/dlvt2lnkh/image/upload",

        formData
      )
        .then((response) => {
          console.log(response);
          console.log(response.data.secure_url);
          setimgurl(response.data.secure_url);
          Axios.defaults.withCredentials = true;
          Axios.patch(
            `/api/users/patient?email=${userEmail}`,
            {
              firstName: patientFirstName,
              lastName: patientLastName,
              username: patientUsername,
              picture: response.data.secure_url,
              password: patientPass,
              currentEmail: userEmail,
              email: patientEmail,
              contactNo: patientContactNo,
            }
          )
            .then((response) => {
              console.log(response.data);
              console.log("nays");
              Axios.get(
                `/api/users/patient?token=${token}`,
                {
                  email: userEmail,
                  token: token,
                }
              ).then((response) => {
                console.log(response.data);
              });
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
        <div className="updateClientIn" style={{ padding: "50px" }}>
          <center>
            <img
              className="mb-3"
              src={window.location.origin + "/trash.svg"}
              alt="trash"
              style={{ width: 500, align: "center" }}
            />
          </center>
          <Row>
            <h2 className="fw-bold text-center mb-2">Yehey!</h2>
            <p className="text-center mb-4">Account Update Successful</p>
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
              to={"/UserManagement"}
            >
              Home
            </Button>
          </Row>
        </div>
      </div>
      <div className="adduser-tb-bg">
        <div className="adduser-tb-in">
          <Form.Group>
            <Row className="mb-3">
              <Col>
                <h1 className="fw-bold">Update User</h1>
              </Col>
              <Col>
                <Form.Group className="back-cont">
                  <Form.Label
                    className="text-right mb-2 um-back-btn"
                    onClick={back}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      padding: "2%",
                      border: "none",
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
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                  }}
                  id="img"
                  src={imgurl}
                />
              </Col>
              <Col style={{ margin: "auto" }}>
                <Form.Control
                  type="file"
                  id="inputImage"
                  onChange={(e) => {
                    setpatientPic(e.target.files[0]);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>Personal Information</h2>
                <Form.Group>
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        id="firstN"
                        value={patientFirstName}
                        onChange={(e) => {
                          setpatientFirstName(e.target.value);
                        }}
                      />
                      <Form.Label
                        className="mt-2"
                        id="clientfn"
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
                        id="lastN"
                        value={patientLastName}
                        onChange={(e) => {
                          setpatientLastName(e.target.value);
                        }}
                      />
                      <Form.Label
                        className="mt-2"
                        id="clientln"
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
                        type="tel"
                        id="contact"
                        value={patientContactNo}
                        onChange={(e) => {
                          setpatientContactNo(e.target.value);
                        }}
                      />
                      <Form.Label
                        className="mt-2"
                        id="clientCN"
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
                        type="email"
                        id="email"
                        value={patientEmail}
                        onChange={(e) => {
                          setpatientEmail(e.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>

              <h2>Account Information</h2>
              <Row className="mb-5">
                <Col>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    value={patientUsername}
                    onChange={(e) => {
                      setpatientUsername(e.target.value);
                    }}
                  />{" "}
                  <Form.Label
                    className="mt-2"
                    id="clientUsername"
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
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder="****"
                    onChange={(e) => {
                      setpatientPass(e.target.value);
                    }}
                  />
                  <Form.Label
                    className="mt-2"
                    id="clientPass"
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
                style={{
                  width: "100%",
                  color: "black",
                  background: "var(--vio)",
                  border: "none",
                  marginBottom: "10px",
                }}
                onClick={updatePatient}
              >
                Create Account
              </Button>
              <Button
                style={{
                  width: "100%",
                  color: "black",
                  background: "#fff",
                  borderColor: "var(--vio)",
                }}
              >
                Cancel
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
