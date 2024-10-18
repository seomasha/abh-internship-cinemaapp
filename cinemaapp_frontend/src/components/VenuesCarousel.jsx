import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <Slider {...settings}>
        {venues.map((venue) => (
          <VenueButton key={venue.id} name={venue.name} />
        ))}
      </Slider>
    </div>
  );
};

export default VenuesCarousel;
