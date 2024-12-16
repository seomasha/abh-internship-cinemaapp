import React, { useState } from "react";
import { BiText } from "react-icons/bi";
import "../styles/Input.css";

const TextArea = ({
  label,
  placeholder,
  value = "",
  onChange,
  invalid,
  invalidMessage,
}) => {
  const [charCount, setCharCount] = useState(value.length);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= 500) {
      onChange(e);
      setCharCount(newValue.length);
    }
  };

  return (
    <div className="d-flex flex-column w-100 mb-4">
      <label
        className={`fs-6 ${invalid ? "text-danger" : "text-dark fw-bold"}`}
      >
        {label}
      </label>
      <div
        className={`d-flex bg-white gap-2 rounded px-3 mt-1 ${
          invalid ? "border border-2 border-danger" : "border"
        }`}
        style={{ position: "relative" }}
      >
        <BiText
          size={20}
          className={`${invalid ? "text-danger" : "text-muted"} mt-3`}
        />

        <textarea
          placeholder={placeholder}
          className={`rounded fs-6 border-0 w-100 mt-3 no-focus ${
            invalid ? "text-danger" : ""
          }`}
          value={value}
          onChange={handleChange}
          rows={4}
          style={{ resize: "none" }}
        />
        <div
          className="char-count"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "12px",
            color: invalid ? "#dc3545" : "#6c757d",
          }}
        >
          {charCount}/500
        </div>
      </div>
      {invalid && <p className="text-danger mt-1">{invalidMessage}</p>}
    </div>
  );
};

export default TextArea;
