import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";
import { BsCameraReelsFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";

const NavBar = () => {
  return (
    <Navbar expand="lg" className="p-4 main-font navbar-background">
      <NavLink
        to="/"
        className="text-decoration-none d-flex align-items-center"
      >
        <Navbar.Brand className="text-light">
          <div className="d-flex">
            <span className="d-flex justify-content-center align-items-center bg-white p-2 mx-1 logo-rounded">
              <BsCameraReelsFill className="primary-red" size={14} />
            </span>
            <h4 className="d-flex my-auto fw-bold">
              Cine<span className="primary-red">bh.</span>
            </h4>
          </div>
        </Navbar.Brand>
      </NavLink>

      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        className="text-light"
      >
        <RxHamburgerMenu />
      </Navbar.Toggle>

      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav>
          <NavLink
            to="/currently-showing"
            className={({ isActive }) =>
              isActive
                ? "text-light mx-4 nav-link fw-bold text-decoration-underline"
                : "text-light mx-4 nav-link"
            }
          >
            Currently showing
          </NavLink>

          <NavLink
            to="/upcoming-movies"
            className={({ isActive }) =>
              isActive
                ? "text-light mx-4 nav-link fw-bold text-decoration-underline"
                : "text-light mx-4 nav-link"
            }
          >
            Upcoming movies
          </NavLink>

          <NavLink
            to="/venues"
            className={({ isActive }) =>
              isActive
                ? "text-light mx-4 nav-link fw-bold text-decoration-underline"
                : "text-light mx-4 nav-link"
            }
          >
            Venues
          </NavLink>
        </Nav>
      </Navbar.Collapse>

      <Navbar.Collapse className="justify-content-end">
        <Button variant="outline-light" className="px-4 py-2">
          Sign in
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
