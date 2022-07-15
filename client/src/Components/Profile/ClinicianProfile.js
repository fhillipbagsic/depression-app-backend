import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import ClientNav from "../Navbar/ClientNav";
import Axios from "axios";
import { Link } from "react-router-dom";
import ClinicianNav from "../Navbar/ClinicianNav";
function ClinicianProfile() {
  const [clientFirstName, setclientFirstName] = useState("");
  const [clientLastName, setClientLastName] = useState("");
  const [clientContactNo, setClientContactNo] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientUsername, setClientUsername] = useState("");
  const [clientPass, setClientPass] = useState("");
  const [clientPic, setclientPic] = useState("");
  const [yearsInPractice, setyearsInPractice] = useState("");
  const [licenseNo, setlicenseNo] = useState("");
  const cemail = localStorage.getItem("user");
  const [imgurl, setimgurl] = useState("");
  const [cert1, setCert1] = useState("");
  const [cert2, setCert2] = useState("");
  const [cert3, setCert3] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  console.log(cemail);
  const token = localStorage.getItem("token");
  useEffect(() => {
    Axios.get(
      `/api/users/clinician?token=${token}&email=${cemail}`,
      {
        email: cemail,
        token: token,
      }
    )
      .then((response) => {
        setclientFirstName(response.data.clinician.firstName);
        setClientLastName(response.data.clinician.lastName);
        setClientContactNo(response.data.clinician.contactNo);
        setClientEmail(response.data.clinician.email);
        setClientUsername(response.data.clinician.username);
        setClientPass(response.data.clinician.password);
        setimgurl(response.data.clinician.picture);
        setlicenseNo(response.data.clinician.license);
        setyearsInPractice(response.data.clinician.yearsInPractice);
        setCert1(response.data.clinician.certificates);
        console.log(response.data);
        console.log("nays");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateProfile = () => {
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const lastN = document.getElementById("lastN").value;
    const firstN = document.getElementById("firstN").value;
    const yearsInPrac = document.getElementById("yearsInPrac").value;
    const licenseNum = document.getElementById("licenseNum").value;
    const nameRegex = /^([a-zA-Z\s\.]{1,50})$/;
    const yipRegex = /^([0-9]{1,3})$/;
    const linumberRegex = /^([0-9]{1,11})$/;
    const usernameRegex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._!-]+(?<![_.])$/;
    const numberRegex = /^([0-9]{11})$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const emailRegex = /^[\w-\._0-9]+@([\w-]+\.)+[\w-]{2,50}$/;

    if (!yipRegex.test(yearsInPrac)) {
      document.getElementById("yearsInPracErr").style.display = "block";
    }

    if (!linumberRegex.test(licenseNum)) {
      document.getElementById("licenseNumErr").style.display = "block";
    }
    if (!nameRegex.test(firstN)) {
      document.getElementById("firstNErr").style.display = "block";
    }
    if (!nameRegex.test(lastN)) {
      document.getElementById("lastNErr").style.display = "block";
    }
    if (!usernameRegex.test(username)) {
      document.getElementById("usernameErr").style.display = "block";
    }
    if (!numberRegex.test(contact)) {
      document.getElementById("contactErr").style.display = "block";
    }

    if (!passRegex.test(password)) {
      document.getElementById("passwordErr").style.display = "block";
    }

    if (!emailRegex.test(email)) {
      document.getElementById("emailErr").style.display = "block";
    }

    const prevImage = document.getElementById("profileImage").src;

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
      passRegex.test(password)
    ) {
      setIsVisible(true);

      Axios.defaults.withCredentials = true;

      Axios.patch(
        `/api/users/clinician?email=${cemail}`,
        {
          token: token,
          firstName: clientFirstName,
          lastName: clientLastName,
          email: clientEmail,
          contactNo: clientContactNo,
          picture: prevImage,
          username: clientUsername,
          password: clientPass,
          yearsInPractice: yearsInPractice,
          license: licenseNo,
          currentEmail: cemail,
          certificates: cert1 + ", " + cert2 + ", " + cert3,
        }
      )
        .then((response) => {
          setimgurl(response.data.clinician.picture);
          console.log(response.data);
          console.log("nays");
        })
        .catch((error) => {
          console.log(error);
        });
    }

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
      passRegex.test(password)
    ) {
      setIsVisible(true);

      const formData = new FormData();
      formData.append("file", clientPic);
      formData.append("upload_preset", "emovaultClient");
      console.log(clientPic);
      Axios.defaults.withCredentials = false;
      Axios.post(
        "https://api.cloudinary.com/v1_1/dlvt2lnkh/image/upload",
        formData
      ).then((response) => {
        console.log(response);
        console.log(response.data.secure_url);
        setimgurl(response.data.secure_url);
        Axios.defaults.withCredentials = true;

        Axios.patch(
          `/api/users/clinician?email=${cemail}`,
          {
            token: token,
            firstName: clientFirstName,
            lastName: clientLastName,
            email: clientEmail,
            contactNo: clientContactNo,
            picture: response.data.secure_url,
            username: clientUsername,
            password: clientPass,
            yearsInPractice: yearsInPractice,
            license: licenseNo,
            certificates: cert1 + ", " + cert2 + ", " + cert3,
            currentEmail: cemail,
          }
        )
          .then((response) => {
            setimgurl(response.data.clinician.picture);
            console.log(response.data);
            console.log("nays");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  };

  const l = () => {
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const lastN = document.getElementById("lastN").value;
    const firstN = document.getElementById("firstN").value;
    const yearsInPrac = document.getElementById("yearsInPrac").value;
    const licenseNum = document.getElementById("licenseNum").value;
    const nameRegex = /^([a-zA-Z\s\.]{1,50})$/;
    const usernameRegex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._!-]+(?<![_.])$/;
    const numberRegex = /^([0-9]{11})$/;
    const yipRegex = /^([0-9]{3})$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const emailRegex = /^[\w-\._0-9]+@([\w-]+\.)+[\w-]{2,50}$/;
    if (!yipRegex.test(lastN)) {
      document.getElementById("errMessage").style.display = "block";
      document.getElementById("errMessageTxt").innerHTML =
        "Name should be letters only";
    }
    if (!nameRegex.test(lastN) || !nameRegex.test(firstN)) {
      document.getElementById("errMessage").style.display = "block";
      document.getElementById("errMessageTxt").innerHTML =
        "Name should be letters only";
    }
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
    document.getElementById("emailErr").style.display = "none";
    document.getElementById("passwordErr").style.display = "none";
    document.getElementById("contactErr").style.display = "none";
    document.getElementById("usernameErr").style.display = "none";
    document.getElementById("lastNErr").style.display = "none";
    document.getElementById("firstNErr").style.display = "none";
    document.getElementById("yearsInPracErr").style.display = "none";
    document.getElementById("licenseNumErr").style.display = "none";
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
              src={window.location.origin + "/clinicianHappy.svg"}
              alt="trash"
              style={{ width: 200, align: "center" }}
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
      <div
        className="profile-bg"
        style={{ background: "white", height: "100vh" }}
      >
        <Form
          className="profile-form"
          style={{ background: "white", paddingBottom: "5%" }}
        >
          <Form.Group className="back-cont mb-3">
            <Form.Label
              className="text-right mb-3 profile-back-btn"
              as={Link}
              to={"/UserManagement"}
              style={{
                textDecoration: "none",
                color: "black",
                borderColor: "var(--vio)",
                background: "var(--vio)",
              }}
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
            <img
              id="profileImage"
              src={imgurl}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />

            <Form.Label
              as="h1"
              className="text-left text-md-left fw-bold mb-4"
              style={{ margin: "auto" }}
            >
              {clientFirstName + " " + clientLastName}
            </Form.Label>

            <Form.Control
              type="file"
              id="inputImage"
              className="changeProfilePic mb-4"
              style={{ width: "30%" }}
              onChange={(e) => {
                setclientPic(e.target.files[0]);
              }}
            />

            <Row className="mb-4">
              <Row className="mb-4">
                <Form.Label as="h2" className="text-left">
                  Personal Information
                </Form.Label>
                <Col>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    id="firstN"
                    type="text"
                    onClick={up}
                    value={clientFirstName}
                    onChange={(e) => {
                      setclientFirstName(e.target.value);
                    }}
                  />
                  <Form.Label
                    className="mt-2"
                    id="firstNErr"
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
                    id="lastN"
                    type="text"
                    onClick={up}
                    value={clientLastName}
                    onChange={(e) => {
                      setClientLastName(e.target.value);
                    }}
                  />
                  <Form.Label
                    className="mt-2"
                    id="lastNErr"
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

              <Col>
                <Row>
                  <Form.Label as="h2">Contact Information</Form.Label>
                  <Col>
                    <Form.Label>Contact No.</Form.Label>
                    <Form.Control
                      id="contact"
                      type="tel"
                      onClick={up}
                      value={clientContactNo}
                      onChange={(e) => {
                        setClientContactNo(e.target.value);
                      }}
                    />
                    <Form.Label
                      className="mt-2"
                      id="contactErr"
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
                      onClick={up}
                      value={clientEmail}
                      onChange={(e) => {
                        setClientEmail(e.target.value);
                      }}
                    />
                    <Form.Label
                      className="mt-2"
                      id="emailErr"
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
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <Row>
                  <Form.Label as="h2">Account Information</Form.Label>
                  <Col>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      id="username"
                      type="text"
                      onClick={up}
                      value={clientUsername}
                      onChange={(e) => {
                        setClientUsername(e.target.value);
                      }}
                    />
                    <Form.Label
                      className="mt-2"
                      id="usernameErr"
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
                      placeholder="Input your old or new password"
                      onClick={up}
                      onChange={(e) => {
                        setClientPass(e.target.value);
                      }}
                    />
                    <Form.Label
                      className="mt-2"
                      id="passwordErr"
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        display: "none",
                      }}
                    >
                      Password should have 8-10 characters, at least one
                      uppercase letter, one lowercase letter, one number and one
                      special character
                    </Form.Label>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mb-5">
              <Col>
                <Row>
                  <Form.Label as="h2">Work Experience</Form.Label>
                  <Col>
                    <Form.Label>Years in Practice</Form.Label>
                    <Form.Control
                      id="yearsInPrac"
                      type="text"
                      onClick={up}
                      value={yearsInPractice}
                      onChange={(e) => {
                        setyearsInPractice(e.target.value);
                      }}
                    />
                    <Form.Label
                      className="mt-2"
                      id="yearsInPracErr"
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        display: "none",
                      }}
                    >
                      Years in Practice must contain numbers only
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Label>License Number</Form.Label>
                    <Form.Control
                      type="text"
                      id="licenseNum"
                      value={licenseNo}
                      onClick={up}
                      onChange={(e) => {
                        setlicenseNo(e.target.value);
                      }}
                    />
                    <Form.Label
                      className="mt-2"
                      id="licenseNumErr"
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        display: "none",
                      }}
                    >
                      License Number must contain numbers only
                    </Form.Label>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Form.Group>
              <h1>Certificates</h1>
              <Form.Label>{cert1}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" style={{ display: "flex" }}>
              <Form.Check type="checkbox" id="cert1" />
              <Form.Control
                type="text"
                onChange={(e) => {
                  setCert1(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" style={{ display: "flex" }}>
              <Form.Check type="checkbox" id="cert2" />
              <Form.Control
                type="text"
                value={cert2}
                onChange={(e) => {
                  setCert2(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-5" style={{ display: "flex" }}>
              <Form.Check type="checkbox" id="cert3" />
              <Form.Control
                type="text"
                value={cert3}
                onChange={(e) => {
                  setCert3(e.target.value);
                }}
              />
            </Form.Group>

            <Row>
              <Button
                style={{
                  width: "100%",
                  margin: "auto",
                  background: "var(--vio)",
                  borderColor: "var(--vio)",
                  color: "black",
                }}
                onClick={updateProfile}
              >
                Update
              </Button>
            </Row>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default ClinicianProfile;
