import React from "react";

const SmallButton = ({ onClick, icon, disabled }) => {
  const handleClick = (event) => {
    if (!disabled) {
      onClick(event);
    }
  };

  return (
    <div
      className={`rounded border d-flex justify-content-center align-items-center p-3 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={handleClick}
      style={{ pointerEvents: disabled ? "none" : "auto" }}
    >
      {icon}
    </div>
  );
};

export default SmallButton;
