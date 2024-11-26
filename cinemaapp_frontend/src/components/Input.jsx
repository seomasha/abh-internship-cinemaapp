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
}) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="d-flex flex-column w-100 mb-4">
      <label className="text-white fs-6">{label}</label>
      <div className="d-flex bg-white align-items-center gap-2 rounded px-3 mt-1">
        {leadingIcon && (
          <span className="d-flex align-items-center">{leadingIcon}</span>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          className="rounded fs-6 border-0 w-100 mt-3 no-focus"
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
    </div>
  );
};

export default Input;
