import React from "react";
import "../styles/Separator.css";

const Separator = ({ text = "or" }) => {
  return (
    <div className="separator mt-4">
      <div className="line"></div>
      <span className="separator-text">{text}</span>
      <div className="line"></div>
    </div>
  );
};

export default Separator;
