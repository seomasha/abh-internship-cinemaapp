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
import OTPInput from "./OTP";

const NavBar = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changedPassword, setChangedPassword] = useState("");
  const [confirmChangedPassword, setConfirmChangedPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [changedPasswordError, setChangedPasswordError] = useState("");
  const [confirmChangedPasswordError, setConfirmChangedPasswordError] =
    useState("");
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [currentFlow, setCurrentFlow] = useState("signIn");
  const [passwordResetStep, setPasswordResetStep] = useState(1);
  const [passwordReset, setPasswordReset] = useState(false);

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setChangedPassword("");
    setConfirmChangedPassword("");
    setChangedPasswordError("");
    setConfirmChangedPasswordError("");
    setPasswordResetStep(1);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

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
      steps: [
        "Step 1: Enter your email",
        "Step 2: Enter verification code",
        "Step 3: Reset your password",
      ],
    },
  };

  const { title, successMessage, description } = flowDetails[currentFlow] || {};

  const navTabs = [
    { id: 1, path: "/currently-showing", label: "Currently showing" },
    { id: 2, path: "/upcoming", label: "Upcoming movies" },
    { id: 3, path: "/venues", label: "Venues" },
  ];

  const handleSignInClick = () => {
    resetFields();
    setShowSignIn(!showSignIn);
    setCurrentFlow("signIn");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangedPasswordChange = (e) => {
    setChangedPassword(e.target.value);
  };

  const handleConfirmChangedPasswordChange = (e) => {
    setConfirmChangedPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let emailError = false;
    let passwordError = false;
    let confirmPasswordError = false;
    let changePasswordError = false;
    let confirmChangePasswordError = false;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      emailError = true;
    } else {
      setEmailError("");
      emailError = false;
    }

    if (!validatePassword(password) && currentFlow !== "passwordReset") {
      setPasswordError(
        "Password must be at least 8 characters long and contain both letters and numbers."
      );
      passwordError = true;
    } else {
      setPasswordError("");
      passwordError = false;
    }

    if (!validatePassword(changedPassword)) {
      setChangedPasswordError(
        "Password must be at least 8 characters long and contain both letters and numbers."
      );
      changePasswordError = true;
    } else {
      setChangedPasswordError("");
      changePasswordError = false;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      confirmPasswordError = true;
    } else {
      setConfirmPasswordError("");
      confirmPasswordError = false;
    }

    if (confirmChangedPassword !== changedPassword) {
      setConfirmPasswordError("Passwords do not match.");
      confirmChangePasswordError = true;
    } else {
      setConfirmPasswordError("");
      confirmChangePasswordError = false;
    }

    if (
      (currentFlow === "signIn" && !emailError && !passwordError) ||
      (currentFlow === "signUp" &&
        !emailError &&
        !passwordError &&
        !confirmPasswordError)
    ) {
      setSignInSuccess(true);
      setTimeout(() => setSignInSuccess(false), 5000);
      resetFields();
    } else if (currentFlow === "passwordReset" && !emailError) {
      if (passwordResetStep < 3) {
        setPasswordResetStep(passwordResetStep + 1);
      } else {
        if (changePasswordError || confirmChangePasswordError) {
          return;
        }
        setSignInSuccess(true);
        setPasswordReset(true);
        setTimeout(() => {
          setSignInSuccess(false);
          setPasswordReset(false);
          resetFields();
          setPasswordResetStep(1);
          setCurrentFlow("signIn");
        }, 5000);
      }
    }
  };

  const handleOTPChange = (otp) => {
    console.log("OTP entered: ", otp);
  };

  const handleOTPComplete = (otp) => {
    console.log("OTP complete: ", otp);
  };

  const getStepDescription = () => {
    if (passwordResetStep === 1) {
      return "Provide your account's email or the one you want to reset your password for.";
    }
    if (passwordResetStep === 2) {
      return `We have sent an email to ${email}. Please enter the code below to verify.`;
    }
    if (passwordResetStep === 3) {
      return "Please enter and confirm your new password";
    }
    return "";
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
          <div className="d-flex justify-content-center my-2">
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
            <div className="text-center">
              <h3 className="text-white">
                {signInSuccess ? successMessage : title}
              </h3>
              {currentFlow === "passwordReset" && (
                <p className="text-white">
                  {!passwordReset ? getStepDescription() : ""}
                </p>
              )}
            </div>
            <div></div>
          </div>
          {signInSuccess ? (
            <>
              <div className="text-center text-white mt-3">
                <p>{description}</p>

                {currentFlow === "signUp" && (
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
              {currentFlow !== "passwordReset" && (
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
                  invalid={!!emailError}
                  invalidMessage={emailError}
                />
              )}
              {currentFlow !== "passwordReset" && (
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
                  invalid={!!passwordError}
                  invalidMessage={passwordError}
                />
              )}
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
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  type="password"
                  invalid={!!confirmPasswordError}
                  invalidMessage={confirmPasswordError}
                />
              )}
              {currentFlow !== "passwordReset" && (
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
                    className="text-white cursor-pointer"
                    onClick={() => setCurrentFlow("passwordReset")}
                  >
                    Forgot password?
                  </p>
                </div>
              )}
              {currentFlow === "passwordReset" && passwordResetStep === 1 && (
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
                  invalid={!!emailError}
                  invalidMessage={emailError}
                />
              )}
              {currentFlow === "passwordReset" && passwordResetStep === 2 && (
                <div className="d-flex justify-content-center mt-3">
                  <OTPInput
                    onChange={handleOTPChange}
                    onComplete={handleOTPComplete}
                  />
                </div>
              )}
              {currentFlow === "passwordReset" && passwordResetStep === 3 && (
                <>
                  <Input
                    label="New Password"
                    placeholder="Enter your new password"
                    leadingIcon={
                      <FiLock
                        size={20}
                        color={password ? colors.primary_red : ""}
                      />
                    }
                    value={changedPassword}
                    onChange={handleChangedPasswordChange}
                    type="password"
                    invalid={!!changedPasswordError}
                    invalidMessage={changedPasswordError}
                  />
                  <Input
                    label="Confirm New Password"
                    placeholder="Retype your new password"
                    leadingIcon={
                      <FiLock
                        size={20}
                        color={confirmPassword ? colors.primary_red : ""}
                      />
                    }
                    value={confirmChangedPassword}
                    onChange={handleConfirmChangedPasswordChange}
                    type="password"
                    invalid={!!confirmChangedPasswordError}
                    invalidMessage={confirmChangedPasswordError}
                  />
                </>
              )}
              <Button
                variant="danger"
                type="submit"
                className="primary-red-button text-white py-2"
              >
                {currentFlow === "signIn"
                  ? "Sign In"
                  : currentFlow === "signUp"
                  ? "Sign Up"
                  : "Continue"}
              </Button>

              {currentFlow !== "passwordReset" && (
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
              )}
              {currentFlow !== "passwordReset" && (
                <>
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
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default NavBar;
