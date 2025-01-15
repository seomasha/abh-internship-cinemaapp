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
import { photoService } from "../services/photoService";
import { ticketService } from "../services/ticketService";
import ToastService from "../services/toastService";
import { Modal } from "react-bootstrap";
import { useNavBar } from "../context/NavBarContext";

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
  const [showModal, setShowModal] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [upcomingProjections, setUpcomingProjections] = useState([]);
  const [expiredProjections, setExpiredProjections] = useState([]);

  const placeholderImage = "https://via.placeholder.com/300";

  const token = localStorage.getItem("token");
  const userEmail = getUserInfoFromToken(token).sub;

  const { handleLogout } = useNavBar();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const response = await userService.get(localStorage.getItem("userId"));
      setUser(response);
      setLoading(false);

      setFirstName(response.firstName);
      setLastName(response.lastName);
      setPhoneNo(response.phoneNo);
      setEmail(response.email);
      setCity(response.city);
      setCountry(response.country);
    };

    const getUpcomingProjections = async () => {
      const response = await ticketService.getUserUpcomingProjections(
        localStorage.getItem("userId")
      );
      setUpcomingProjections(response);
    };

    const getExpiredProjections = async () => {
      const response = await ticketService.getUserExpiredProjections(
        localStorage.getItem("userId")
      );
      setExpiredProjections(response);
    };

    getUpcomingProjections();
    getExpiredProjections();
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

  const handleClose = () => setShowModal(false);

  const handleDeactivateAccount = async () => {
    setLoading(true);

    await userService.deactivateAccount({
      email: userEmail,
    });

    setShowModal(false);
    setLoading(false);
    handleLogout();
  };

  const handleCityChange = (selectedCities) => {
    setCity(selectedCities);
  };

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setProfileImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEditProfile = async () => {
    setLoading(true);

    const photoImageId = profileImage
      ? await (async () => {
          const formData = new FormData();
          formData.append("files", profileImage);
          formData.append("entityId", localStorage.getItem("userId"));
          formData.append("entityType", "user");
          formData.append("role", "profile_photo");
          return photoService.create(formData, "multipart/form-data");
        })()
      : null;

    const data = {
      firstName,
      lastName,
      phoneNo,
      email,
      city: Array.isArray(city) ? city[0] : city,
      country: Array.isArray(country) ? country[0] : country,
      ...(photoImageId && { profilePhotoId: photoImageId }),
    };

    await userService.editProfile(localStorage.getItem("userId"), data);

    window.location.reload();
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
                    src={user?.profilePhotoId.url || placeholderImage}
                    alt="placeholder"
                    className="rounded-2"
                    width={300}
                    height={300}
                  />
                  <div>
                    <h3>
                      {user?.firstName || user?.lastName
                        ? `${user?.firstName || ""} ${user?.lastName || ""}`
                        : "Add Name"}
                    </h3>

                    <h6 className="d-flex align-items-center gap-2 fw-light mt-4">
                      <FiPhone size={18} className="primary-red" />
                      {user?.phoneNo ? user?.phoneNo : "Add phone number"}
                    </h6>
                    <h6 className="d-flex align-items-center gap-2 fw-light mt-4">
                      <CiMail size={18} className="primary-red" />
                      {user?.email ? user?.email : "mail@mail.com"}
                    </h6>
                    <h6 className="d-flex align-items-center gap-2 fw-light mt-4">
                      <CiLocationOn size={18} className="primary-red" />
                      {user?.city ? user?.city : "Add your city"}
                    </h6>
                    <h6 className="d-flex align-items-center gap-2 fw-light mt-4">
                      <BiWorld size={18} className="primary-red" />
                      {user?.country ? user?.country : "Add your country"}
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
                      src={
                        previewImage ||
                        user?.profilePhotoId.url ||
                        placeholderImage
                      }
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
                    onChange={handleProfileImageChange}
                  />
                </div>
              </div>
              <div className="d-flex p-3 gap-4">
                <Input
                  label="First Name"
                  placeholder="First Name"
                  leadingIcon={<CiSearch size={18} />}
                  dark={true}
                  value={firstName || ""}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  label="Last Name"
                  placeholder="Last Name"
                  leadingIcon={<CiSearch size={18} />}
                  dark={true}
                  value={lastName || ""}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="d-flex p-3 gap-4">
                <Input
                  label="Phone"
                  placeholder="Phone"
                  leadingIcon={<FiPhone size={18} />}
                  dark={true}
                  value={phoneNo || ""}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
                <Input
                  label="Email"
                  placeholder="Email"
                  leadingIcon={<CiMail size={18} />}
                  dark={true}
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="d-flex mx-3 pb-4 gap-4 border-2 border-bottom">
                <Dropdown
                  icon={CiLocationOn}
                  title={city.length > 0 ? city : user?.city}
                  options={[
                    "Sarajevo",
                    "Mostar",
                    "Zenica",
                    "Tuzla",
                    "Banja Luka",
                  ]}
                  label="City"
                  onChange={handleCityChange}
                  fullWidth
                  large
                />
                <Dropdown
                  icon={BiWorld}
                  title={country.length > 0 ? country : user?.country}
                  options={["Bosna i Hercegovina"]}
                  label="Country"
                  onChange={handleCountryChange}
                  fullWidth
                  large
                />
              </div>
              <div className="d-flex justify-content-between mt-4 px-4">
                <p
                  className="primary-red text-decoration-underline fw-bold pointer"
                  onClick={() => setShowModal(true)}
                >
                  Deactivate my account
                </p>
                <div className="d-flex justify-content-end gap-3">
                  <button
                    className="btn button-secondary"
                    onClick={() => setCurrentFlow("personalInfo")}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn button-primary"
                    onClick={handleEditProfile}
                  >
                    Save Changes
                  </button>
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
              <p className="px-5 py-3 text-danger fw-bold">
                No pending reservations
              </p>
              {/*<Reservation image={placeholderImage} /> Will be implemented when ticket reservation system is implemented */}
            </>
          )}
          {currentFlow === "projections" && !loading && (
            <>
              <div className="d-flex justify-content-between mx-5 pt-5 pb-3">
                <h4>Projections</h4>
              </div>
              <div className="mt-3 border-bottom gap-5 d-flex mx-5">
                <TabButton
                  label={`Upcoming (${upcomingProjections.length})`}
                  isActive={activeTab === "upcoming"}
                  onClick={() => {
                    setActiveTab("upcoming");
                  }}
                />
                <TabButton
                  label={`Past (${expiredProjections.length})`}
                  isActive={activeTab === "past"}
                  onClick={() => {
                    setActiveTab("past");
                  }}
                />
              </div>
              {activeTab === "upcoming" && (
                <>
                  {upcomingProjections.length === 0 ? (
                    <p className="px-5 py-3 text-danger fw-bold">
                      No upcoming projections available.
                    </p>
                  ) : (
                    upcomingProjections.map((projection) => (
                      <Reservation
                        key={projection.id}
                        projection={projection}
                        upcoming
                      />
                    ))
                  )}
                </>
              )}
              {activeTab === "past" && (
                <>
                  {expiredProjections.length === 0 ? (
                    <p className="px-5 py-3 text-danger fw-bold">
                      No expired projections available.
                    </p>
                  ) : (
                    expiredProjections.map((projection) => (
                      <Reservation
                        key={projection.id}
                        projection={projection}
                        past
                      />
                    ))
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="fw-bold">Deactivate account?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to deactivate your account?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn button-secondary py-2" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn button-primary py-2"
            onClick={handleDeactivateAccount}
          >
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfile;
