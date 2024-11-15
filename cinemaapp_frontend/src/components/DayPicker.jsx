import React from "react";
import "../styles/DayPicker.css";

const DayPicker = ({ day, date, isSelected, onSelect, small }) => {
  return (
    <div
      className={`day-picker border d-flex flex-column justify-content-center align-items-center ${
        small ? "py-2 px-4" : "py-4 px-5"
      } rounded ${isSelected ? "bg-picker" : ""}`}
      onClick={onSelect}
    >
      <h6 className="fw-bold text-nowrap">{date}</h6>
      <h6 className="fw-light">{day}</h6>
    </div>
  );
};

export default DayPicker;
