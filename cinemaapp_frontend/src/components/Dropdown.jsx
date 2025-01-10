import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "../styles/Dropdown.css";

const Dropdown = ({
  icon: Icon,
  label,
  title,
  options,
  onChange,
  fullWidth = false,
  invalid,
  invalidMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [dropdownWidth, setDropdownWidth] = useState("auto");
  const [checkedItems, setCheckedItems] = useState({});

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [option]: !checkedItems[option],
    };
    setCheckedItems(updatedCheckedItems);
    onChange(
      Object.keys(updatedCheckedItems).filter(
        (item) => updatedCheckedItems[item]
      )
    );
  };

  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownWidth(`${dropdownRef.current.offsetWidth}px`);
    }
  }, [isOpen]);

  return (
    <div className={fullWidth ? "w-100" : ""}>
      <p className={`fs-6 ${invalid ? "text-danger" : "fw-bold"}`}>{label}</p>
      <div
        className={`dropdown-container ${
          invalid ? "border border-2 border-danger" : ""
        }`}
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
      {invalid && <div className="error-message">{invalidMessage}</div>}{" "}
    </div>
  );
};

export default Dropdown;
