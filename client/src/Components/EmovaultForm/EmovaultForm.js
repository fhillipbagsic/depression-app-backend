import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Dropdown,
  Container,
  Image,
} from "react-bootstrap";
import ClientNav from "../Navbar/ClientNav";
import Axios from "axios";

import { useNavigate } from "react-router-dom";

import moment from "moment";

function EmovaultForm() {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const datePick_date = localStorage.getItem("Date");
  console.log(datePick_date);
  const [date, setDate] = useState("");
  const [questionoftheday, setquestionoftheday] = useState("");
  const [patientWokeUpAt, setpatientWokeUpAt] = useState("");
  const [patientSleepAt, setpatientSleepAt] = useState("");
  const [patientTotalHours, setpatientTotalHours] = useState("");
  const [patientMoodsFeelings, setpatientMoodsFeelings] = useState("");
  const [patientTriggers, setpatientTriggers] = useState("");
  const [formOther, setformOther] = useState("");
  const [patientConcentration, setpatientConcentration] = useState("");
  const [patientSocialEngagement, setpatientSocialEngagement] = useState("");
  const [patientAlone, setpatientAlone] = useState(false);
  const token = localStorage.getItem("token");
  var dateTime = moment(datePick_date)
    .format("MM/DD/YYYY")
    .toString();
  const [showDate, setShowDate] = useState(dateTime);
  useEffect(() => {
    Axios.get(`/api/tracker/questionoftheday?token=${token}`, {
      token: token,
    }).then((response) => {
      setquestionoftheday(response.data.question);
      console.log(response.data);
    });
  }, []);

  const [psquestion, setpsquestion] = useState("");
  const [psenergize, setenergize] = useState("");

  const [pstired, settired] = useState("");

  const [psrefreshed, setrefreshed] = useState("");

  const [psweak, setweak] = useState("");

  const [psachy, setachy] = useState("");

  const [pssluggish, setsluggish] = useState("");

  const [psnumb, setnumb] = useState("");

  const [psrelax, setpsrelax] = useState("");

  const [pswellstressed, setwellstressed] = useState("");

  const [psfatigue, setpsfatigue] = useState("");

  const [psjittery, setjittery] = useState("");

  const [psstrong, setstrong] = useState("");

  const [read, setread] = useState(true);
  const [preferAlone, setpreferAlone] = useState(false);

  const getRange = () => {
    const slider = document.getElementById("myRange").value;
    const slideValue = document.getElementById("slideValue");
    slideValue.innerHTML = slider;
    console.log(slider);
  };

  const setTotalHrs = () => {
    var yesterday = moment()
      .subtract(1, "days")
      .format("MM/DD/YYYY")
      .toString();
    console.log(yesterday);
    const l = document.getElementById("time").value;
    const l2 = document.getElementById("time2").value;

    if (l !== "" && l2 !== "") {
      const m = moment(new Date(yesterday + " " + l));
      console.log(m);
      var startTime = moment(yesterday + " " + l, "MM/DD/YYYY hh:mm");
      var lk = moment(yesterday).startOf(startTime);
      var endTime = moment(l2, "hh:mm");
      //  var lk2 = moment().date.startOf(endTime);
      console.log(startTime);
      console.log(endTime);

      var totalSec = endTime.diff(startTime, "seconds");

      var hours = parseInt(totalSec / 3600) % 24;
      var minutes = parseInt(totalSec / 60) % 60;
      var seconds = totalSec % 60;

      var result =
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds);

      console.log(hours);
      console.log(minutes);
      console.log(seconds);
      console.log(result);
      const l3 = (document.getElementById("totalHr").value = result);
    }
  };

  const checkCheckBox = () => {
    document.getElementById("psErr").style.display = "none";
    document.getElementById("saErr").style.display = "none";
    document.getElementById("wauErr").style.display = "none";
    document.getElementById("socErr").style.display = "none";
    document.getElementById("tErr").style.display = "none";
    document.getElementById("mferror").style.display = "none";
    //

    document.getElementById("psErr").style.display = "none";
    if (document.getElementById("energized").checked) {
      setenergize("ENERGIZED");
    } else {
      setenergize("");
    }

    if (document.getElementById("TIRED").checked) {
      settired("TIRED");
    } else {
      settired("");
    }

    if (document.getElementById("REFRESHED").checked) {
      setrefreshed("REFRESHED");
    } else {
      setrefreshed("");
    }

    if (document.getElementById("WEAK").checked) {
      setweak("WEAK");
    } else {
      setweak("");
    }

    if (document.getElementById("ACHY").checked) {
      setachy("ACHY");
    } else {
      setachy("");
    }

    if (document.getElementById("SLUGGISH").checked) {
      setsluggish("SLUGGISH");
    } else {
      setsluggish("");
    }

    if (document.getElementById("FATIGUE").checked) {
      setpsfatigue("FATIGUE");
    } else {
      setpsfatigue("");
    }

    if (document.getElementById("NUMB").checked) {
      setnumb("NUMB");
    } else {
      setnumb("");
    }

    if (document.getElementById("RELAXED").checked) {
      setpsrelax("RELAXED");
    } else {
      setpsrelax("");
    }

    if (document.getElementById("WELL-STRESSED").checked) {
      setwellstressed("WELL-STRESSED");
    } else {
      setwellstressed("");
    }

    if (document.getElementById("JITTERY").checked) {
      setjittery("JITTERY");
    } else {
      setjittery("");
    }

    if (document.getElementById("STRONG").checked) {
      setstrong("STRONG");
    } else {
      setstrong("");
    }

    var checkBox = document.getElementById("checkO");
    var otherId = document.getElementById("otherId");

    if (checkBox.checked === true) {
      setread(false);
    }
    if (checkBox.checked === false) {
      setread(true);
      otherId.value = "";
    }

    var social = document.getElementById("social");
    var prefAlone = document.getElementById("prefAlone");
    if (prefAlone.checked === true) {
      setpreferAlone(true);
      social.value = "I preferred to be alone today";
    }
    if (prefAlone.checked === false) {
      setpreferAlone(false);
    }
  };

  //show health habit
  const showHealthHabit = () => {
    document.getElementById("hh-form").style.display = "block";
    document.getElementById("dt-form").style.display = "none";
    document.getElementById("emv-btn-hh").style.backgroundColor = "#a1efff";
    document.getElementById("emv-btn-hh").style.borderColor = "#a1efff";
    document.getElementById("emv-btn-dt").style.backgroundColor = "#fff";
    document.getElementById("emv-btn-dt").style.borderColor = "#fff";
  };

  const showDailyTracker = () => {
    document.getElementById("hh-form").style.display = "none";
    document.getElementById("dt-form").style.display = "block";
    document.getElementById("emv-btn-hh").style.backgroundColor = "#fff";
    document.getElementById("emv-btn-hh").style.borderColor = "#fff";
    document.getElementById("emv-btn-dt").style.backgroundColor = "#a1efff";
    document.getElementById("emv-btn-dt").style.borderColor = "#a1efff";
  };

  const submitDt = () => {
    // date value
    const focusRange = document.getElementById("myRange").value;
    const todayDate = document.getElementById("date-dt").innerHTML;
    console.log(document.getElementById("time").value);
    if (
      document.getElementById("energized").checked === false &&
      document.getElementById("TIRED").checked === false &&
      document.getElementById("REFRESHED").checked === false &&
      document.getElementById("WEAK").checked === false &&
      document.getElementById("ACHY").checked === false &&
      document.getElementById("SLUGGISH").checked === false &&
      document.getElementById("FATIGUE").checked === false &&
      document.getElementById("NUMB").checked === false &&
      document.getElementById("RELAXED").checked === false &&
      document.getElementById("WELL-STRESSED").checked === false &&
      document.getElementById("JITTERY").checked === false &&
      document.getElementById("STRONG").checked === false &&
      document.getElementById("checkO").checked === false
    ) {
      document.getElementById("psErr").style.display = "block";
    }

    if (document.getElementById("time").value == "") {
      document.getElementById("saErr").style.display = "block";
    }

    if (document.getElementById("time2").value == "") {
      document.getElementById("wauErr").style.display = "block";
    }

    if (
      document.getElementById("prefAlone").checked === false ||
      document.getElementById("social").value == ""
    ) {
      document.getElementById("socErr").style.display = "block";
    }

    if (document.getElementById("trig").value == "") {
      document.getElementById("tErr").style.display = "block";
    }

    if (document.getElementById("moodF").value == "") {
      document.getElementById("mferror").style.display = "block";
    }
    if (
      (document.getElementById("energized").checked ||
        document.getElementById("TIRED").checked ||
        document.getElementById("REFRESHED").checked ||
        document.getElementById("WEAK").checked ||
        document.getElementById("ACHY").checked ||
        document.getElementById("SLUGGISH").checked ||
        document.getElementById("FATIGUE").checked ||
        document.getElementById("NUMB").checked ||
        document.getElementById("RELAXED").checked ||
        document.getElementById("WELL-STRESSED").checked ||
        document.getElementById("JITTERY").checked ||
        document.getElementById("STRONG").checked ||
        document.getElementById("checkO").checked ||
        document.getElementById("prefAlone").checked ||
        document.getElementById("social").value !== "") &&
      document.getElementById("moodF").value !== "" &&
      document.getElementById("trig").value !== "" &&
      document.getElementById("time").value !== "" &&
      document.getElementById("time2").value !== ""
    ) {
      const ttlhr = document.getElementById("totalHr").value;
      const pl = document.getElementById("social").value;
      Axios.post("/api/tracker/dailytracker", {
        token: token,
        date: todayDate,
        sleepAt: patientSleepAt,
        wokeUpAt: patientWokeUpAt,
        totalHours: ttlhr,
        moodOrFeelings: patientMoodsFeelings,
        triggers: patientTriggers,
        physicalSymptoms:
          psenergize +
          " " +
          pstired +
          " " +
          psrefreshed +
          " " +
          psweak +
          " " +
          psachy +
          " " +
          pssluggish +
          " " +
          psnumb +
          " " +
          psrelax +
          " " +
          pswellstressed +
          " " +
          psfatigue +
          " " +
          psjittery +
          " " +
          psstrong,
        others: formOther,
        concentrationOrFocus: focusRange,
        socialEngagement: pl,
        preferredToBeAloneToday: patientAlone,
      })
        .then((response) => {
          console.log(response.data);
          document.getElementById("pop-message").innerHTML =
            "You successfully submitted your daily tracker";
          setIsVisible(true);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          alert(error.response.data.message);
          if (
            error.response.data.message ===
            "Patient has already logged today's daily tracker"
          ) {
            navigate("/DatePick");
            window.location.reload();
          }
        });
    }
  };

  const hidemsg = () => {
    document.getElementById("errorHHMsg").style.display = "none";
  };
  const submitHh = () => {
    // date value
    // const p = document.getElementById("date-dt").innerHTML; errorHHMsg
    const todayDate = document.getElementById("date-dt").innerHTML;
    const ans = document.getElementById("ans").value;
    const p = document.getElementById("qotd").innerHTML;
    if (ans === "") {
      document.getElementById("errorHHMsg").style.display = "block";
      document.getElementById("errorHHMsg").innerHTML = "Please input answer";
    }
    if (ans !== "") {
      console.log(p);
      Axios.post("/api/tracker/healthhabit", {
        token: token,
        searchDate: todayDate,
        question: p,
        answer: psquestion,
      })
        .then((response) => {
          console.log(response);
          document.getElementById("pop-message").innerHTML =
            "You successfully submitted your health habit";
          setIsVisible(true);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.message);
          alert(error.response.data.message);
          if (
            error.response.data.message ===
            "Patient has already logged today's health habit"
          ) {
            navigate("/DatePick");
            window.location.reload();
          }
        });
    }
  };

  const close = () => {
    setIsVisible(false);
  };

  const back = () => {
    navigate("/DatePick");
  };
  return (
    <div>
      <ClientNav />
      <div
        className="updateClientBg"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="updateClientIn" style={{ padding: "50px" }}>
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
                background: "var(--green)",
                borderColor: "var(--green)",
                color: "black",
                outline: "none",
                boxShadow: "none",
              }}
              onClick={close}
            >
              Close
            </Button>
          </Row>
        </div>
      </div>
      <div className="emv-bg">
        <Row className="form-container">
          <Form.Group className="text-center mb-3">
            <Row>
              <Col id="col">
                <Form.Label id="emv-btn-dt" onClick={showDailyTracker}>
                  Daily Tracker
                </Form.Label>
              </Col>
              <Col id="col2">
                <Form.Label id="emv-btn-hh" onClick={showHealthHabit}>
                  Health Habit
                </Form.Label>
              </Col>
            </Row>
          </Form.Group>
          <Form id="dt-form">
            <Form.Group>
              <Row className="mb-3">
                <Col>
                  <Form.Label className="fw-bold">Date:</Form.Label>
                  <Form.Group
                    style={{
                      width: "100%",
                      background: "white",
                      borderRadius: "5px",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "#ced4da",
                      padding: "0px 0px 0px 10px",
                      overflow: "hidden",
                    }}
                  >
                    <Form.Label
                      style={{
                        padding: "5px 0px 0px 0px",
                        width: "100%",
                      }}
                      id="date-dt"
                    >
                      {showDate}
                    </Form.Label>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label className="fw-bold">Sleep At:</Form.Label>
                  <Form.Control
                    type="time"
                    id="time"
                    onClick={checkCheckBox}
                    onInput={setTotalHrs}
                    onChange={(event) => {
                      setpatientSleepAt(event.target.value);
                    }}
                  />
                  <Form.Label
                    className="mt-2"
                    id="saErr"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      display: "none",
                    }}
                  >
                    Please add time
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="fw-bold">Woke Up At:</Form.Label>
                  <Form.Control
                    type="time"
                    id="time2"
                    onClick={checkCheckBox}
                    onInput={setTotalHrs}
                    onChange={(event) => {
                      setpatientWokeUpAt(event.target.value);
                    }}
                  />
                  <Form.Label
                    className="mt-2"
                    id="wauErr"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      display: "none",
                    }}
                  >
                    Please add time
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="fw-bold">Total hrs:</Form.Label>
                  <Form.Control
                    type="text"
                    onClick={checkCheckBox}
                    id="totalHr"
                    readOnly
                    style={{ background: "white" }}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label className="fw-bold">Mood/Feelings</Form.Label>
                  <Form.Control
                    id="moodF"
                    as="textarea"
                    onClick={checkCheckBox}
                    rows={3}
                    onChange={(event) => {
                      setpatientMoodsFeelings(event.target.value);
                    }}
                  />
                  <Form.Label
                    className="mt-2"
                    id="mferror"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      display: "none",
                    }}
                  >
                    Please add mood
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Label className="fw-bold">Triggers</Form.Label>
                  <Form.Control
                    id="trig"
                    as="textarea"
                    rows={3}
                    onClick={checkCheckBox}
                    onChange={(event) => {
                      setpatientTriggers(event.target.value);
                    }}
                  />
                  <Form.Label
                    className="mt-2"
                    id="tErr"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      display: "none",
                    }}
                  >
                    Please add triggers
                  </Form.Label>
                </Col>
              </Row>
              <Row>
                <Form.Label className="fw-bold">Physical Symptoms</Form.Label>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Check
                    type="checkbox"
                    label="ENERGIZED"
                    id="energized"
                    value={psenergize}
                    onClick={checkCheckBox}
                  />
                  <Form.Check
                    type="checkbox"
                    label="TIRED"
                    id="TIRED"
                    value={pstired}
                    onClick={checkCheckBox}
                  />
                  <Form.Check
                    type="checkbox"
                    id="REFRESHED"
                    value={psrefreshed}
                    label="REFRESHED"
                    onClick={checkCheckBox}
                  />
                  <Form.Check
                    type="checkbox"
                    value={psweak}
                    label="WEAK"
                    id="WEAK"
                    onClick={checkCheckBox}
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    label="ACHY"
                    onClick={checkCheckBox}
                    id="ACHY"
                    value={psachy}
                  />
                  <Form.Check
                    type="checkbox"
                    label="SLUGGISH"
                    name="SLUGGISH"
                    id="SLUGGISH"
                    value={pssluggish}
                    onClick={checkCheckBox}
                  />
                  <Form.Check
                    type="checkbox"
                    label="FATIGUE"
                    value={psfatigue}
                    onClick={checkCheckBox}
                    id="FATIGUE"
                  />
                  <Form.Check
                    type="checkbox"
                    value={psnumb}
                    onClick={checkCheckBox}
                    label="NUMB"
                    id="NUMB"
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    value={psrelax}
                    label="RELAXED"
                    onClick={checkCheckBox}
                    id="RELAXED"
                  />
                  <Form.Check
                    type="checkbox"
                    value={pswellstressed}
                    label="WELL-STRESSED"
                    onClick={checkCheckBox}
                    id="WELL-STRESSED"
                  />
                  <Form.Check
                    type="checkbox"
                    value={psjittery}
                    onClick={checkCheckBox}
                    label="JITTERY"
                    id="JITTERY"
                  />
                  <Form.Check
                    type="checkbox"
                    value={psstrong}
                    onClick={checkCheckBox}
                    label="STRONG"
                    id="STRONG"
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    label="OTHERS"
                    id="checkO"
                    onClick={checkCheckBox}
                  />
                  <Form.Control
                    as="textarea"
                    id="otherId"
                    readOnly={read}
                    onChange={(e) => {
                      setformOther(e.target.value);
                    }}
                  />
                </Col>
                <Form.Label
                  className="mt-2"
                  id="psErr"
                  style={{ color: "red", fontWeight: "bold", display: "none" }}
                >
                  Please check one or more physical symptoms
                </Form.Label>
              </Row>
              <Row className="mb-4">
                <Col>
                  <Form.Group className="slideContainer">
                    <Row>
                      <Col>
                        <Form.Label className="fw-bold">
                          Concentration/Focus
                        </Form.Label>
                      </Col>
                      <Col
                        style={{
                          textAlign: "right",
                        }}
                      >
                        <Form.Label
                          id="slideValue"
                          style={{
                            textAlign: "right",
                            background: "var(--dblue)",
                            padding: "0px 10px",
                            borderRadius: "5px",
                            color: "white",
                          }}
                        >
                          6
                        </Form.Label>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Control
                    type="range"
                    min="1"
                    max="10"
                    onClick={checkCheckBox}
                    id="myRange"
                    onInput={getRange}
                    style={{ width: "100%" }}
                  ></Form.Control>
                </Col>
                <Col>
                  <Form.Label className="fw-bold">Social Engagement</Form.Label>
                  <Form.Control
                    as="textarea"
                    id="social"
                    readOnly={preferAlone}
                    onClick={checkCheckBox}
                  />

                  <Col>
                    <Form.Check
                      type="checkbox"
                      id="prefAlone"
                      onClick={checkCheckBox}
                      label="I preferred to be alone today"
                      value={patientAlone}
                    />
                  </Col>
                  <Form.Label
                    className="mt-2"
                    id="socErr"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      display: "none",
                    }}
                  >
                    Please add social engagement
                  </Form.Label>
                </Col>
              </Row>
              <Row className="emo-dt-cancel-submit">
                <Col>
                  <Button
                    id="emo-dt-cancel"
                    onClick={back}
                    style={{ color: "black" }}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    id="emo-dt-submit"
                    onClick={submitDt}
                    style={{ color: "black" }}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
          <Form id="hh-form">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Date:</Form.Label>
              <Form.Group
                style={{
                  width: "100%",
                  background: "white",
                  borderRadius: "5px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "#ced4da",
                  padding: "0px 0px 0px 10px",
                  overflow: "hidden",
                }}
              >
                <Form.Label
                  style={{
                    padding: "5px 0px 0px 0px",
                    width: "100%",
                  }}
                  id="date-dt"
                >
                  {showDate}
                </Form.Label>
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold" id="qotd">
                {questionoftheday}
              </Form.Label>
              <Form.Control
                className="mb-3"
                as="textarea"
                rows="6"
                id="ans"
                onClick={hidemsg}
                onChange={(e) => {
                  setpsquestion(e.target.value);
                }}
              />
              <Form.Text
                id="errorHHMsg"
                style={{
                  width: "100%",
                  background: "red",
                  color: "white",
                  padding: "10px",
                  display: "none",
                }}
              ></Form.Text>
            </Form.Group>

            <Row className="emo-hh-cancel-submit">
              <Col>
                <Button
                  id="emo-hh-cancel"
                  onClick={back}
                  style={{ color: "black" }}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button
                  id="emo-hh-submit"
                  onClick={submitHh}
                  style={{ color: "black" }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </div>
    </div>
  );
}

export default EmovaultForm;
