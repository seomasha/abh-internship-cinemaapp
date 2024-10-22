import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import "../styles/SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-container">
      <IoSearchOutline className="search-icon" />
      <input type="search" className="search-input fw-light" placeholder="Search" />
    </div>
  );
};

export default SearchBar;
