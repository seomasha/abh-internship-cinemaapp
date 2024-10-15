import React from "react";

import { BsCameraReelsFill } from "react-icons/bs";
import colors from "../utils/colors";

const Footer = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(to right, #1A1A1A, #B22222)",
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="d-flex justify-content-center p-4">
        <span
          className="d-flex justify-content-center bg-white p-2 mx-1"
          style={{ borderRadius: "12px" }}
        >
          <BsCameraReelsFill style={{ color: colors.primary_red }} size={14} />
        </span>
        <h4 className="d-flex my-auto text-white">Cinebh.</h4>
      </div>
      <div className="d-flex justify-content-center gap-4 text-white">
        <h6 className="fw-bold">ABOUT US</h6>
        <span className="">|</span>
        <h6 className="fw-bold">TICKETS</h6>
      </div>
      <h6 className="text-center text-white">
        Copyright @Cinebh. Built with love in Sarajevo, All rights reserved.
      </h6>
    </div>
  );
};

export default Footer;
