import React, { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import ClientNav from "../Navbar/ClientNav";
import Axios from "axios";
function DatePick() {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

  const onChange = (date) => {
    console.log(date2);
    if (date.toString() === date2.toString()) {
      setDate(date);
      localStorage.setItem("Date", date);
      navigate("/EmovaultForm");
    }
  };
  return (
    <div>
      <ClientNav />
      <center>
        <div style={{ width: "70%", height: "100%" }}>
          <Calendar onChange={onChange} value={date} />
          {console.log(date)}
        </div>
      </center>
    </div>
  );
}

export default DatePick;
