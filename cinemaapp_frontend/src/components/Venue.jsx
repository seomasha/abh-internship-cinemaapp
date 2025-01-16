import React from "react";
import { useNavigate } from "react-router-dom";

const Venue = ({ id, image, title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/venues/${id}`);
  };

  return (
    <div
      className="col-6 border rounded-3 shadow-sm pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        style={{ width: "100%", borderRadius: "24px" }}
        height={400}
        className="p-3"
      />
      <h5 className="pb-2 px-3">{title}</h5>
    </div>
  );
};

export default Venue;
