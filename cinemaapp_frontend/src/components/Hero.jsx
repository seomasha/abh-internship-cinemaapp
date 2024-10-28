import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import HeroItem from "./HeroItem";
import screenSizes from "../utils/screenSizes";

const Hero = ({ data }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= screenSizes.medium);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedItems = data.length >= 3 ? data.slice(0, 3) : data;

  return (
    <div>
      <Carousel controls={false}>
        {displayedItems.map((item) => (
          <Carousel.Item key={item.id}>
            <HeroItem
              title={item.name}
              description={
                isSmallScreen
                  ? item.synopsis.slice(0, 45) +
                    (item.synopsis.length > 45 ? "..." : "")
                  : item.synopsis
              }
              imageUrl={
                item.photos.find((photo) => photo.entityType === "movie")?.url
              }
              genre={item.genres}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
