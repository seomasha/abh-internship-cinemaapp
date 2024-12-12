import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { DateRangePicker } from "rsuite";
import "../styles/DatePicker.css";

const DatePickerDropdown = ({
  icon: Icon,
  label,
  title,
  onChange,
  fullWidth = false,
  invalid,
  invalidMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [dropdownWidth, setDropdownWidth] = useState("auto");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownWidth(`${dropdownRef.current.offsetWidth}px`);
    }
  }, [isOpen]);

  const handleDateChange = (range) => {
    if (range) {
      setStartDate(range[0]);
      setEndDate(range[1]);
    }
  };

  const handleApply = () => {
    if (startDate && endDate) {
      onChange({ startDate, endDate });
      setIsOpen(false);
    }
  };

  return (
    <div className={fullWidth ? "w-100" : ""}>
      <p className={`fs-6 ${invalid ? "text-danger" : ""}`}>{label}</p>
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
        <div className="date-picker d-flex gap-3 flex-column justify-content-center">
          <div className="d-flex justify-content-between">
            <h6 className="border rounded px-3 py-1">
              <p className="fw-light" style={{ fontSize: "12px" }}>
                Start date
              </p>
              {startDate ? `${startDate.toDateString()}` : "YYYY/MM/DD"}
            </h6>
            <h6 className="border rounded px-3 py-1">
              <p className="fw-light" style={{ fontSize: "12px" }}>
                End date
              </p>
              {endDate ? `${endDate.toDateString()}` : "YYYY/MM/DD"}
            </h6>
          </div>
          <DateRangePicker
            showOneCalendar
            onChange={handleDateChange}
            value={startDate && endDate ? [startDate, endDate] : null}
          />
        </div>
        <div className="d-flex justify-content-end gap-3">
          <button
            className="btn button-secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button className="btn button-primary" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
      {invalid && <div className="error-message">{invalidMessage}</div>}
    </div>
  );
};

export default DatePickerDropdown;
