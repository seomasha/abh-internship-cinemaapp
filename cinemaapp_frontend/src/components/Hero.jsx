import React from "react";
import { Carousel } from "react-bootstrap";
import HeroItem from "./HeroItem";
import colors from "../utils/colors";

const Hero = () => {
  return (
    <div>
      <Carousel controls={false}>
        <Carousel.Item>
          <HeroItem
            imageUrl="https://images6.alphacoders.com/130/1307795.jpg"
            title="Avatar: The way of water"
            description="Jake Sully lives with his newfound family formed on the extrasolar moon Pandora."
            genre="Adventure"
          />
        </Carousel.Item>
        <Carousel.Item>
          <HeroItem
            imageUrl="https://m.media-amazon.com/images/M/MV5BMTY2ODQ3NjMyMl5BMl5BanBnXkFtZTcwODg0MTUzNA@@._V1_.jpg"
            title="Upcoming Movies"
            description="Don't miss out on the latest releases!"
            genre="Adventure"
          />
        </Carousel.Item>
        <Carousel.Item>
          <HeroItem
            imageUrl="https://m.media-amazon.com/images/M/MV5BMTY2ODQ3NjMyMl5BMl5BanBnXkFtZTcwODg0MTUzNA@@._V1_.jpg"
            title="Join Us Now"
            description="Sign up to get the latest updates."
            genre="Adventure"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Hero;
