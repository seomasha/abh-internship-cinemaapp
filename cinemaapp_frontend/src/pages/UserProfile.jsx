import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

import { Button, Spinner } from "react-bootstrap";
import TabButton from "../components/TabButton";
import Input from "../components/Input";

import { FaRegUser } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { TbMovie } from "react-icons/tb";
import { FiPhone } from "react-icons/fi";
import { CiMail, CiLocationOn, CiSearch } from "react-icons/ci";
import { BiWorld } from "react-icons/bi";
import Dropdown from "../components/Dropdown";
import Reservation from "../components/Reservation";
import { getUserInfoFromToken } from "../utils/JwtDecode";
import { userService } from "../services/userService";
import ToastService from "../services/toastService";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentFlow, setCurrentFlow] = useState("personalInfo");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

  const placeholderImage = "https://via.placeholder.com/300";

  const token = localStorage.getItem("token");
  const userEmail = getUserInfoFromToken(token).sub;

  useEffect(() => {
    const getUser = async () => {
      const response = await userService.findUserByEmail(userEmail);
      setUser(response);
    };

    getUser();
  }, []);

  const setError = (condition, setter, message) => {
    if (condition) {
      setter(message);
      return true;
    } else {
      setter("");
      return false;
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const validatePasswordChange = () => {
    const passwordError = setError(
      !validatePassword(password),
      setPasswordError,
      "Password must be at least 8 characters long, contain at least one letter, and one number."
    );

    const newPasswordError = setError(
      !validatePassword(newPassword),
      setNewPasswordError,
      "Password must be at least 8 characters long, contain at least one letter, and one number."
    );

    const confirmPasswordRegexError = !validatePassword(confirmNewPassword);
    const confirmPasswordMismatchError = confirmNewPassword !== newPassword;

    const confirmNewPasswordError = setError(
      confirmPasswordRegexError || confirmPasswordMismatchError,
      setConfirmNewPasswordError,
      confirmPasswordRegexError
        ? "Password must be at least 8 characters long, contain at least one letter, and one number."
        : "The passwords don't match."
    );

    return (
      !passwordError &&
      !newPasswordError &&
      !confirmPasswordRegexError &&
      !confirmPasswordMismatchError
    );
  };

  const handlePasswordChange = async () => {
    setLoading(true);
    if (!validatePasswordChange()) {
      setLoading(false);
      return;
    }

    const verifyPassword = await userService.verifyPassword({
      email: userEmail,
      password,
    });

    if (!verifyPassword) {
      setPasswordError("The password is incorrect.");
      setLoading(false);
      return;
    }

    const resetPassword = await userService.resetPassword({
      email: userEmail,
      password: newPassword,
    });

    if (resetPassword) {
      ToastService.success("Password is changed succesfully");

      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setCurrentFlow("personalInfo");

      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex">
        <div
          className="navbar-background p-4 flex-grow-1 top-border"
          style={{ height: "100vh", zIndex: 1 }}
        >
          <h4 className="text-white pb-4 fw-bold">User Profile</h4>
          <p className="text-white mt-4 d-flex align-items-center">
            <p className="me-2">General</p>
            <div className="flex-grow-1 top-border"></div>
          </p>
          <h6
            className={`text-white ${
              currentFlow === "personalInfo" ? "fw-bold" : "fw-light"
            } mt-4 d-flex align-items-center gap-2 pointer`}
            onClick={() => setCurrentFlow("personalInfo")}
          >
            <FaRegUser />
            Personal Information
          </h6>
          <h6
            className={`text-white ${
              currentFlow === "password" ? "fw-bold" : "fw-light"
            } mt-4 d-flex align-items-center gap-2 pointer`}
            onClick={() => setCurrentFlow("password")}
          >
            <IoLockClosedOutline />
            Password
          </h6>
          <p className="text-white mt-4 d-flex align-items-center">
            <p className="me-2">Movies</p>
            <div className="flex-grow-1 top-border"></div>
          </p>
          <h6
            className={`text-white ${
              currentFlow === "pendingReservations" ? "fw-bold" : "fw-light"
            } mt-4 d-flex align-items-center gap-2 pointer`}
            onClick={() => setCurrentFlow("pendingReservations")}
          >
            <GoClock />
            Pending Reservations (1)
          </h6>
          <h6
            className={`text-white ${
              currentFlow === "projections" ? "fw-bold" : "fw-light"
            } mt-4 d-flex align-items-center gap-2 pointer`}
            onClick={() => setCurrentFlow("projections")}
          >
            <TbMovie />
            Projections
          </h6>
        </div>

        <div className="col-10">
          {loading && (
            <>
              <Spinner />
            </>
          )}
          {currentFlow === "personalInfo" && !loading && (
            <>
              <div className="d-flex justify-content-between p-5">
                <h4>Personal Information</h4>
                <Button
                  className="btn button-primary"
                  variant="danger"
                  onClick={() => setCurrentFlow("editProfile")}
                >
                  Edit Profile
                </Button>
              </div>
              <div className="px-5">
                <div className="d-flex p-4 gap-3 rounded-4 bg-white">
                  <img
                    src={placeholderImage}
                    alt="placeholder"
                    className="rounded-2"
                  />
                  <div>
                    <h3>John Doe</h3>
                    <h6 className="d-flex align-items-center gap-2 fw-light mt-4">
                      <FiPhone size={18} className="primary-red" />
                      +387 62 111 111
                    </h6>
                    <h6 className="d-flex align-items-center gap-2 fw-light mt-4">
                      <CiMail size={18} className="primary-red" />
                      mail@mail.com
                    </h6>
                    <h6 className="d-flex align-items-center gap-2 fw-light mt-4">
                      <CiLocationOn size={18} className="primary-red" />
                      Sarajevo
                    </h6>
                    <h6 className="d-flex align-items-center gap-2 fw-light mt-4">
                      <BiWorld size={18} className="primary-red" />
                      Bosnia and Herzegovina
                    </h6>
                  </div>
                </div>
              </div>
            </>
          )}
          {currentFlow === "editProfile" && !loading && (
            <>
              <div className="d-flex justify-content-between p-5">
                <h4>Personal information</h4>
              </div>
              <div className="d-flex justify-content-center border-2 border-bottom pb-2 mx-4">
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                    <img
                      src={placeholderImage}
                      alt="Uploaded Preview"
                      style={{
                        width: "300px",
                        height: "300px",
                        objectFit: "cover",
                        marginBottom: "10px",
                        cursor: "pointer",
                        borderRadius: "24px",
                      }}
                      className="border"
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 10,
                        left: 0,
                        width: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        textAlign: "center",
                        padding: "5px",
                        fontSize: "14px",
                        borderBottomLeftRadius: "24px",
                        borderBottomRightRadius: "24px",
                      }}
                    >
                      Upload Photo
                    </div>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="d-flex p-3 gap-4">
                <Input
                  label="First Name"
                  placeholder="First Name"
                  leadingIcon={<CiSearch size={18} />}
                  dark={true}
                />
                <Input
                  label="Last Name"
                  placeholder="Last Name"
                  leadingIcon={<CiSearch size={18} />}
                  dark={true}
                />
              </div>
              <div className="d-flex p-3 gap-4">
                <Input
                  label="Phone"
                  placeholder="Phone"
                  leadingIcon={<FiPhone size={18} />}
                  dark={true}
                />
                <Input
                  label="Email"
                  placeholder="Email"
                  leadingIcon={<CiMail size={18} />}
                  dark={true}
                />
              </div>
              <div className="d-flex mx-3 pb-4 gap-4 border-2 border-bottom">
                <Dropdown
                  icon={CiLocationOn}
                  title="City"
                  options={[""]}
                  label="City"
                  fullWidth
                  large
                />
                <Dropdown
                  icon={BiWorld}
                  title="Country"
                  options={[""]}
                  label="Country"
                  fullWidth
                  large
                />
              </div>
              <div className="d-flex justify-content-between mt-4 px-4">
                <p className="primary-red text-decoration-underline fw-bold pointer">
                  Deactivate my account
                </p>
                <div className="d-flex justify-content-end gap-3">
                  <button
                    className="btn button-secondary"
                    onClick={() => setCurrentFlow("personalInfo")}
                  >
                    Cancel
                  </button>
                  <button className="btn button-primary">Save Changes</button>
                </div>
              </div>
            </>
          )}
          {currentFlow === "password" && !loading && (
            <>
              <div className="d-flex justify-content-between p-5">
                <h4>Change Password</h4>
              </div>
              <div className="w-50 px-5">
                <Input
                  label="Current Password"
                  placeholder="Current Password"
                  leadingIcon={<IoLockClosedOutline size={18} />}
                  dark={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  invalid={!!passwordError}
                  invalidMessage={passwordError}
                  type="password"
                />
                <Input
                  label="New Password"
                  placeholder="New Password"
                  leadingIcon={<IoLockClosedOutline size={18} />}
                  dark={true}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  invalid={!!newPasswordError}
                  invalidMessage={newPasswordError}
                  type="password"
                />
                <Input
                  label="Repeat New Password"
                  placeholder="Repeat New Password"
                  leadingIcon={<IoLockClosedOutline size={18} />}
                  dark={true}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  invalid={!!confirmNewPasswordError}
                  invalidMessage={confirmNewPasswordError}
                  type="password"
                />
              </div>
              <div className="border-bottom mx-5"></div>
              <div className="d-flex justify-content-end gap-3 p-5">
                <button
                  className="btn button-secondary"
                  onClick={() => setCurrentFlow("personalInfo")}
                >
                  Cancel
                </button>
                <button
                  className="btn button-primary"
                  onClick={handlePasswordChange}
                >
                  Save Password
                </button>
              </div>
            </>
          )}
          {currentFlow === "pendingReservations" && !loading && (
            <>
              <div className="d-flex justify-content-between mx-5 pt-5 pb-3 border-bottom">
                <h4>Pending Reservations</h4>
              </div>
              <Reservation image={placeholderImage} />
            </>
          )}
          {currentFlow === "projections" && !loading && (
            <>
              <div className="d-flex justify-content-between mx-5 pt-5 pb-3">
                <h4>Projections</h4>
              </div>
              <div className="mt-3 border-bottom gap-5 d-flex mx-5">
                <TabButton
                  label={`Upcoming (1)`}
                  isActive={activeTab === "upcoming"}
                  onClick={() => {
                    setActiveTab("upcoming");
                  }}
                />
                <TabButton
                  label={`Past (1)`}
                  isActive={activeTab === "past"}
                  onClick={() => {
                    setActiveTab("past");
                  }}
                />
              </div>
              {activeTab === "upcoming" && (
                <>
                  <Reservation image={placeholderImage} upcoming />
                </>
              )}
              {activeTab === "past" && (
                <>
                  <Reservation image={placeholderImage} past />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
