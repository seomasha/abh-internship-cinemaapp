import React from "react";
import "../styles/VenueButton.css";

const VenueButton = ({ id, name, onClick, isSelected }) => {
  return (
    <div className={`venue-button bg-white ${isSelected ? "selected" : ""}`}>
      <h5 key={id} onClick={() => onClick(id)}>
        {name}
      </h5>
    </div>
  );
};

export default VenueButton;
