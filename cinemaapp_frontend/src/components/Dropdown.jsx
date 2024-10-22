import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "../styles/Dropdown.css";

const Dropdown = ({ icon: Icon, title, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [dropdownWidth, setDropdownWidth] = useState("auto");
  const [checkedItems, setCheckedItems] = useState({});

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option) => {
    setCheckedItems((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownWidth(`${dropdownRef.current.offsetWidth}px`);
    }
  }, [isOpen]);

  return (
    <div>
      <div
        className="dropdown-container"
        ref={dropdownRef}
        onClick={toggleDropdown}
      >
        <div className="dropdown-content">
          <div>
            {Icon && <Icon className="dropdown-icon" />}
            <span className="dropdown-title fw-light">{title}</span>
          </div>
          <IoIosArrowDown className="dropdown-arrow" />
        </div>
      </div>
      <div
        className={`dropdown-message ${isOpen ? "visible" : ""}`}
        style={{ width: dropdownWidth }}
      >
        {options.map((option, index) => (
          <div key={index} className="dropdown-option fw-light">
            <label className="d-flex gap-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={!!checkedItems[option]}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
