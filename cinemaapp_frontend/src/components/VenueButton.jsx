import React from "react";

import colors from "../utils/colors";

const VenueButton = ({ id, name, onClick}) => {
  return (
    <div style={{ margin: "0 1rem" }}>
      <h5
        key={id}
        onClick={() => onClick(id)}
        style={{
          width: "fit-content",
          border: `1px solid ${colors.gray}`,
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          color: colors.text_gray,
          cursor: "pointer"
        }}
      >
        {name}
      </h5>
    </div>
  );
};

export default VenueButton;
