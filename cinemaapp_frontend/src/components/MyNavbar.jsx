import React from "react";

import { Button, Nav, Navbar } from "react-bootstrap";
import { BsCameraReelsFill } from "react-icons/bs";
import colors from "../utils/colors";

const MyNavbar = () => {
  return (
    <Navbar
      expand="lg"
      className="p-4"
      style={{ backgroundColor: colors.dark_gray}}
    >
      <Navbar.Brand className="text-light">
        <div className="d-flex">
          <span
            className="d-flex justify-content-center align-items-center bg-white p-2 mx-1"
            style={{borderRadius: '12px'}}
          >
            <BsCameraReelsFill style={{color: colors.primary_red}} size={14} />
          </span>
          <h4 className="d-flex my-auto">
            Cine<span style={{color: colors.primary_red}}>bh.</span>
          </h4>
        </div>
      </Navbar.Brand>

      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link className="text-light">Currently showing</Nav.Link>
          <Nav.Link className="text-light">Upcoming movies</Nav.Link>
          <Nav.Link className="text-light">Venues</Nav.Link>
        </Nav>
      </Navbar.Collapse>

      <Navbar.Collapse className="justify-content-end">
        <Button variant="outline-light">Sign in</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
