import React from "react";

const ProjectionTimes = ({ projectionTimes, selectedTime, onTimeClick }) => {
  return (
    <div className="d-flex px-4 py-2 gap-3">
      {projectionTimes?.map((time, index) => (
        <p
          key={index}
          onClick={() => onTimeClick(time)}
          className={`fw-bold rounded border py-2 px-3 ${
            selectedTime === time ? "selected-time" : ""
          }`}
          style={{ cursor: "pointer", margin: "0" }}
        >
          {time.slice(0, 5)}
        </p>
      ))}
    </div>
  );
};

export default ProjectionTimes;
