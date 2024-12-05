import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../styles/Input.css";

const Input = ({
  label,
  placeholder,
  type = "text",
  leadingIcon,
  value,
  onChange,
  invalid,
  invalidMessage,
  dark = false,
}) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="d-flex flex-column w-100 mb-4">
      <label
        className={`fs-6 ${
          invalid ? "text-danger" : dark ? "text-dark fw-bold" : "text-white"
        }`}
      >
        {label}
      </label>
      <div
        className={`d-flex bg-white align-items-center gap-2 border rounded px-3 mt-1 ${
          invalid ? "border border-2 border-danger" : ""
        }`}
      >
        {leadingIcon && (
          <span
            className={`d-flex align-items-center ${
              (invalid ? "text-danger" : "") || (value ? "text-danger" : "")
            }`}
          >
            {leadingIcon}
          </span>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          className={`rounded fs-6 border-0 w-100 my-2 py-2 no-focus ${
            invalid ? "text-danger" : ""
          }`}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <span
            className="d-flex align-items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {inputType === "password" ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        )}
      </div>
      {invalid && <p className="text-danger mt-1">{invalidMessage}</p>}
    </div>
  );
};

export default Input;
