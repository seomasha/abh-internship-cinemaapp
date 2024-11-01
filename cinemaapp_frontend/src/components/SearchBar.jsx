import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import "../styles/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const debounceDelay = setTimeout(() => {
      onSearch(inputValue);
    }, 500);

    return () => clearTimeout(debounceDelay);
  }, [inputValue, onSearch]);

  return (
    <div className="search-container">
      <IoSearchOutline className="search-icon" />
      <input
        type="search"
        className="search-input fw-light"
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
