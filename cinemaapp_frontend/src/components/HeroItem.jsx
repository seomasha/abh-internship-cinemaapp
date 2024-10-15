import React from "react";
import { Button } from "react-bootstrap";
import HeroMovieCategory from "./HeroMovieCategory";
import colors from "../utils/colors";

const HeroItem = ({ imageUrl, title, description, genre }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
        minHeight: "810px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "flex-end",
        padding: "8rem",
      }}
    >
      <div
        style={{
          color: "white",
          borderRadius: "10px",
          width: "fit-content",
        }}
        className="p-3"
      >
        <div className="mb-3">
          <HeroMovieCategory genre={genre} />
        </div>
        <h1 className="font-weight-bold" style={{ fontSize: "48px" }}>
          {title}
        </h1>
        <p className="w-75">{description}</p>
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
