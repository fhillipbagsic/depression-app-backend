import {
  faArrowUp,
  faMagnifyingGlass,
  faAngleDoubleLeft,
  faPencilSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
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
import { saveAs } from "file-saver";
import { Link, useLocation, useParams } from "react-router-dom";
import EmoNavbar from "../Navbar/EmoNavbar";
import moment from "moment";

function ListClients() {
  Axios.defaults.withCredentials = true;
  const [clientList, setclientList] = useState([]);
  const [clinicianName, setclinicianName] = useState("");

  const cEmail = JSON.parse(localStorage.getItem("Clinician")).email;
  const cName = JSON.parse(localStorage.getItem("Clinician")).name;
  console.log(cEmail);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setclinicianName(cName);
    Axios.get(`/api/users/getpatients?token=${token}&email=${cEmail}`, {
      email: cEmail,
      token: token,
    })
      .then((response) => {
        setclientList(response.data.patients);
        console.log(response.data);
        console.log("nays");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const exportPDF = () => {
    Axios.post(`/api/export/pdf/clinician?token=${token}`, {
      email: cEmail,
      token: token,
    }).then((response) => {
      document.getElementById("spin").style.display = "block";

      setTimeout(function() {
        saveAs(response.data.file, cName + ".pdf");

        window.print();
      }, 3000);
    });
  };

  const exportExcel = () => {
    Axios.post(`/api/export/excel/clinician?token=${token}`, {
      email: cEmail,
      token: token,
    }).then((response) => {
      document.getElementById("spin").style.display = "block";

      setTimeout(function() {
        document.getElementById("spin").style.display = "none";

        window.open(response.data.file);
      }, 3000);
    });
  };

  const winprint = () => {
    document.getElementById("spin").style.display = "block";

    setTimeout(function() {
      document.getElementById("spin").style.display = "none";

      window.print();
    }, 3000);
  };

  return (
    <div>
      <EmoNavbar />
      <div className="clearfix">
        <div
          id="spin"
          style={{ display: "none", float: "right", marginTop: "5px" }}
          className="spinner-border float-right"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <div className="clinicians-tb-bg">
        <div className="clinicians-tb-in">
          <Form.Group>
            <Row>
              <Col style={{ padding: 0 }}>
                <h1 className="fw-bold">List of Clients</h1>
              </Col>
              <Col>
                <Form.Group className="back-cont">
                  <Form.Label
                    className="text-right mb-2 lc-back-btn"
                    as={Link}
                    to="/ClinicianList"
                    style={{
                      background: "var(--green)",
                      color: "black",
                      border: "none",
                      padding: "2%",
                      outline: "none",
                      boxShadow: "none",
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
          <Form.Group>
            <Row className="mb-3">
              <Col xs="auto" style={{ padding: 0 }}>
                <Form.Label style={{ fontSize: "20px" }}>
                  Below shows the list of registered users of
                </Form.Label>
              </Col>
              <Col
                style={{
                  color: "var(--dgreen)",
                  cursor: "pointer",
                }}
              >
                <Form.Label
                  style={{ textDecoration: "none", fontSize: "20px" }}
                  as={Link}
                  to={"/PreviewAccount"}
                >
                  {clinicianName}
                </Form.Label>
              </Col>
              <Col>
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "var(--pink)",
                      color: "black",
                      border: "none",
                      width: "100px",
                      outline: "none",
                      boxShadow: "none",
                    }}
                    className="tableBtn-pdf"
                    onClick={exportPDF}
                  >
                    PDF
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "var(--green)",
                      color: "black",
                      border: "none",
                      width: "100px",
                      outline: "none",
                      boxShadow: "none",
                    }}
                    className="tableBtn-excel"
                    onClick={exportExcel}
                  >
                    Excel
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "var(--blue)",
                      color: "black",
                      border: "none",
                      width: "100px",
                      outline: "none",
                      boxShadow: "none",
                    }}
                    className="tableBtn-print"
                    onClick={winprint}
                  >
                    PRINT
                  </Button>
                </Col>
              </Col>
            </Row>
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
              <Button id="lc-search-btn" style={{ color: "black" }}>
                Search
              </Button>
            </Col>
          </Row>
          <Table className="text-center" responsive="sm">
            <thead>
              <tr>
                <th>Image</th>
                <th>
                  First Name {""}
                  <FontAwesomeIcon
                    style={{ color: "var(--dgreen)" }}
                    icon={faArrowUp}
                  ></FontAwesomeIcon>
                </th>
                <th>
                  Last Name {""}
                  <FontAwesomeIcon
                    style={{ color: "var(--dgreen)" }}
                    icon={faArrowUp}
                  ></FontAwesomeIcon>
                </th>
                <th>
                  Username {""}
                  <FontAwesomeIcon
                    style={{ color: "var(--dgreen)" }}
                    icon={faArrowUp}
                  ></FontAwesomeIcon>
                </th>
                <th>
                  Date Added {""}
                  <FontAwesomeIcon
                    style={{ color: "var(--dgreen)" }}
                    icon={faArrowUp}
                  ></FontAwesomeIcon>
                </th>
              </tr>
            </thead>
            <tbody>
              {clientList.map((val, key) => {
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
                    <td className="align-middle">{val.username}</td>
                    <td className="align-middle">
                      {moment(val.dateAdded).format("MM/DD/YYYY")}
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

export default ListClients;
