import {
  faArrowUp,
  faMagnifyingGlass,
  faPencilSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  Image,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import ClinicianNav from "../Navbar/ClinicianNav";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
function UserManagement() {
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  const [clinicianClientList, setclinicianClientList] = useState([]);
  const userEmail = localStorage.getItem("user");
  const [isVisible, setIsVisible] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log(userEmail);
    Axios.get(`/api/users/getpatients?token=${token}&email=`, {
      email: userEmail,
      token: token,
    })
      .then((response) => {
        setclinicianClientList(response.data.patients);

        console.log(response.data);
        console.log("nays");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //
  const deleteClient = (email) => {
    localStorage.setItem("Email", email);
    setIsVisible(true);
    console.log(email);
  };

  function userEmail_del() {
    setIsVisible(false);
    const setEmail = localStorage.getItem("Email");
    console.log(setEmail);
    Axios.delete(`/api/users/patient?token=${token}&email=${setEmail}`, {
      email: setEmail,
      token: token,
    })
      .then((response) => {
        console.log(response.data);
        setclinicianClientList(
          clinicianClientList.filter((val) => {
            return val.email !== setEmail;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const updateUser = (email) => {
    localStorage.setItem("Update", email);
    navigate("/UpdateUser");
  };

  const searchClient = () => {
    var input,
      filter,
      table,
      tr,
      td,
      td1,
      td2,
      i,
      txtValue,
      txtValue1,
      txtValue2;
    input = document.getElementById("searchinput");
    filter = input.value.toUpperCase();
    table = document.getElementById("clientList");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      td1 = tr[i].getElementsByTagName("td")[0];
      td2 = tr[i].getElementsByTagName("td")[2];
      if (td || td1) {
        txtValue = td.textContent || td.innerText;
        txtValue1 = td1.textContent || td1.innerText;
        txtValue2 = td2.textContent || td2.innerText;
        if (
          txtValue.toUpperCase().indexOf(filter) > -1 ||
          txtValue1.toUpperCase().indexOf(filter) > -1 ||
          txtValue2.toUpperCase().indexOf(filter) > -1
        ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  return (
    <div>
      <ClinicianNav />
      <div
        className="deleteOptionCont"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="deleteOption" style={{ padding: "50px", width: 500 }}>
          <center>
            <img
              className="mb-3"
              src={window.location.origin + "/trash.svg"}
              alt="trash"
              style={{ width: 300, align: "center" }}
            />
          </center>
          <h2 className="fw-bold text-center mb-4">
            Are you sure you want to remove user?
          </h2>
          <Row>
            <Col>
              <Button
                style={{
                  width: "100%",
                  background: "var(--dvio)",
                  borderColor: "var(--dvio)",
                  outline: "none",
                  boxShadow: "none",
                }}
                onClick={userEmail_del}
              >
                Yes
              </Button>
            </Col>
            <Col>
              <Button
                style={{
                  width: "100%",
                  background: "#fff",
                  borderColor: "var(--dvio)",
                  color: "var(--dvio)",
                  outline: "none",
                  boxShadow: "none",
                }}
                onClick={() => setIsVisible(false)}
              >
                No
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <div className="clinicians-tb-bg">
        <div className="clinicians-tb-in">
          <Form.Group>
            <Row>
              <Col>
                <h1 className="fw-bold">User Management</h1>
              </Col>
              <Col>
                <Form.Group className="back-cont">
                  <Form.Label
                    className="text-right mb-2 m-auto um-back-btn"
                    as={Link}
                    to={"/AddUser"}
                    id="addNewClient"
                    style={{ color: "black", borderColor: "var(--vio)" }}
                  >
                    <FontAwesomeIcon
                      id="left-arrow"
                      icon={faPlus}
                      style={{ color: "black" }}
                    ></FontAwesomeIcon>
                    Add New
                  </Form.Label>
                </Form.Group>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <h4>Below shows the list of registered users</h4>
          </Form.Group>
          <Row className="mb-4" style={{ width: "50%" }}>
            <Col id="g">
              <InputGroup className="mb-3">
                <InputGroup.Text id="icon-cont">
                  <FontAwesomeIcon
                    className="searchicon"
                    icon={faMagnifyingGlass}
                  ></FontAwesomeIcon>
                </InputGroup.Text>
                <FormControl placeholder="Search" id="searchinput" />
              </InputGroup>
            </Col>
            <Col>
              <Button
                id="search-btn"
                onClick={searchClient}
                style={{ color: "black" }}
              >
                Search
              </Button>
            </Col>
          </Row>
          <Table className="text-center" responsive="sm" id="clientList">
            <thead>
              <tr>
                <th>Image</th>
                <th>
                  First Name {""}
                  <FontAwesomeIcon
                    style={{ color: "var(--dvio)" }}
                    icon={faArrowUp}
                  ></FontAwesomeIcon>
                </th>
                <th>
                  Last Name {""}
                  <FontAwesomeIcon
                    style={{ color: "var(--dvio)" }}
                    icon={faArrowUp}
                  ></FontAwesomeIcon>
                </th>
                <th>
                  Contact {""}
                  <FontAwesomeIcon
                    style={{ color: "var(--dvio)" }}
                    icon={faArrowUp}
                  ></FontAwesomeIcon>
                </th>
                <th>
                  Email {""}
                  <FontAwesomeIcon
                    style={{ color: "var(--dvio)" }}
                    icon={faArrowUp}
                  ></FontAwesomeIcon>
                </th>
                <th>
                  Username {""}
                  <FontAwesomeIcon
                    style={{ color: "var(--dvio)" }}
                    icon={faArrowUp}
                  ></FontAwesomeIcon>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clinicianClientList.map((val, key) => {
                return (
                  <tr key={key}>
                    <td className="align-middle">
                      <Image
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        src={val.picture}
                      />
                    </td>
                    <td className="align-middle">{val.firstName}</td>
                    <td className="align-middle">{val.lastName}</td>
                    <td className="align-middle">{val.contactNo}</td>
                    <td className="align-middle" id="userEmail">
                      {val.email}
                    </td>
                    <td className="align-middle">{val.username}</td>
                    <td className="align-middle">
                      <FontAwesomeIcon
                        icon={faPencilSquare}
                        style={{
                          fontSize: "30px",
                          color: "var(--dblue)",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          updateUser(val.email);
                        }}
                      ></FontAwesomeIcon>
                    </td>
                    <td className="align-middle">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{
                          fontSize: "24px",
                          color: "var(--dpink)",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          deleteClient(val.email);
                        }}
                      ></FontAwesomeIcon>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
