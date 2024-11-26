import React from "react";
import "../styles/Card.css";

const Card = ({ title, subtitle, genre, imageUrl, showDateLabel }) => {
  const formatUpcomingDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return date.toLocaleDateString("default", options);
  };

  return (
    <div
      className={`rounded-5 p-3 bg-white border shadow text-black ${
        showDateLabel ? "card-container-upcoming" : "card-container"
      } position-relative`}
    >
      {showDateLabel && (
        <div className="upcoming-label position-absolute top-5 end-0 m-2 p-1 bg-danger text-white rounded">
          {formatUpcomingDate(showDateLabel)}
        </div>
      )}
      <div className="rounded-5">
        <img src={imageUrl} alt={title} className="card-image" />
      </div>
      <h5 className="mt-2 fw-bold">{title}</h5>
      <h6 className="fw-light">
        {subtitle}
        {genre ? ` | ${genre}` : ""}
      </h6>
    </div>
  );
};

export default Card;
