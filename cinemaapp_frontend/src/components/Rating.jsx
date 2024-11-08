import React from "react";
import { FaRegStar } from "react-icons/fa";

const Rating = ({ value, source }) => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center gap-2 border rounded p-3 w-md-auto">
      <FaRegStar size={20} className="primary-red" />
      <div className="d-flex flex-column flex-md-col text-center text-md-start align-items-center align-items-md-start">
        <h6>{value}</h6>
        <p>{source}</p>
      </div>
    </div>
  );
};

export default Rating;
