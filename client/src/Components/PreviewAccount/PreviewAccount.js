import {
  faAngleDoubleLeft,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import EmoNavbar from "../Navbar/EmoNavbar";

function PreviewAccount() {
  Axios.defaults.withCredentials = true;
  const cEmail = JSON.parse(localStorage.getItem("Clinician")).email;
  const [firstName, setfirstName] = useState([]);
  const [lastName, setlastName] = useState([]);
  const [contactNo, setcontactNo] = useState([]);
  const [email, setemail] = useState([]);
  const [yearsInPractice, setyearsInPractice] = useState([]);
  const [picture, setpicture] = useState([]);
  const [username, setusername] = useState([]);
  const [password, setpassword] = useState([]);
  const [license, setlicense] = useState([]);
  const [certificates, setcertificates] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    Axios.get(
      `/api/users/clinician?token=${token}&email=${cEmail}`,
      {
        token: token,
        email: cEmail,
      }
    )
      .then((response) => {
        console.log(response.data);
        setfirstName(response.data.clinician.firstName);
        setlastName(response.data.clinician.lastName);
        setcontactNo(response.data.clinician.contactNo);
        setemail(response.data.clinician.email);
        setyearsInPractice(response.data.clinician.yearsInPractice);
        setpicture(response.data.clinician.picture);
        setlicense(response.data.clinician.license);
        setusername(response.data.clinician.username);
        setpassword(response.data.clinician.password);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <EmoNavbar />

      <div className="adduser-tb-bg">
        <div className="adduser-tb-in">
          <Form.Group className="mb-3">
            <Row>
              <Col xs="auto">
                <Image
                  style={{ width: 100, height: 100, borderRadius: 100 }}
                  src={picture}
                />
              </Col>
              <Col className="m-auto">
                <h1 className="fw-bold m-auto">
                  {firstName} {lastName}
                </h1>
              </Col>
              <Col>
                <Form.Group className="back-cont">
                  <Form.Label
                    className="text-right mb-2 ca-back-btn"
                    as={Link}
                    to="/ListClients"
                    style={{
                      color: "black",
                      padding: "2%",
                      border: "none",
                      background: "var(--yellow)",
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
            <Row>
              <Col>
                <h2>Personal Information</h2>
                <Form.Group>
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" disabled value={firstName} />
                    </Col>
                    <Col>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" value={lastName} disabled />
                    </Col>
                  </Row>
                  <h2>Contact Information</h2>
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control type="tel" value={contactNo} disabled />
                    </Col>
                    <Col>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={email} disabled />
                    </Col>
                  </Row>
                  <h2>Work Experience</h2>
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>Years in Practice</Form.Label>
                      <Form.Control
                        type="text"
                        value={yearsInPractice}
                        disabled
                      />
                    </Col>
                    <Col>
                      <Form.Label>License Number</Form.Label>
                      <Form.Control type="text" value={license} disabled />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group>
                  <Row>
                    <h1>Certificates</h1>
                    <Form.Label style={{ height: "50px" }}>
                      {certificates}
                    </Form.Label>
                  </Row>
                </Form.Group>
              </Col>

              <h2>Account Information</h2>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" value={username} disabled />
                </Col>
                <Col>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} disabled />
                </Col>
              </Row>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default PreviewAccount;
