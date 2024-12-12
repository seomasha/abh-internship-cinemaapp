import React from "react";
import { Button } from "react-bootstrap";
import HeroMovieCategory from "./HeroMovieCategory";

import "../styles/Hero.css";

const HeroItem = ({ imageUrl, title, description, genre }) => {
  return (
    <div
      className="hero-item"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="hero-item-content p-3">
        <div className="genres-container mb-3 d-flex flex-wrap">
          {genre.map((genreItem, index) => (
            <HeroMovieCategory key={index} genre={genreItem.name} />
          ))}
        </div>

        <h1 className="title fw-bold">{title}</h1>
        <p className="description fw-bold">{description}</p>
        <Button
          variant="danger"
          size="lg"
          className="text-white primary-red-background border-0 mt-3"
        >
          Buy Ticket
        </Button>
      </div>
    </div>
  );
};

export default HeroItem;
