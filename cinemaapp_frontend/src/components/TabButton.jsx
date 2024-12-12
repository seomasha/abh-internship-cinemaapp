import React from "react";

import "../styles/TabButton.css";

const TabButton = ({ isActive, onClick, label }) => {
  return (
    <button
      className={`custom-tab ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
