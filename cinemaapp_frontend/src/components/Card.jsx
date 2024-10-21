import React from "react";

import "../styles/Card.css";

const Card = ({ key, title, duration, genre, imageUrl }) => {
  return (
    <div className="rounded-5 p-3 border shadow" key={key}>
      <div className="rounded-5"/>
      <img src={imageUrl} className="card"/>
      <h5 className="mt-2 fw-bold">{title}</h5>
      <h6>
        {duration}
        {"min"} | {genre}
      </h6>
    </div>
  );
};

export default Card;
