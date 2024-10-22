import React from "react";
import "../styles/DayPicker.css";

const DayPicker = ({ day, date, isSelected, onSelect }) => {
  return (
    <div
      className={`day-picker border d-flex flex-column justify-content-center align-items-center py-4 px-5 rounded ${
        isSelected ? "bg-picker" : ""
      }`}
      onClick={onSelect}
    >
      <h5 className="fw-bold">{date}</h5>
      <h6 className="fw-light">{day}</h6>
    </div>
  );
};

export default DayPicker;
