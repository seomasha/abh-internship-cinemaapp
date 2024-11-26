import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap";
import { BsCameraReelsFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowLeft, FaGoogle, FaApple } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import "../styles/Navbar.css";
import Input from "./Input";
import Separator from "./Separator";
import colors from "../utils/colors";

const NavBar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [currentFlow, setCurrentFlow] = useState("signIn");

  const flowDetails = {
    signIn: {
      title: "Welcome Back",
      successMessage: "Sign In Successful 🎉",
      description: "Please wait. You will be directed to the homepage.",
    },
    signUp: {
      title: "Hello",
      successMessage: "You're all set 🎉",
      description: "Start exploring latest movies, venues and ticket options",
    },
    passwordReset: {
      title: "Password Reset",
      successMessage: "Password Reset Successful",
      description:
        "Provide your account's email or the one you want to reset your password for.",
    },
  };

  const { title, successMessage, description } = flowDetails[currentFlow] || {};

  const navTabs = [
    { id: 1, path: "/currently-showing", label: "Currently showing" },
    { id: 2, path: "/upcoming", label: "Upcoming movies" },
    { id: 3, path: "/venues", label: "Venues" },
  ];

  const handleSignInClick = () => {
    setShowSignIn(!showSignIn);
    setCurrentFlow("signIn");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      setSignInSuccess(true);

      setTimeout(() => {
        setSignInSuccess(false);
      }, 5000);
    }
  };

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
        <Button
          variant="outline-light"
          className="px-4 py-2"
          onClick={handleSignInClick}
        >
          Sign in
        </Button>
      </Navbar.Collapse>

      <div className={`sign-in-panel ${showSignIn ? "active" : ""}`}>
        <div className="sign-in-form">
          <div className="d-flex justify-content-center my-5">
            <span className="d-flex justify-content-center align-items-center bg-white p-2 mx-1 logo-rounded">
              <BsCameraReelsFill className="primary-red" size={14} />
            </span>
            <h4 className="d-flex my-auto fw-bold text-white">
              Cine<span className="primary-red">bh.</span>
            </h4>
          </div>
          <div className="d-flex justify-content-between">
            <span className="py-2 cursor-pointer">
              <FaArrowLeft
                size={32}
                className="text-white back-button p-2 rounded"
                onClick={() => setShowSignIn(false)}
              />
            </span>
            <h3 className="text-white">
              {signInSuccess ? successMessage : title}
            </h3>
            <div></div>
          </div>
          {signInSuccess ? (
            <>
              <div className="text-center text-white mt-3">
                <p>{description}</p>

                {!currentFlow === "signIn" && (
                  <Button
                    variant="primary"
                    type="submit"
                    className="primary-red-button text-white py-2"
                  >
                    See Movies
                  </Button>
                )}
              </div>
            </>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <Input
                label="Email"
                placeholder="Enter your email"
                leadingIcon={
                  <AiOutlineMail
                    size={20}
                    color={email ? colors.primary_red : ""}
                  />
                }
                value={email}
                onChange={handleEmailChange}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                leadingIcon={
                  <FiLock
                    size={20}
                    color={password ? colors.primary_red : ""}
                  />
                }
                value={password}
                onChange={handlePasswordChange}
                type="password"
              />
              {currentFlow === "signUp" && (
                <Input
                  label="Confirm Password"
                  placeholder="Retype Password"
                  leadingIcon={
                    <FiLock
                      size={20}
                      color={password ? colors.primary_red : ""}
                    />
                  }
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                />
              )}
              <div className="d-flex justify-content-between">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label text-white fs-6"
                    htmlFor="flexCheckDefault"
                  >
                    Remember me
                  </label>
                </div>
                <p
                  className="text-white"
                  onClick={() => setCurrentFlow("passwordReset")}
                >
                  Forgot password?
                </p>
              </div>
              <Button
                variant="primary"
                type="submit"
                className="primary-red-button text-white py-2"
              >
                {currentFlow === "signIn" ? "Sign In" : "Sign Up"}
              </Button>

              <h6 className="text-center text-white mt-4 fw-light">
                {currentFlow === "signIn"
                  ? "Don't have an account yet? "
                  : "Already have an account? "}
                <span
                  className="fw-bold text-decoration-underline cursor-pointer"
                  onClick={() =>
                    setCurrentFlow(
                      currentFlow === "signIn" ? "signUp" : "signIn"
                    )
                  }
                >
                  {currentFlow === "signIn" ? "Sign up." : "Sign in."}
                </span>
              </h6>
              <Separator orientation="horizontal" dashed={false} />
              <div>
                <h6 className="text-center text-white mt-4 fw-light">
                  Login with
                </h6>
                <div className="mt-4 text-white d-flex justify-content-center gap-3">
                  <FaGoogle size={24} />
                  <FaApple size={24} />
                </div>
                <h6 className="text-center text-white mt-5 fw-bold text-decoration-underline">
                  Continue without Signing In
                </h6>
              </div>
            </form>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default NavBar;
