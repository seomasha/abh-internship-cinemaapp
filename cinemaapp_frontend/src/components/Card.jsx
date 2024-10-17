import React from "react";

const Card = ({ key, title, duration, genre }) => {
  return (
    <div className="rounded-5 p-3 border d-inline-block shadow" key={key}>
      <div
        className="rounded-5 card"
      />
      <h5 className="mt-2" style={{ fontFamily: "Urbanist Bold" }}>
        {title}
      </h5>
      <h6>{duration}{"min"} | {genre}</h6>
    </div>
  );
};

export default Card;
