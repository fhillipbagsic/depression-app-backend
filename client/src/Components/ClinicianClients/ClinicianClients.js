import {
  faMagnifyingGlass,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  InputGroup,
  FormControl,
  Table,
  Spinner,
} from "react-bootstrap";
import { saveAs } from "file-saver";
import ClinicianNav from "../Navbar/ClinicianNav";
import { Link } from "react-router-dom";
import Axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function ClinicianClients() {
  Axios.defaults.withCredentials = true;
  const [clinicianClientList, setclinicianClientList] = useState([]);
  const userEmail = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log(userEmail);
    Axios.get(`/api/users/getpatients?token=${token}`, {
      token: token,
      email: userEmail,
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
  const viewPatient = (email) => {
    console.log(email);
    localStorage.setItem("Client", email);
  };

  const [pdfEmail, setPdfEmail] = useState("");
  const [pdfPic, setpdfPic] = useState("");
  const [pdfFN, setpdfFN] = useState("");
  const [pdfLN, setpdfLN] = useState("");
  const [pdfContact, setpdfContact] = useState("");
  const [pdfClinician, setpdfClinician] = useState("");
  const [trackers, settrackers] = useState([]);
  var myvariable1;
  const getData = (email) => {
    Axios.get(`/api/users/patient?email=${email}`, {
      email: email,
    })
      .then((response) => {
        setPdfEmail(response.data.patient.email);

        setpdfPic(response.data.patient.picture);
        setpdfFN(response.data.patient.firstName);
        setpdfLN(response.data.patient.lastName);
        setpdfContact(response.data.patient.contactNo);
        setpdfClinician(response.data.patient.assignedClinician);

        console.log(response.data);

        console.log("nays");
      })
      .catch((error) => {
        console.log(error);
      });

    Axios.get(`/api/tracker/dailytracker?email=${email}`, {
      email: email,
    })
      .then((response) => {
        settrackers(response.data.dailyTrackers);
        console.log(response.data.dailyTrackers);

        console.log("nays");
      })
      .catch((error) => {
        console.log(error);
      });

    getMeth();
  };

  // const [data] = useState(
  //   trackers.map((item) => [item.firstName, item.lastName])
  // );
  // console.log([data]);

  function getMeth() {
    console.log("f");
    const myJSON = JSON.stringify(trackers);
    const doc = new jsPDF();
    var names = trackers;
    doc.addImage(pdfPic, "JPEG", 20, 20, 50, 50);
    doc.text("Name: " + pdfFN + " " + pdfLN, 80, 30);
    doc.text("Assigned Clinician: " + pdfClinician, 80, 40);
    doc.text("Contact Number: " + pdfContact, 80, 50);
    doc.text("Email: " + pdfEmail, 80, 60);
    // doc.autoTable({
    //   theme: "grid",
    //   head: [["Name", "LastName"]],
    //   body: trackers,
    // });
    doc.save(pdfFN + " " + pdfLN + ".pdf");
  }

  const exportpdf = (
    firstname,
    lastname,
    contactNum,
    picture,
    email,
    clinician
  ) => {
    const doc = new jsPDF();

    console.log(picture);
    doc.addImage(picture, "JPEG", 20, 20, 50, 50);
    doc.text("Name: " + firstname + " " + lastname, 80, 30);

    doc.text("Contact Number: " + contactNum, 80, 40);
    doc.text("Email: " + email, 80, 50);
    doc.save(lastname + " " + firstname + ".pdf");
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
    input = document.getElementById("searchClient");
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

  const exportPDF = (email) => {
    Axios.post(`/api/export/pdf/patient?token=${token}`, {
      email: email,
      token: token,
    }).then((response) => {
      document.getElementById("spin").style.display = "block";

      setTimeout(function() {
        document.getElementById("spin").style.display = "none";

        saveAs(response.data.file, email + ".pdf");
      }, 3000);
    });
  };

  const exportExcel = (email) => {
    Axios.post(`/api/export/excel/patient?token=${token}`, {
      email: email,
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
    <>
      <ClinicianNav />
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
            <h1 className="fw-bold">List of Clients</h1>
          </Form.Group>
          <Form.Group>
            <h4>Below shows the list of clients</h4>
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
                <FormControl placeholder="Search" id="searchClient" />
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
                  Action {""}
                  <FontAwesomeIcon
                    style={{ color: "var(--dvio)" }}
                    icon={faArrowUp}
                  ></FontAwesomeIcon>
                </th>
              </tr>
            </thead>
            <tbody>
              {clinicianClientList.map((val, key) => {
                return (
                  <tr key={key}>
                    <td className="align-middle">
                      <img
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                        src={val.picture}
                      />
                    </td>
                    <td className="align-middle">{val.firstName}</td>
                    <td className="align-middle">{val.lastName}</td>
                    <td className="align-middle">
                      <Button
                        as={Link}
                        to="/Journal"
                        onClick={() => {
                          viewPatient(val.email);
                        }}
                        style={{
                          backgroundColor: "var(--vio)",
                          color: "black",
                          border: "none",
                          width: "100px",
                          outline: "none",
                          boxShadow: "none",
                        }}
                        className="tableBtn-view"
                      >
                        View
                      </Button>

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
                        // onClick={() => {
                        //   exportpdf(
                        //     val.firstName,
                        //     val.lastName,
                        //     val.contactNo,
                        //     val.picture,
                        //     val.email,
                        //     val.assignedClinician
                        //   );
                        // }
                        onClick={() => {
                          exportPDF(val.email);
                        }}
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
                        onClick={() => {
                          exportExcel(val.email);
                        }}
                        className="tableBtn-excel"
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default ClinicianClients;
