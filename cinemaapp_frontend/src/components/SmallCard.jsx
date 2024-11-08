import React from "react";

import "../styles/SmallCard.css";

const SmallCard = ({ imgUrl, title }) => {
  return (
    <div className="border rounded-4 card p-3">
      <img src={imgUrl} className="rounded" />
      <h6 className="mt-3">{title}</h6>
    </div>
  );
};

export default SmallCard;
