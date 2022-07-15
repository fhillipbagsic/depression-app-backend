import {
  faAngleDoubleLeft,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import ClinicianNav from "../Navbar/ClinicianNav";
import Axios from "axios";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
function Journal() {
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  const getPatientEmail = localStorage.getItem("Client");
  const showHealthHabit = () => {
    document.getElementById("hh-journal").style.display = "block";
    document.getElementById("dt-journal").style.display = "none";
    document.getElementById("journal-btn-hh").style.backgroundColor =
      "var(--vio)";
    document.getElementById("journal-btn-dt").style.backgroundColor = "#fff";
  };

  const showDailyTracker = () => {
    document.getElementById("hh-journal").style.display = "none";
    document.getElementById("dt-journal").style.display = "block";
    document.getElementById("journal-btn-hh").style.backgroundColor = "#fff";

    document.getElementById("journal-btn-dt").style.backgroundColor =
      "var(--vio)";
  };

  const [patientInfo, setpatientInfo] = useState("");
  const [patientName, setpatientName] = useState("");
  const [patientEmail, setpatientEmail] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log(getPatientEmail);
    Axios.get(
      `/api/users/patient?token=${token}&email=${getPatientEmail}`,
      { email: getPatientEmail, token: token }
    )
      .then((response) => {
        setpatientInfo(response.data.patient.picture);
        setpatientEmail(response.data.patient.email);
        setpatientName(
          response.data.patient.firstName + " " + response.data.patient.lastName
        );
        console.log(response.data.patient);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [tracker, setTracker] = useState([]);
  useEffect(() => {
    console.log(getPatientEmail);
    Axios.get(
      `/api/tracker/dailytracker?token=${token}&email=${getPatientEmail}`,
      { email: getPatientEmail, token: token }
    )
      .then((response) => {
        setTracker(response.data.dailyTrackers);
        console.log(response.data);
        console.log("nays");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [healthHabit, sethealthHabit] = useState([]);
  useEffect(() => {
    console.log(getPatientEmail);
    Axios.get(
      `/api/tracker/healthhabit?token=${token}&email=${getPatientEmail}`,
      { email: getPatientEmail, token: token }
    )
      .then((response) => {
        sethealthHabit(response.data.healthHabits);
        console.log(response.data);
        console.log("nays");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const back = () => {
    navigate("/ClinicianClients");
    window.location.reload();
  };
  

  return (
    <>
      <ClinicianNav />
      <div className="clinician-journal-bg">
        <div className="clinician-journal-in">
          <Form.Group className="journal-back-cont">
            <Form.Label
              className="text-right mb-5 journal-back-btn"
              onClick={back}
              id="backDT"
              style={{ color: "black", border: "none", padding: "1%" }}
            >
              <FontAwesomeIcon
                id="left-arrow"
                icon={faAngleDoubleLeft}
              ></FontAwesomeIcon>
              Back
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Row className="mb-3">
              <img
                style={{
                  borderRadius: "100%",
                  width: "100px",
                  height: "100px",
                  borderStyle: "solid",
                  borderWidth: "5px",
                  borderColor: "var(--dvio)",
                  objectFit: "cover",
                  padding: 0,
                  marginBottom: "10px",
                }}
                src={patientInfo}
              />
              <Col style={{ margin: "auto 0px" }}>
                <h1>{patientName}</h1>
                <h5 style={{ color: "gray" }}>{patientEmail}</h5>
              </Col>
              <Form.Group
                style={{
                  display: "flex",
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >
                <Form.Label
                  className="journal-btn-dt"
                  id="journal-btn-dt"
                  onClick={showDailyTracker}
                >
                  Daily Tracker
                </Form.Label>
                <Form.Label
                  className="journal-btn-hh"
                  id="journal-btn-hh"
                  onClick={showHealthHabit}
                >
                  Health Habit
                </Form.Label>
              </Form.Group>
            </Row>
          </Form.Group>
          <Form.Group id="dt-journal">
            <Table className="text-center" responsive="sm">
              <thead>
                <tr>
                  <th>
                    Date {""}
                    <FontAwesomeIcon
                      style={{ color: "var(--dvio)" }}
                      icon={faArrowUp}
                    ></FontAwesomeIcon>
                  </th>
                  <th>
                    Mood {""}
                    <FontAwesomeIcon
                      style={{ color: "var(--dvio)" }}
                      icon={faArrowUp}
                    ></FontAwesomeIcon>
                  </th>
                  <th>
                    Trigger {""}
                    <FontAwesomeIcon
                      style={{ color: "var(--dvio)" }}
                      icon={faArrowUp}
                    ></FontAwesomeIcon>
                  </th>
                  <th>
                    Physical {""}
                    <FontAwesomeIcon
                      style={{ color: "var(--dvio)" }}
                      icon={faArrowUp}
                    ></FontAwesomeIcon>
                  </th>
                  <th>
                    Concentration {""}
                    <FontAwesomeIcon
                      style={{ color: "var(--dvio)" }}
                      icon={faArrowUp}
                    ></FontAwesomeIcon>
                  </th>
                  <th>
                    Social Engagement {""}
                    <FontAwesomeIcon
                      style={{ color: "var(--dvio)" }}
                      icon={faArrowUp}
                    ></FontAwesomeIcon>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tracker.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.date}</td>
                      <td>{val.moodOrFeelings}</td>
                      <td>{val.triggers}</td>
                      <td>
                        {val.physicalSymptoms} {val.others}
                      </td>
                      <td>{val.concentrationOrFocus}</td>
                      <td>{val.socialEngagement}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Form.Group>
          <Form.Group id="hh-journal">
            <Table className="text-center" responsive="sm">
              <thead>
                <tr>
                  <th>
                    Date {""}
                    <FontAwesomeIcon
                      style={{ color: "var(--dvio)" }}
                      icon={faArrowUp}
                    ></FontAwesomeIcon>
                  </th>
                  <th>
                    Question {""}
                    <FontAwesomeIcon
                      style={{ color: "var(--dvio)" }}
                      icon={faArrowUp}
                    ></FontAwesomeIcon>
                  </th>
                  <th>
                    Answer {""}
                    <FontAwesomeIcon
                      style={{ color: "var(--dvio)" }}
                      icon={faArrowUp}
                    ></FontAwesomeIcon>
                  </th>
                </tr>
              </thead>
              <tbody>
                {healthHabit.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{moment(val.date).format("MM/DD/YYYY")}</td>
                      <td>{val.question}</td>
                      <td>{val.answer}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Form.Group>
        </div>
      </div>
    </>
  );
}

export default Journal;
