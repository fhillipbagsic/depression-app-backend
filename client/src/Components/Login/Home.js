import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  setTimeout(function() {
    navigate("/Login");
    window.location.reload();
  }, 3000);
  return (
    <div className="home-bg">
      <div
        className="home-logName"
        id="bg"
        style={{ margin: "auto", textAlign: "center", fontWeight: "bold" }}
      >
        <img src={process.env.PUBLIC_URL + "/client.png"} alt="" id="homeImg" />
      </div>
    </div>
  );
}

export default Home;
