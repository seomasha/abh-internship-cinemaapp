import React, { useState, useRef } from "react";
import "../styles/OTPInput.css";

const OTPInput = ({ length = 4, onChange, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d$/.test(value) && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange && onChange(newOtp.join(""));

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete && onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <div className="otp-container">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
          className={`otp-input ${
            focusedIndex === index ? "otp-input-focus" : ""
          }`}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
        />
      ))}
    </div>
  );
};

export default OTPInput;
