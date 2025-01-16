import React from "react";
import { useNavigate } from "react-router-dom";

const VenueCard = ({ id, image, title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/venues/${id}`);
  };

  return (
    <div
      className="col-6 border rounded-4 shadow-sm pointer w-100"
      onClick={handleClick}
    >
      <div
        style={{
          width: "100%",
          height: "400px",
          overflow: "hidden",
        }}
        className="p-3"
      >
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px"
          }}
        />
      </div>
      <h5 className="pb-2 px-3">{title}</h5>
    </div>
  );
};

export default VenueCard;
