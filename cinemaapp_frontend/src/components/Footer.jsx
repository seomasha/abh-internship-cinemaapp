import React from "react";
import { Link } from "react-router-dom";

import { BsCameraReelsFill } from "react-icons/bs";

import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="d-flex justify-content-center p-4">
        <Link to="/" className="text-decoration-none d-flex">
          <span className="d-flex justify-content-center bg-white p-2 mx-1 logo-rounded">
            <BsCameraReelsFill className="primary-red" size={14} />
          </span>
          <h4 className="d-flex my-auto text-white">Cinebh.</h4>
        </Link>
      </div>
      <div className="d-flex justify-content-center gap-4 text-white">
        <Link to="/about" className="text-decoration-none">
          <h6 className="fw-bold text-white">ABOUT US</h6>
        </Link>
        <span className="">|</span>
        <Link to="/tickets" className="text-decoration-none">
          <h6 className="fw-bold text-white">TICKETS</h6>
        </Link>
      </div>
      <h6 className="text-center text-white">
        Copyright @Cinebh. Built with love in Sarajevo, All rights reserved.
      </h6>
    </div>
  );
};

export default Footer;
