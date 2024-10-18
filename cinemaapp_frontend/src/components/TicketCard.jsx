import React from "react";

import { IoMdCheckmark } from "react-icons/io";
import { Button } from "react-bootstrap";
import colors from "../utils/colors";

const TicketCard = ({ promo, title, price, features }) => {
  return (
    <div
      className={`d-flex flex-column justify-content-around border ${
        promo ? "border-secondary" : ""
      } rounded-4`}
      style={{ width: "400px", height: promo ? "600px" : "500px" }}
    >
      <div className="text-center">
        <h5 className="fw-bold">{title}</h5>
        <h3
          className="fw-bold"
          style={{
            color: promo ? colors.primary_red : colors.text_dark,
          }}
        >
          {price} KM
        </h3>
        <p>*per ticket</p>
      </div>

      <ul className="d-flex flex-column">
        {features.map((feature, index) => (
          <div key={index} className="d-flex gap-3">
            <IoMdCheckmark size={20} className="primary-red" />
            <p>{feature}</p>
          </div>
        ))}
      </ul>

      <div className="d-flex justify-content-center">
        <Button
          style={{
            borderColor: colors.primary_red,
            background: promo ? colors.primary_red : "none",
            color: promo ? "white" : colors.primary_red,
          }}
          className="px-4 py-2"
        >
          Explore movies
        </Button>
      </div>
    </div>
  );
};

export default TicketCard;
