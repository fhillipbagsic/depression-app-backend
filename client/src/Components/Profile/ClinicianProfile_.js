import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import ClientNav from "../Navbar/ClientNav";
import Axios from "axios";
import { Link } from "react-router-dom";
import ClinicianNav from "../Navbar/ClinicianNav";
function ClinicianProfile_() {
  Axios.defaults.withCredentials = true;
  const [clientFirstName, setclientFirstName] = useState("");
  const [clientLastName, setClientLastName] = useState("");
  const [clientContactNo, setClientContactNo] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientUsername, setClientUsername] = useState("");
  const [clientPass, setClientPass] = useState("");
  const [clientPic, setclientPic] = useState("");
  const cemail = localStorage.getItem("user");
  const [isVisible, setIsVisible] = useState(false);
  console.log(cemail);

  useEffect(() => {
    Axios.get(`/api/users/clinician?email=${cemail}`, {
      email: cemail,
    })
      .then((response) => {
        setclientFirstName(response.data.clinician.firstName);
        setClientLastName(response.data.clinician.lastName);
        setClientContactNo(response.data.clinician.contactNo);
        setClientEmail(response.data.clinician.email);
        setClientUsername(response.data.clinician.username);
        setClientPass(response.data.clinician.password);
        setclientPic(response.data.clinician.picture);
        console.log(response.data);
        console.log("nays");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateProfile = () => {
    const formData = new FormData();
    formData.append("file", clientPic);
    formData.append("upload_preset", "emovaultClient");
    console.log(cemail);
    Axios.post(
      "https://api.cloudinary.com/v1_1/dlvt2lnkh/image/upload",
      formData
    ).then((response) => {
      console.log(response);
      console.log(response.data.secure_url);
      setclientPic(response.data.secure_url);
    });
    l();
  };

  const l = () => {
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const lastN = document.getElementById("lastN").value;
    const firstN = document.getElementById("firstN").value;
    const nameRegex = /^([a-zA-Z\s\.]{1,50})$/;
    const usernameRegex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._!-]+(?<![_.])$/;
    const numberRegex = /^([0-9]{11})$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const emailRegex = /^[\w-\._0-9]+@([\w-]+\.)+[\w-]{2,50}$/;
    if (!nameRegex.test(lastN) || !nameRegex.test(firstN)) {
      document.getElementById("errMessage").style.display = "block";
      document.getElementById("errMessageTxt").innerHTML =
        "Name should be letters only";
    }
    if (!usernameRegex.test(username)) {
      document.getElementById("errMessage").style.display = "block";
      document.getElementById("errMessageTxt").innerHTML =
        "Username length is 8 to 20 and must have capital letters, numbers, and special characters";
    }
    if (!numberRegex.test(contact)) {
      document.getElementById("errMessage").style.display = "block";
      document.getElementById("errMessageTxt").innerHTML =
        "Contact Number should be 11 numbers and don't have letters";
    }

    if (!passRegex.test(password)) {
      document.getElementById("errMessage").style.display = "block";
      document.getElementById("errMessageTxt").innerHTML =
        "Password should have minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character";
    }

    if (!emailRegex.test(email)) {
      document.getElementById("errMessage").style.display = "block";
      document.getElementById("errMessageTxt").innerHTML =
        "Email should contain letters or numbers";
    }
    if (
      password == "" ||
      username === "" ||
      email === "" ||
      contact === "" ||
      lastN === "" ||
      firstN === ""
    ) {
      document.getElementById("errMessage").style.display = "block";
      document.getElementById("errMessageTxt").innerHTML =
        "Please Don't leave any field blank";
    }

    if (
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
      passRegex.test(password)
    ) {
      setIsVisible(true);
      Axios.patch(`/api/users/patient?email=${cemail}`, {
        firstName: clientFirstName,
        lastName: clientLastName,
        email: clientEmail,
        contactNo: clientContactNo,
        picture: clientPic,
        username: clientUsername,
        password: clientPass,
        currentEmail: cemail,
      })
        .then((response) => {
          console.log(response.data);
          console.log("nays");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const up = () => {
    document.getElementById("errMessage").style.display = "none";
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
              to={"/DatePick"}
            >
              Home
            </Button>
          </Row>
        </div>
      </div>
      <div className="profile-bg" style={{ background: "white" }}>
        <Form className="profile-form">
          <Form.Group className="back-cont mb-3">
            <Form.Label
              className="text-right mb-3 profile-back-btn"
              as={Link}
              to={"/ClinicianClients"}
              style={{ textDecoration: "none" }}
            >
              <FontAwesomeIcon
                id="left-arrow"
                icon={faAngleDoubleLeft}
              ></FontAwesomeIcon>
              Back
            </Form.Label>
          </Form.Group>
          <Form.Group
            id="errMessage"
            className="mb-3"
            style={{
              background: "red",
              color: "white",
              width: "100%",
              padding: "10px",
              display: "none",
            }}
          >
            <Form.Text
              style={{
                color: "white",
                width: "100%",
              }}
              id="errMessageTxt"
            >
              sdfs
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Row className="mb-4">
              <img
                id="profileImage"
                src={clientPic}
                style={{
                  width: "150px",
                  height: "130px",
                  borderRadius: "50%",
                }}
              />
              <Col className="name-input-img" style={{ margin: "auto" }}>
                <Form.Label as="h1" className="text-left text-md-left fw-bold">
                  {clientFirstName + " " + clientLastName}
                </Form.Label>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <Row>
                  <Form.Label as="h2">Personal Information</Form.Label>
                  <Col>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      disabled
                      id="firstN"
                      type="text"
                      onClick={up}
                      value={clientFirstName}
                      onChange={(e) => {
                        setclientFirstName(e.target.value);
                      }}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      disabled
                      id="lastN"
                      type="text"
                      onClick={up}
                      value={clientLastName}
                      onChange={(e) => {
                        setClientLastName(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Form.Label as="h2">Contact Information</Form.Label>
                  <Col>
                    <Form.Label>Contact No.</Form.Label>
                    <Form.Control
                      disabled
                      id="contact"
                      type="tel"
                      onClick={up}
                      value={clientContactNo}
                      onChange={(e) => {
                        setClientContactNo(e.target.value);
                      }}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      disabled
                      type="email"
                      id="email"
                      onClick={up}
                      value={clientEmail}
                      onChange={(e) => {
                        setClientEmail(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <Row>
                  <Form.Label as="h2">Account Information</Form.Label>
                  <Col>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      disabled
                      id="username"
                      type="text"
                      onClick={up}
                      value={clientUsername}
                      onChange={(e) => {
                        setClientUsername(e.target.value);
                      }}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      disabled
                      type="password"
                      id="password"
                      value={clientPass}
                      onClick={up}
                      onChange={(e) => {
                        setClientPass(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <Row></Row>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default ClinicianProfile_;
