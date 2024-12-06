import React from "react";

import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from "react-icons/fa";

const CreditCard = ({ id, last4, brand, onDelete }) => {
  const renderIcon = () => {
    switch (brand) {
      case "visa":
        return <FaCcVisa size={36} />;
      case "mastercard":
        return <FaCcMastercard size={36} />;
      case "american_express":
        return <FaCcAmex size={36} />;
      case "discover":
        return <FaCcDiscover size={36} />;
      default:
        return null;
    }
  };

  const handleDeleteCard = () => {
    if (onDelete) onDelete(id);
  };

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between border align-items-center rounded-4 py-4">
        <div className="d-flex gap-5 align-items-center">
          <div className="px-4">{renderIcon()}</div>
          <p className="mt-2">****</p>
          <p>****</p>
          <p>****</p>
          <p className="mb-2">{last4}</p>
        </div>
        <p
          className="px-4 primary-red text-decoration-underline fw-bold"
          onClick={handleDeleteCard}
        >
          Delete Card
        </p>
      </div>
    </div>
  );
};

export default CreditCard;
