import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import colors from "../utils/colors";
import VenueButton from "./VenueButton";

const venues = [
  { id: 1, name: "Cineplex" },
  { id: 2, name: "Meeting point" },
  { id: 3, name: "Cinestar" },
  { id: 4, name: "Kinoteka" },
  { id: 5, name: "Kino Novi Grad" },
  { id: 6, name: "Kino Cinema City" },
  { id: 7, name: "Kino Cinema City" },
  { id: 8, name: "Kino Cinema City" },
];

const VenuesCarousel = () => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 2,
    draggable: true,
    cssEase: "linear",
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <Slider {...settings}>
        {venues.map((venue, index) => (
          <VenueButton key={venue.id} name={venue.name} />
        ))}
      </Slider>
    </div>
  );
};

export default VenuesCarousel;
