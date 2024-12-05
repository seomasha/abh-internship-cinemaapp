import React from "react";

import { FaCcVisa } from "react-icons/fa";

const CreditCard = () => {
  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between border align-items-center rounded-4 py-4">
        <div className="d-flex gap-5 align-items-center">
          <div className="px-4">
            <FaCcVisa size={36} />
          </div>
          <p className="mt-2">****</p>
          <p>****</p>
          <p>****</p>
          <p className="mb-2">1234</p>
        </div>
        <p className="px-4 primary-red text-decoration-underline fw-bold">
          Delete Card
        </p>
      </div>
    </div>
  );
};

export default CreditCard;
