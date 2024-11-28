import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Nav, Navbar, Dropdown } from "react-bootstrap";
import { BsCameraReelsFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { getUserInfoFromToken } from "../utils/JwtDecode";
import "../styles/Navbar.css";
import AuthForm from "./AuthForm";

const NavBar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changedPassword, setChangedPassword] = useState("");
  const [confirmChangedPassword, setConfirmChangedPassword] = useState("");
  const [currentFlow, setCurrentFlow] = useState("signIn");
  const [passwordResetStep, setPasswordResetStep] = useState(1);
  const [emailPrefix, setEmailPrefix] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navTabs = [
    { id: 1, path: "/currently-showing", label: "Currently showing" },
    { id: 2, path: "/upcoming", label: "Upcoming movies" },
    { id: 3, path: "/venues", label: "Venues" },
  ];

  const handleSignInClick = () => {
    setShowSignIn(!showSignIn);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const userInfo = getUserInfoFromToken(token);
      if (userInfo) {
        setEmailPrefix(userInfo.sub.split("@")[0]);
        setIsLoggedIn(true);
      }
    }
  }, []);

  useEffect(() => {
    if (showSignIn) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSignIn]);

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
          {navTabs.map((tab) => {
            return (
              <NavLink
                key={tab.id}
                to={tab.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-light mx-4 nav-link fw-bold fs-6 text-decoration-underline"
                    : "text-light mx-4 nav-link fw-bold fs-6"
                }
              >
                {tab.label}
              </NavLink>
            );
          })}
        </Nav>
      </Navbar.Collapse>

      <Navbar.Collapse className="justify-content-end">
        {isLoggedIn ? (
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-light"
              id="dropdown-basic"
              className="px-4 py-2"
            >
              {emailPrefix} <span className="caret"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button
            variant="outline-light"
            className="px-4 py-2"
            onClick={handleSignInClick}
          >
            Sign in
          </Button>
        )}
      </Navbar.Collapse>

      <div className={`sign-in-panel ${showSignIn ? "active" : ""}`}>
        <div className="sign-in-form">
          <div className="d-flex justify-content-center my-2">
            <span className="d-flex justify-content-center align-items-center bg-white p-2 mx-1 logo-rounded">
              <BsCameraReelsFill className="primary-red" size={14} />
            </span>
            <h4 className="d-flex my-auto fw-bold text-white">
              Cine<span className="primary-red">bh.</span>
            </h4>
          </div>
          <AuthForm
            currentFlow={currentFlow}
            setCurrentFlow={setCurrentFlow}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            changedPassword={changedPassword}
            setChangedPassword={setChangedPassword}
            confirmChangedPassword={confirmChangedPassword}
            setConfirmChangedPassword={setConfirmChangedPassword}
            passwordResetStep={passwordResetStep}
            setPasswordResetStep={setPasswordResetStep}
            showSignIn={showSignIn}
            setShowSignIn={setShowSignIn}
          />
        </div>
      </div>
    </Navbar>
  );
};

export default NavBar;
