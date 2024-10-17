import React from "react";
import { Button } from "react-bootstrap";
import HeroMovieCategory from "./HeroMovieCategory";
import colors from "../utils/colors";

const HeroItem = ({ imageUrl, title, description, genre }) => {
  return (
    <div
      className="hero-item"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="p-3 hero-item-content">
        <div className="mb-3 d-flex flex-wrap">
          {genre.map((genreItem, index) => (
            <HeroMovieCategory key={index} genre={genreItem} />
          ))}
        </div>

        <h1 className="bold-title hero-title">{title}</h1>
        <p className="w-75" style={{ fontFamily: "Urbanist Bold" }}>
          {description}
        </p>
        <Button
          variant=""
          style={{ backgroundColor: colors.primary_red, color: "white" }}
          size="lg"
        >
          Buy ticket
        </Button>
      </div>
    </div>
  );
};

export default HeroItem;
