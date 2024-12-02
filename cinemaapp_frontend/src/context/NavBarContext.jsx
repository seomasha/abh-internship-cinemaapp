import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserInfoFromToken } from "../utils/JwtDecode";

const NavBarContext = createContext();

export const useNavBar = () => {
  return useContext(NavBarContext);
};

export const NavBarProvider = ({ children }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [emailPrefix, setEmailPrefix] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const toggleSignIn = () => setShowSignIn((prevState) => !prevState);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
    setIsLoggedIn(false);
  };

  return (
    <NavBarContext.Provider
      value={{
        showSignIn,
        toggleSignIn,
        handleLogout,
        isLoggedIn,
        emailPrefix,
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
};
