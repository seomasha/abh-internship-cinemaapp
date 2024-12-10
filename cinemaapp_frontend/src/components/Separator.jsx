import React from "react";
import "../styles/Separator.css";

const Separator = ({ text = "or", dark = false }) => {
  return (
    <div className="separator mt-4">
      <div className={dark ? "line-dark" : "line"}></div>
      <span className={dark ? "separator-text-dark" : "separator-text"}>
        {text}
      </span>
      <div className={dark ? "line-dark" : "line"}></div>
    </div>
  );
};

export default Separator;
