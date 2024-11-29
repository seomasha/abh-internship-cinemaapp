import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Input from "./Input";
import OTPInput from "./OTP";
import { FiLock } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import Separator from "./Separator";
import { FaGoogle, FaApple, FaArrowLeft } from "react-icons/fa";
import { otpService } from "../services/otpService";
import { userService } from "../services/userService";

const AuthForm = ({
  currentFlow,
  setCurrentFlow,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  changedPassword,
  setChangedPassword,
  confirmChangedPassword,
  setConfirmChangedPassword,
  passwordResetStep,
  setPasswordResetStep,
  showSignIn,
  setShowSignIn,
}) => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [changedPasswordError, setChangedPasswordError] = useState("");
  const [confirmChangedPasswordError, setConfirmChangedPasswordError] =
    useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);

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
      successMessage: "Password Reset Successful 🎉",
      steps: [
        "Step 1: Enter your email",
        "Step 2: Enter verification code",
        "Step 3: Reset your password",
      ],
      description: "Please wait, you will be directed to the homepage.",
    },
  };

  const { title, successMessage, description } = flowDetails[currentFlow] || {};

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const getStepDescription = () => {
    if (passwordResetStep === 1) {
      return "Provide your account's email or the one you want to reset your password for.";
    }
    if (passwordResetStep === 2) {
      return `We have sent an email to ${email}. Please enter the code below to verify. The code expires in 2 minutes.`;
    }
    if (passwordResetStep === 3) {
      return "Please enter and confirm your new password";
    }
    return "";
  };

  const ActionButton = ({ label, onClick, disabled = false }) => (
    <Button
      variant="danger"
      type="submit"
      className="primary-red-button text-white py-2"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );

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

  const setError = (condition, setter, message) => {
    if (condition) {
      setter(message);
      return true;
    } else {
      setter("");
      return false;
    }
  };

  const validateSignIn = () => {
    const emailError = setError(
      !validateEmail(email),
      setEmailError,
      "Please enter a valid email."
    );

    return !emailError;
  };

  const validateSignUp = () => {
    const emailError = setError(
      !validateEmail(email),
      setEmailError,
      "Please enter a valid email."
    );

    const passwordError = setError(
      !validatePassword(password),
      setPasswordError,
      "Password must be at least 8 characters long and contain both letters and numbers."
    );

    const confirmPasswordError = setError(
      confirmPassword !== password,
      setConfirmPasswordError,
      "Passwords do not match."
    );

    return !emailError && !passwordError && !confirmPasswordError;
  };

  const validatePasswordReset = () => {
    const emailError = setError(
      !validateEmail(email),
      setEmailError,
      "Please enter a valid email."
    );

    const changePasswordError =
      passwordResetStep !== 3
        ? false
        : setError(
            !validatePassword(changedPassword),
            setChangedPasswordError,
            "Password must be at least 8 characters long and contain both letters and numbers."
          );

    const confirmChangePasswordError = setError(
      confirmChangedPassword !== changedPassword,
      setConfirmChangedPasswordError,
      "Passwords do not match."
    );

    return !emailError && !changePasswordError && !confirmChangePasswordError;
  };

  const sendOtp = async () => {
    setLoading(true);
    const emailExists = await userService.findUserByEmail(email);

    if (!emailExists) {
      setError(!emailExists, setEmailError, "The email doesn't exist");
      setLoading(false);
      return;
    }

    const response = await otpService.create({ email: email });

    if (response && validateEmail(email) && emailExists) {
      setPasswordResetStep(2);
      setLoading(false);
    } else {
      setError(
        !response || (!validateEmail(email) && emailExists),
        setEmailError,
        "The email is not valid."
      );
      setLoading(false);
    }
  };

  const verify = async () => {
    setLoading(true);
    const response = await otpService.verifyOtp(email, enteredOtp);

    if (response === "OTP Verified!") {
      setPasswordResetStep(3);
    } else {
      setOtpError("The OTP code is incorrect or has expired.");
    }

    setLoading(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let isValid = false;

    if (currentFlow === "signIn") {
      isValid = validateSignIn();
    } else if (currentFlow === "signUp") {
      isValid = validateSignUp();
    } else if (currentFlow === "passwordReset") {
      if (passwordResetStep === 2) {
        const otpValid = await verify();
        if (!otpValid) return;
      }
      isValid = validatePasswordReset();
    }

    if (!isValid) {
      return;
    }

    if (currentFlow === "signIn") {
      setLoading(true);
      const validateUserSignIn = await userService.login({
        email: email,
        password: password,
      });

      if (validateUserSignIn) {
        setLoading(false);
        localStorage.setItem("token", validateUserSignIn);

        setSignInSuccess(true);
        setTimeout(() => {
          window.location.href = "/";
          setSignInSuccess(false);
        }, 3000); // Timeout for animation purpose

        resetFields();
      }
    } else if (currentFlow === "signUp") {
      setLoading(true);
      const validUserSignUp = await userService.create({
        email: email,
        password: password,
      });

      if (validUserSignUp) {
        setLoading(false);
        setSignInSuccess(true);
        setTimeout(() => setSignInSuccess(false), 5000);
        resetFields();
      }
    } else if (currentFlow === "passwordReset") {
      setLoading(true);
      const passwordReset = await userService.resetPassword({
        email: email,
        password: changedPassword,
      });

      if (passwordReset) {
        setLoading(false);
        setSignInSuccess(true);
        setPasswordReset(true);
        setTimeout(() => {
          setSignInSuccess(false);
          setPasswordReset(false);
          resetFields();
          setPasswordResetStep(1);
          setCurrentFlow("signIn");
        }, 3000); // Timeout for animation purposes
      }
    }
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

  const handleOTPChange = (otp) => {
    setEnteredOtp(otp);
    setOtpError("");
  };

  const renderForm = () => {
    if (signInSuccess) {
      return (
        <>
          <div className="text-center d-flex justify-content-between">
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
            {currentFlow === "passwordReset" && (
              <p className="text-white">
                {!passwordReset && getStepDescription()}
              </p>
            )}
            <div></div>
          </div>
          <p className="text-white text-center">{description}</p>
        </>
      );
    }

    switch (currentFlow) {
      case "signIn":
        return (
          <>
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
            <Input
              label="Email"
              placeholder="Enter your email"
              leadingIcon={<AiOutlineMail size={20} />}
              value={email}
              onChange={handleEmailChange}
              invalid={!!emailError}
              invalidMessage={emailError}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              leadingIcon={<FiLock size={20} />}
              value={password}
              onChange={handlePasswordChange}
              type="password"
              invalid={!!passwordError}
              invalidMessage={passwordError}
            />
            <ActionButton label="Sign In" onClick={handleFormSubmit} />
            <h6 className="text-center text-white mt-4 fw-light">
              Don't have an account yet?{" "}
              <span
                className="fw-bold text-decoration-underline cursor-pointer"
                onClick={() => setCurrentFlow("signUp")}
              >
                Sign up.
              </span>
            </h6>
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
        );
      case "signUp":
        return (
          <>
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
            <Input
              label="Email"
              placeholder="Enter your email"
              leadingIcon={<AiOutlineMail size={20} />}
              value={email}
              onChange={handleEmailChange}
              invalid={!!emailError}
              invalidMessage={emailError}
            />
            <Input
              label="Password"
              placeholder="Create your password"
              leadingIcon={<FiLock size={20} />}
              value={password}
              onChange={handlePasswordChange}
              type="password"
              invalid={!!passwordError}
              invalidMessage={passwordError}
            />
            <Input
              label="Confirm Password"
              placeholder="Retype your password"
              leadingIcon={<FiLock size={20} />}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              type="password"
              invalid={!!confirmPasswordError}
              invalidMessage={confirmPasswordError}
            />
            <ActionButton label="Sign Up" onClick={handleFormSubmit} />

            <h6 className="text-center text-white mt-4 fw-light">
              Already have an account?{" "}
              <span
                className="fw-bold text-decoration-underline cursor-pointer"
                onClick={() => setCurrentFlow("signIn")}
              >
                Sign in.
              </span>
            </h6>

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
        );
      case "passwordReset":
        return renderPasswordReset();
      default:
        return null;
    }
  };

  const renderPasswordReset = () => {
    return (
      <>
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
        {passwordResetStep === 1 && (
          <>
            <Input
              label="Email"
              placeholder="Enter your email"
              leadingIcon={<AiOutlineMail size={20} />}
              value={email}
              onChange={handleEmailChange}
              invalid={!!emailError}
              invalidMessage={emailError}
            />
            <ActionButton label="Continue" onClick={sendOtp} />
          </>
        )}
        {passwordResetStep === 2 && (
          <>
            <div className="d-flex justify-content-center mt-4">
              <OTPInput onChange={handleOTPChange} />
            </div>
            {otpError && <p className="text-center text-danger">{otpError}</p>}
            <ActionButton label="Continue" onClick={handleFormSubmit} />
          </>
        )}
        {passwordResetStep === 3 && (
          <>
            <Input
              label="New Password"
              placeholder="Enter your new password"
              leadingIcon={<FiLock size={20} />}
              value={changedPassword}
              onChange={handleChangedPasswordChange}
              type="password"
              invalid={!!changedPasswordError}
              invalidMessage={changedPasswordError}
            />
            <Input
              label="Confirm New Password"
              placeholder="Retype your new password"
              leadingIcon={<FiLock size={20} />}
              value={confirmChangedPassword}
              onChange={handleConfirmChangedPasswordChange}
              type="password"
              invalid={!!confirmChangedPasswordError}
              invalidMessage={confirmChangedPasswordError}
            />
            <ActionButton label="Reset Password" onClick={handleFormSubmit} />
          </>
        )}
      </>
    );
  };

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" size="lg" variant="light" />
        </div>
      ) : (
        renderForm()
      )}
    </div>
  );
};

export default AuthForm;
