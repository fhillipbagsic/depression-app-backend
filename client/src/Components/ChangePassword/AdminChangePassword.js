import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import ClientNav from "../Navbar/ClientNav";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import EmoNavbar from "../Navbar/EmoNavbar";
function AdminChangePassword() {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [olduserpassword, setolduserpassword] = useState("");
  const [newuserpassword, setnewuserpassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const token = localStorage.getItem("token");
  const changePass = () => {
    const email = localStorage.getItem("user");
    console.log(email);
    const newpass = document.getElementById("newpass").value;
    const oldpass = document.getElementById("oldpass").value;
    const confirmpass = document.getElementById("confirmpass").value;

    //
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (
      (oldpass === "" && confirmpass === "" && newpass === "") ||
      oldpass === "" ||
      confirmpass === "" ||
      newpass === ""
    ) {
      document.getElementById("errorMsgCP").style.display = "block";
      document.getElementById("errorMsgCP").innerHTML =
        "Please input all field";
    }

    if (newpass !== confirmpass) {
      document.getElementById("errorMsgCP").style.display = "block";
      document.getElementById("errorMsgCP").innerHTML =
        "New Password and Confirm Password does not match";
    }

    if (!passRegex.test(confirmpass) || !passRegex.test(newpass)) {
      document.getElementById("errorMsgCP").style.display = "block";
      document.getElementById("errorMsgCP").innerHTML =
        "Password should have minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character";
    }

    if (
      newpass === confirmpass &&
      oldpass !== "" &&
      confirmpass !== "" &&
      newpass !== "" &&
      passRegex.test(confirmpass) &&
      passRegex.test(newpass)
    ) {
      document.getElementById("pop-message").innerHTML =
        "Password Changed Successfully";
      setIsVisible(true);
      Axios.patch(`/api/auth/changepassword`, {
        token: token,
        email: email,
        newPassword: newuserpassword,
        oldPassword: olduserpassword,
      })
        .then((response) => {
          console.log(response.data);
          console.log("nays");
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setErrorMsg(error.response.data.message);
          document.getElementById("errorMsgCP").style.display = "block";
        });
    }

    console.log(confirmpass + " " + newpass);
  };

  const up = () => {
    document.getElementById("errorMsgCP").style.display = "none";
  };
  const back = () => {
    navigate("/DatePick");
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
              src={window.location.origin + "/yehey2.svg"}
              alt="trash"
              style={{ width: "200px", align: "center" }}
            />
          </center>
          <Row>
            <h2 className="fw-bold text-center mb-2">Yehey!</h2>
            <p id="pop-message" className="text-center mb-4"></p>
          </Row>

          <Row>
            <Button
              style={{
                width: "100%",
                background: "var(--blue)",
                borderColor: "var(--blue)",
                color: "var(--dblue)",
                outline: "none",
                boxShadow: "none",
              }}
              onClick={back}
            >
              Home
            </Button>
          </Row>
        </div>
      </div>
      <div className="changepass-bg" style={{ background: "white" }}>
        <Form className="changepass-form">
          <Row id="cp-row">
            <div id="cpForm">
              <Form.Group className="mb-4">
                <Form.Label as="h1" className="fw-bold">
                  Change Password
                </Form.Label>
                <Form.Text
                  id="errorMsgCP"
                  style={{
                    background: "red",
                    color: "white",
                    padding: "10px ",
                    display: "none",
                  }}
                >
                  {errorMsg}
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold ">Old Password</Form.Label>
                <Form.Control
                  type="password"
                  id="oldpass"
                  onClick={up}
                  onChange={(e) => {
                    setolduserpassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">New Password</Form.Label>
                <Form.Control
                  onClick={up}
                  type="password"
                  id="newpass"
                  onChange={(e) => {
                    setnewuserpassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Confirm Password</Form.Label>
                <Form.Control type="password" id="confirmpass" onClick={up} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Button
                  id="changepass-change-btn"
                  onClick={changePass}
                  style={{
                    color: "black",
                    background: "var(--yellow)",
                    borderColor: "var(--dyellow)",
                  }}
                >
                  Change
                </Button>
              </Form.Group>
              <Form.Group className="mb-3">
                <Button
                  id="changepass-cancel-btn"
                  style={{
                    color: "black",
                    borderColor: "var(--dyellow)",
                  }}
                >
                  Cancel
                </Button>
              </Form.Group>
            </div>
            <div style={{ width: "60%" }}>
              <center>
                <img
                  className="passwordImage"
                  src={process.env.PUBLIC_URL + "/adminPass.svg"}
                />
              </center>
            </div>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default AdminChangePassword;
