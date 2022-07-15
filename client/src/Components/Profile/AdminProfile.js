import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import ClientNav from "../Navbar/ClientNav";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import EmoNavbar from "../Navbar/EmoNavbar";
function AdminProfile() {
  const navigate = useNavigate();
  const [clientFirstName, setclientFirstName] = useState("");
  const [clientLastName, setClientLastName] = useState("");
  const [clientContactNo, setClientContactNo] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientUsername, setClientUsername] = useState("");
  const [clientPass, setClientPass] = useState("");
  const [clientPic, setclientPic] = useState("");
  const cemail = localStorage.getItem("user");
  const [imgurl, setimgurl] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  console.log(cemail);
  const token = localStorage.getItem("token");

  useEffect(() => {
    Axios.get(
      `/api/users/admin?token=${token}`,

      { email: cemail, token: token }
    )
      .then((response) => {
        setclientFirstName(response.data.admin.firstName);
        setClientLastName(response.data.admin.lastName);
        setClientContactNo(response.data.admin.contactNo);
        setClientEmail(response.data.admin.email);
        setClientUsername(response.data.admin.username);
        setClientPass(response.data.admin.password);
        setimgurl(response.data.admin.picture);
        console.log(response.data);
        console.log("nays");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateProfile = () => {
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
    //
    const prevImage = document.getElementById("profileImage").src;
    // img if it is not updated
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
      Axios.defaults.withCredentials = true;
      Axios.patch(
        `/api/users/admin?email=${cemail}`,

        {
          firstName: clientFirstName,
          lastName: clientLastName,
          email: clientEmail,
          contactNo: clientContactNo,
          picture: prevImage,
          username: clientUsername,
          password: clientPass,
          currentEmail: cemail,
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
      // img if it is updated
      const formData = new FormData();
      formData.append("file", clientPic);
      formData.append("upload_preset", "emovaultClient");
      console.log(clientPic);
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
          Axios.patch(
            `/users/patient?email=${cemail}`,

            {
              firstName: clientFirstName,
              lastName: clientLastName,
              email: clientEmail,
              contactNo: clientContactNo,
              picture: response.data.secure_url,
              username: clientUsername,
              password: clientPass,
              currentEmail: cemail,
            }
          )
            .then((response) => {
              console.log(response.data);
              console.log("nays");
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

  const samp = () => {
    console.log(document.getElementById("profileImage").src);
    // img if it is not updated
    if (document.getElementById("inputImage").files.length === 1) {
      console.log("first");
    } else {
      console.log("emp");
    }
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
    //#ced4da
    if (!nameRegex.test(lastN) || !nameRegex.test(firstN)) {
      document.getElementById("errMessage").style.display = "clientfn";
      document.getElementById("firstN").style.borderColor = "red";
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
      Axios.patch(
        `/api/users/patient?email=${cemail}`,

        {
          firstName: clientFirstName,
          lastName: clientLastName,
          email: clientEmail,
          contactNo: clientContactNo,
          picture: clientPic,
          username: clientUsername,
          password: clientPass,
          currentEmail: cemail,
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
  };

  const up = () => {
    document.getElementById("clientfn").style.display = "none";
    document.getElementById("firstN").style.borderColor = "#ced4da";
    document.getElementById("clientln").style.display = "none";
    document.getElementById("lastN").style.borderColor = "#ced4da";
    document.getElementById("clientUsername").style.display = "none";
    document.getElementById("username").style.borderColor = "#ced4da";
    document.getElementById("clientCN").style.display = "none";
    document.getElementById("contact").style.borderColor = "#ced4da";
    document.getElementById("clientPass").style.display = "none";
    document.getElementById("password").style.borderColor = "#ced4da";
    document.getElementById("clientEmail").style.display = "none";
    document.getElementById("email").style.borderColor = "#ced4da";
  };

  return (
    <div>
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
              src={window.location.origin + "/trash.svg"}
              alt="trash"
              style={{
                width: "200px",
                align: "center",
              }}
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
              to={"/ClinicianList"}
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
              to={"/ClinicianList"}
              style={{
                textDecoration: "none",
                color: "black",
                border: "none",
                padding: "1%",
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
          ></Form.Group>
          <Form.Group>
            <Row className="mb-4">
              <img
                id="profileImage"
                src={imgurl}
                style={{
                  width: "150px",
                  height: "130px",
                  borderRadius: " 50%",
                }}
              />
              <Col className="name-input-img" style={{ margin: "auto" }}>
                <Form.Label as="h1" className="text-left text-md-left fw-bold">
                  {clientFirstName + " " + clientLastName}
                </Form.Label>
                {/* <Form.Control
                  type="file"
                  id="inputImage"
                  className="changeProfilePic"
                  style={{ width: "50%", boxShadow: "none" }}
                  onChange={(e) => {
                    setclientPic(e.target.files[0]);
                  }}
                /> */}
              </Col>
            </Row>

            <Row className="mb-4">
              <Form.Label as="h2">Personal Information</Form.Label>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  id="firstN"
                  type="text"
                  readOnly
                  onClick={up}
                  value={clientFirstName}
                  onChange={(e) => {
                    setclientFirstName(e.target.value);
                  }}
                />
                <Form.Label
                  className="mt-2"
                  id="clientfn"
                  style={{ color: "red", fontWeight: "bold", display: "none" }}
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
                  readOnly
                  onChange={(e) => {
                    setClientLastName(e.target.value);
                  }}
                />
                <Form.Label
                  className="mt-2"
                  id="clientln"
                  style={{ color: "red", fontWeight: "bold", display: "none" }}
                >
                  Last Name must contain letters only
                </Form.Label>
              </Col>
            </Row>

            <Row className="mb-4">
              <Form.Label as="h2">Contact Information</Form.Label>
              <Col>
                <Form.Label>Contact No.</Form.Label>
                <Form.Control
                  id="contact"
                  type="tel"
                  placeholder="Ex. 09123454324"
                  onClick={up}
                  value={clientContactNo}
                  onChange={(e) => {
                    setClientContactNo(e.target.value);
                  }}
                  readOnly
                />
                <Form.Label
                  className="mt-2"
                  id="clientCN"
                  style={{ color: "red", fontWeight: "bold", display: "none" }}
                >
                  Contact Number must contain numbers only
                </Form.Label>
              </Col>
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="Ex. juandelacruz01@gmail.com"
                  onClick={up}
                  value={clientEmail}
                  onChange={(e) => {
                    setClientEmail(e.target.value);
                  }}
                  readOnly
                />
                <Form.Label
                  className="mt-2"
                  id="clientEmail"
                  style={{ color: "red", fontWeight: "bold", display: "none" }}
                >
                  Please enter valid email address
                </Form.Label>
              </Col>
            </Row>

            <Row className="mb-5">
              <Form.Label as="h2">Account Information</Form.Label>
              <Col>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  id="username"
                  type="text"
                  placeholder="Ex. juanDelaCruz2022!"
                  onClick={up}
                  value={clientUsername}
                  onChange={(e) => {
                    setClientUsername(e.target.value);
                  }}
                  readOnly
                />
                <Form.Label
                  className="mt-2"
                  id="clientUsername"
                  style={{ color: "red", fontWeight: "bold", display: "none" }}
                >
                  Please enter valid username (minimum of 8)
                </Form.Label>
              </Col>
              <Col>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  placeholder="***"
                  onClick={up}
                  onChange={(e) => {
                    setClientPass(e.target.value);
                  }}
                  readOnly
                />
                <Form.Label
                  className="mt-2"
                  id="clientPass"
                  style={{ color: "red", fontWeight: "bold", display: "none" }}
                >
                  Password should have 8-10 characters, at least one uppercase
                  letter, one lowercase letter, one number and one special
                  character
                </Form.Label>
              </Col>
            </Row>

            {/* <Row>
              <Button
                style={{
                  width: "100%",
                  margin: "auto",
                  background: "#aaffd2",
                  borderColor: "#aaffd2",
                  color: "black",
                }}
                onClick={updateProfile}
              >
                Update
              </Button>
            </Row> */}
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default AdminProfile;
