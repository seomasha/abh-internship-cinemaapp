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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async (email) => {
      const response = await userService.findUserByEmail(email);
      return response?.id;
    };

    const setUp = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const userInfo = getUserInfoFromToken(token);

        if (userInfo) {
          setEmailPrefix(userInfo.sub.split("@")[0]);
          setIsLoggedIn(true);
          const id = await getUserId(userInfo.sub);
          setUserId(id);
        }
      }
    };

    setUp();
  }, []);

  const toggleSignIn = () => setShowSignIn((prevState) => !prevState);

  const handleLogout = () => {
    localStorage.removeItem("token");
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
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
};
