import React from "react";
import colors from "../utils/colors";

const HeroMovieCategory = ({ genre }) => {
  return (
    <h6
      className="bg-light text-dark p-2 rounded me-2 d-inline-block"
      style={{
        backgroundColor: colors.gray,
        color: colors.text_dark,
      }}
    >
      {genre}
    </h6>
  );
};

export default HeroMovieCategory;
