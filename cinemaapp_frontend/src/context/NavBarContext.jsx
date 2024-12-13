import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserInfoFromToken } from "../utils/JwtDecode";
import { userService } from "../services/userService";

const NavBarContext = createContext();

export const useNavBar = () => {
  return useContext(NavBarContext);
};

export const NavBarProvider = ({ children }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [emailPrefix, setEmailPrefix] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  ); // Initialize from localStorage
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const getUserId = async (email) => {
      const response = await userService.findUserByEmail(email);
      setRole(response?.role);
      localStorage.setItem("role", response?.role); // Store role in localStorage
      return response?.id;
    };

    const setUp = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const userInfo = getUserInfoFromToken(token);

        if (userInfo) {
          setEmailPrefix(userInfo.sub.split("@")[0]);
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");

          const id = await getUserId(userInfo.sub);
          setUserId(id);
          localStorage.setItem("userId", id);
        }
      }
    };

    if (!isLoggedIn) {
      setUp();
    }
  }, [isLoggedIn]);
  const toggleSignIn = () => setShowSignIn((prevState) => !prevState);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("redirectAfterLogin");
    window.location.href = "/";
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <NavBarContext.Provider
      value={{
        showSignIn,
        toggleSignIn,
        handleLogout,
        isLoggedIn,
        emailPrefix,
        userId,
        role,
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
};
