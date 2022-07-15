import {
  faAngleDoubleLeft,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import EmoNavbar from "../Navbar/EmoNavbar";

import { Image } from "cloudinary-react";

function CreateAccount() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [contactNo, setcontactNo] = useState("");
  const [email, setemail] = useState("");
  const [yearsInPractice, setyearsInPractice] = useState("");
  const [license, setlicense] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [picture, setpicture] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [imgurl, setimgurl] = useState("");
  const [preImg, setpreImg] = useState(
    "https://res.cloudinary.com/dlvt2lnkh/image/upload/v1656746343/emovaultClient/egj5r6ccwa0my7skdkfc.png"
  );

  const createClinician = () => {
    const token = localStorage.getItem("token");
    //regex
    const nameRegex = /^([a-zA-Z\s\.]{1,50})$/;
    const usernameRegex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._!-]+(?<![_.])$/;
    const numberRegex = /^([0-9]{11})$/;
    const numberLiRegex = /^([0-9]{1,11})$/;
    const numberYearsRegex = /^([0-9]{1,3})$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const emailRegex = /^[\w-\._0-9]+@([\w-]+\.)+[\w-]{2,50}$/;

    if (document.getElementById("inputImage").files.length === 0) {
      document.getElementById("imgErrMsg").style.display = "block";
    }

    if (
      document.getElementById("clPass").value === "" ||
      !passRegex.test(document.getElementById("clPass").value)
    ) {
      document.getElementById("clPassErr").style.display = "block";
    }

    if (
      document.getElementById("clUN").value === "" ||
      !usernameRegex.test(document.getElementById("clUN").value)
    ) {
      document.getElementById("clUNErr").style.display = "block";
    }

    if (
      document.getElementById("clLN").value === "" ||
      !numberLiRegex.test(document.getElementById("clLN").value)
    ) {
      document.getElementById("clLNErr").style.display = "block";
    }

    if (
      document.getElementById("clYIP").value === "" ||
      !numberYearsRegex.test(document.getElementById("clYIP").value)
    ) {
      document.getElementById("clYipErr").style.display = "block";
    }

    if (
      document.getElementById("clEmail").value === "" ||
      !emailRegex.test(document.getElementById("clEmail").value)
    ) {
      document.getElementById("clErr").style.display = "block";
    }

    if (
      document.getElementById("clCoNu").value === "" ||
      !numberRegex.test(document.getElementById("clCoNu").value)
    ) {
      document.getElementById("clCoNuErr").style.display = "block";
    }

    if (
      document.getElementById("clLastN").value === "" ||
      !nameRegex.test(document.getElementById("clLastN").value)
    ) {
      document.getElementById("clLastNErr").style.display = "block";
    }

    if (
      document.getElementById("clFirstN").value === "" ||
      !nameRegex.test(document.getElementById("clFirstN").value)
    ) {
      document.getElementById("clFirstNErr").style.display = "block";
    }

    if (
      document.getElementById("inputImage").files.length === 1 &&
      passRegex.test(document.getElementById("clPass").value) &&
      usernameRegex.test(document.getElementById("clUN").value) &&
      numberLiRegex.test(document.getElementById("clLN").value) &&
      numberYearsRegex.test(document.getElementById("clYIP").value) &&
      emailRegex.test(document.getElementById("clEmail").value) &&
      numberRegex.test(document.getElementById("clCoNu").value) &&
      nameRegex.test(document.getElementById("clLastN").value) &&
      nameRegex.test(document.getElementById("clFirstN").value)
    ) {
      setIsVisible(true);
      const formData = new FormData();
      formData.append("file", picture);
      formData.append("upload_preset", "emovaultUser");
      Axios.defaults.withCredentials = false;
      Axios.post(
        "https://api.cloudinary.com/v1_1/dlvt2lnkh/image/upload",
        formData
      ).then((response) => {
        console.log(response);
        console.log(response.data.secure_url);
        setimgurl(response.data.secure_url);
        Axios.defaults.withCredentials = true;

        Axios.post(
          "/api/users/clinician?token=${token}",
          {
            token: token,
            firstName: firstName,
            lastName: lastName,
            contactNo: contactNo,
            email: email,
            yearsInPractice: yearsInPractice,
            license: license,
            username: username,
            password: password,
            certificates: "",
            picture: response.data.secure_url,
          }
        )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  };

  const hide = () => {
    document.getElementById("imgErrMsg").style.display = "none";
    document.getElementById("clPassErr").style.display = "none";
    document.getElementById("clUNErr").style.display = "none";
    document.getElementById("clLNErr").style.display = "none";
    document.getElementById("clYipErr").style.display = "none";
    document.getElementById("clErr").style.display = "none";
    document.getElementById("clCoNuErr").style.display = "none";
    document.getElementById("clLastNErr").style.display = "none";
    document.getElementById("clFirstNErr").style.display = "none";
  };
  // const createClinician = () => {
  //   const files = document.querySelector("[type=file]").files;
  //   const formData = new FormData();

  //   for (let i = 0; i < files.length; i++) {
  //     let file = files[i];
  //     formData.append("file", file);
  //     formData.append("upload_preset", "emovaultUser");
  //     console.log(file);
  //     Axios.post(
  //       "https://api.cloudinary.com/v1_1/dlvt2lnkh/image/upload",
  //       formData
  //     ).then((response) => {
  //       console.log(response);
  //       console.log(response.data.secure_url);
  //       setimgurl(response.data.secure_url);
  //       Axios.defaults.withCredentials = true;
  //       r();
  //     });
  //   }
  //   setcertificates(formData);
  // };

  // const r = () => {
  //   Axios.defaults.withCredentials = true;
  //   Axios.post("http://localhost:5001/api/users/clinician", {
  //     firstName: firstName,
  //     lastName: lastName,
  //     contactNo: contactNo,
  //     email: email,
  //     yearsInPractice: yearsInPractice,
  //     license: license,
  //     username: username,
  //     password: password,
  //     certificates: imgurl,
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const navigate = useNavigate();
  const back = () => {
    navigate("/ClinicianList");
    window.location.reload();
  };

  return (
    <>
      <EmoNavbar />
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
              src={window.location.origin + "/adminHappy.svg"}
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
                background: "var(--yellow)",
                borderColor: "var(--yellow)",
                color: "black",
                outline: "none",
                boxShadow: "none",
              }}
              as={Link}
              to={"/ClinicianList"}
            >
              Home
            </Button>
          </Row>
        </div>
      </div>
      <div className="adduser-tb-bg">
        <div className="adduser-tb-in">
          <Form.Group className="mb-3">
            <Row className="mb-3">
              <Col xs="auto">
                <Image
                  style={{ width: 100, height: 100, borderRadius: 100 }}
                  src={preImg}
                  alt="Profile pic"
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
                    onClick={back}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      background: "var(--yellow)",
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
            <Form.Control
              type="file"
              id="inputImage"
              onChange={(e) => {
                setpicture(e.target.files[0]);
              }}
            />
            <Form.Label
              className="mt-2"
              id="imgErrMsg"
              style={{
                color: "red",
                fontWeight: "bold",
                display: "none",
              }}
            >
              Please add an image
            </Form.Label>
          </Form.Group>
          <Form>
            <Col>
              <h2>Personal Information</h2>
              <Form.Group>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      id="clFirstN"
                      onClick={hide}
                      type="text"
                      onChange={(event) => {
                        setfirstName(event.target.value);
                      }}
                    />
                    <Form.Label
                      className="mt-2"
                      id="clFirstNErr"
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
                      id="clLastN"
                      onClick={hide}
                      onChange={(event) => {
                        setlastName(event.target.value);
                      }}
                    />
                    <Form.Label
                      className="mt-2"
                      id="clLastNErr"
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
                      id="clCoNu"
                      type="tel"
                      onClick={hide}
                      onChange={(event) => {
                        setcontactNo(event.target.value);
                      }}
                    />
                    <Form.Label
                      className="mt-2"
                      id="clCoNuErr"
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
                      onClick={hide}
                      id="clEmail"
                      onChange={(event) => {
                        setemail(event.target.value);
                      }}
                    />
                    <Form.Label
                      className="mt-2"
                      id="clErr"
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
                <h2>Work Experience</h2>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>Years in Practice</Form.Label>
                    <Form.Control
                      type="text"
                      onClick={hide}
                      id="clYIP"
                      onChange={(event) => {
                        setyearsInPractice(event.target.value);
                      }}
                    />
                    <Form.Label
                      className="mt-2"
                      id="clYipErr"
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        display: "none",
                      }}
                    >
                      Work experience must contain numbers only
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Label>License Number</Form.Label>
                    <Form.Control
                      id="clLN"
                      onClick={hide}
                      type="text"
                      onChange={(event) => {
                        setlicense(event.target.value);
                      }}
                    />
                    <Form.Label
                      className="mt-2"
                      id="clLNErr"
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        display: "none",
                      }}
                    >
                      License Number should contain numbers only
                    </Form.Label>
                  </Col>
                </Row>
              </Form.Group>
              {/* <Form.Group className="mb-3">
                <h1>Certificates</h1>
                <Form.Group
                  style={{
                    width: "100%",
                    display: "flex",
                    marginBottom: "10px",
                  }}
                >
                  <Form.Check type="checkbox" id="checkResize" />
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group
                  style={{
                    width: "100%",
                    display: "flex",
                    marginBottom: "10px",
                  }}
                >
                  <Form.Check type="checkbox" id="checkResize1" />
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group
                  style={{
                    width: "100%",
                    display: "flex",
                    marginBottom: "10px",
                  }}
                >
                  <Form.Check type="checkbox" id="checkResize2" />
                  <Form.Control type="text" />
                </Form.Group>
              </Form.Group> */}
            </Col>
            <Col>
              <h2>Account Information</h2>
              <Row className="mb-4">
                <Col>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    onClick={hide}
                    type="text"
                    id="clUN"
                    onChange={(event) => {
                      setusername(event.target.value);
                    }}
                  />
                  <Form.Label
                    className="mt-2"
                    id="clUNErr"
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
                      onClick={hide}
                      id="clPass"
                      type="password"
                      onChange={(event) => {
                        setpassword(event.target.value);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faArrowsRotate}
                      style={{
                        background: "var(--yellow)",
                        padding: "10px",
                        borderRadius: "5px",
                        color: "var(--dyellow)",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                    ></FontAwesomeIcon>
                  </Form.Group>

                  <Form.Label
                    className="mt-2"
                    id="clPassErr"
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
                <Col
                  style={{
                    margin: "auto auto 0 auto ",
                    padding: "0",
                  }}
                  xs="auto"
                ></Col>
              </Row>

              <Button
                style={{
                  width: "100%",
                  color: "black",
                  background: "var(--yellow)",
                  border: "none",
                }}
                onClick={createClinician}
              >
                Create Account
              </Button>
            </Col>
          </Form>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
