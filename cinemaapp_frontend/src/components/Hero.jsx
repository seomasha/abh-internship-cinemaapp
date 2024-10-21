import React from "react";
import { Carousel } from "react-bootstrap";
import HeroItem from "./HeroItem";

const Hero = ({ data }) => {
  const displayedItems = data.length >= 3 ? data.slice(0, 3) : data;

  return (
    <div>
      <Carousel controls={false}>
        {displayedItems.map((item) => (
          <Carousel.Item key={item.id}>
            <HeroItem
              title={item.title}
              description={item.description}
              imageUrl={item.image}
              genre={item.genre}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;