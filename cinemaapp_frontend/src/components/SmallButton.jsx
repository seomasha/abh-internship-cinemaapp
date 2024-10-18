import React from "react";

const SmallButton = ({ onClick, icon, disabled }) => {
  const handleClick = (event) => {
    if (!disabled) {
      onClick(event);
    }
  };

  return (
    <div
      className="rounded border d-flex justify-content-center align-items-center p-3"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        pointerEvents: disabled ? "none" : "auto",
        transition: "background-color 0.3s ease",
        backgroundColor: disabled ? "#f0f0f0" : "#fff",
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.target.style.backgroundColor = "#e0e0e0";
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.target.style.backgroundColor = "#fff";
      }}
    >
      {icon}
    </div>
  );
};

export default SmallButton;
