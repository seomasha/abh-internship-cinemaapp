import React from "react";

const Roadmap = ({ step }) => {
  return (
    <div className="step d-flex align-items-center my-4">
      <div className="mt-4">
        <div className={step === 1 ? "circle-selected" : "circle-filled"}>
          1
        </div>
        <p className="mt-3">General</p>
      </div>
      <div className={step > 1 ? "line-filled" : "line"}></div>
      <div className="mt-4">
        <div
          className={
            step === 2
              ? "circle-selected"
              : step > 2
              ? "circle-filled"
              : "circle"
          }
        >
          2
        </div>
        <p className="mt-3">Details</p>
      </div>
      <div className={step > 2 ? "line-filled" : "line"}></div>
      <div className="mt-4">
        <div className={step === 3 ? "circle-selected" : "circle"}>3</div>
        <p className="mt-3">Venues</p>
      </div>
    </div>
  );
};

export default Roadmap;
