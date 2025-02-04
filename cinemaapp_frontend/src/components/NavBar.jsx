import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Nav, Navbar, Dropdown } from "react-bootstrap";
import { BsCameraReelsFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import "../styles/Navbar.css";
import AuthForm from "./AuthForm";
import { useNavBar } from "../context/NavBarContext";
import { FaRegBell } from "react-icons/fa";
import { notificationService } from "../services/notificationService";
import Notification from "./Notification";
import useWebSocket from "../hooks/useWebSocket";

const NavBar = ({ state }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changedPassword, setChangedPassword] = useState("");
  const [confirmChangedPassword, setConfirmChangedPassword] = useState("");
  const [currentFlow, setCurrentFlow] = useState("signIn");
  const [passwordResetStep, setPasswordResetStep] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const {
    showSignIn,
    toggleSignIn,
    handleLogout,
    isLoggedIn,
    emailPrefix,
    role,
  } = useNavBar();

  const navigate = useNavigate();

  const { notifications: liveNotifications } = useWebSocket();

  const navTabs = [
    { id: 1, path: "/currently-showing", label: "Currently showing" },
    { id: 2, path: "/upcoming", label: "Upcoming movies" },
    { id: 3, path: "/venues", label: "Venues" },
  ];

  useEffect(() => {
    const getNotifications = async () => {
      const response = await notificationService.getNotificationsByUserId(
        localStorage.getItem("userId")
      );
      setNotifications(response);
    };

    getNotifications();
  }, []);

  useEffect(() => {
    if (liveNotifications && liveNotifications.length > 0) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        ...liveNotifications,
      ]);
    }
  }, [liveNotifications]);

  useEffect(() => {
    const calculateUnreadCount = () => {
      const unread = notifications.filter((notif) => !notif.read).length;
      setUnreadCount(unread);
    };

    calculateUnreadCount();
  }, [notifications]);

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

  const navigateToAdminPanel = () => {
    navigate("/admin");
  };

  const markAsRead = (notifId) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === notifId ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);

    const unread = updatedNotifications.filter((notif) => !notif.read).length;
    setUnreadCount(unread);
  };

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
            <h4 className="d-flex my-auto fw-bold text-white">
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
          <div className="d-flex gap-3">
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-light"
                className="bell-container rounded-3 position-relative"
                id="notification-dropdown"
              >
                <FaRegBell size={18} />
                {unreadCount > 0 && <div className="notification-badge"></div>}
              </Dropdown.Toggle>
              <Dropdown.Menu className="notification-dropdown dropdown-menu-end">
                {notifications.length > 0 ? (
                  notifications.map((notif, index) => (
                    <Dropdown.Item
                      key={notif.id}
                      className="notification-item"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Notification
                        id={notif.id}
                        notif={notif}
                        markAsRead={markAsRead}
                      />
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item>No new notifications</Dropdown.Item>
                )}
                <div className="d-flex justify-content-evenly align-items-center">
                  <p
                    style={{ fontSize: "12px" }}
                    className={`text-center primary-red text-decoration-underline fw-bold pt-4 pointer mt-1 ${
                      notifications.length === 0 ? "disabled" : ""
                    }`}
                    onClick={() => {
                      if (notifications.length > 0) {
                        notificationService.clearAllNotifications(
                          localStorage.getItem("userId")
                        );
                        setNotifications([]);
                        setUnreadCount(0);
                      }
                    }}
                  >
                    Clear all notifications
                  </p>
                </div>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-light"
                id="dropdown-basic"
                className="px-4 py-2"
              >
                {emailPrefix} <span className="caret"></span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/profile")}>
                  Profile
                </Dropdown.Item>
                {role === "admin" && (
                  <Dropdown.Item onClick={navigateToAdminPanel}>
                    Admin
                  </Dropdown.Item>
                )}
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <Button
            variant="outline-light"
            className="px-4 py-2"
            onClick={toggleSignIn}
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
            setShowSignIn={toggleSignIn}
            state={state}
          />
        </div>
      </div>
    </Navbar>
  );
};

export default NavBar;
