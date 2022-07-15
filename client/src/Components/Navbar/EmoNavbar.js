import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  faAngleDoubleLeft,
  faLock,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EmoNavbar() {
  const navigate = useNavigate();
  const [name, setName] = useState([]);
  const [img, setImg] = useState([]);
  const token = localStorage.getItem("token");
  Axios.defaults.withCredentials = true;
  const cEmail = localStorage.getItem("user");
  useEffect(() => {
    Axios.get(`/api/users/admin?token=${token}`, {
      token: token,
    }).then((response) => {
      console.log(response.data.admin.firstName);
      setName(response.data.admin.firstName);
      setImg(response.data.admin.picture);
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="navUser">
        <Container fluid>
          <Navbar.Brand className="fw-bold" style={{ color: "var(--dblue" }}>
            <img
              alt=""
              src={process.env.PUBLIC_URL + "/client.png"}
              width="50"
              height="50"
              style={{ paddingRight: "5px" }}
              className="d-inline-block align-center"
            />
            EMOVAULT
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/ClinicianList"
                style={{ fontWeight: "bold", color: "black" }}
              >
                Home
              </Nav.Link>
            </Nav>
            <Nav>
              <img
                id="avatar"
                src={img}
                alt=""
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />

              <NavDropdown
                title={name}
                align="end"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to={"/AdminProfile"}>
                  <FontAwesomeIcon
                    style={{ marginRight: "10px" }}
                    icon={faUser}
                  ></FontAwesomeIcon>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/AdminChangePassword"}>
                  <FontAwesomeIcon
                    style={{ marginRight: "10px" }}
                    icon={faLock}
                  ></FontAwesomeIcon>
                  Change Password
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item style={{ color: "red" }} onClick={logout}>
                  <FontAwesomeIcon
                    style={{ marginRight: "10px" }}
                    icon={faArrowRightFromBracket}
                  ></FontAwesomeIcon>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default EmoNavbar;
