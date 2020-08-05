import React from "react";

import "./InfoBar.css";
import closeIcon from "../../Icons/closeIcon.png";
import onlineIcon from "../../Icons/onlineIcon.png";

const InfoBar = ({ room }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>Room: {room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img className="" src={closeIcon} alt="close icon" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
