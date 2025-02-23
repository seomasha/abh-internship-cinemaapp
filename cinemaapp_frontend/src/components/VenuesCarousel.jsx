import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VenueButton from "./VenueButton";
import screenSizes from "../utils/screenSizes";

const VenuesCarousel = ({
  data,
  setMovies,
  setSelectedVenueId,
  selectedVenueId,
}) => {
  const settings = {
    infinite: true,
    dots: false,
    speed: 500,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: screenSizes.extraLarge,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: screenSizes.large,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: screenSizes.medium,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: screenSizes.small,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleVenueClick = (venueId) => {
    setSelectedVenueId((prevSelectedId) =>
      prevSelectedId === venueId ? null : venueId
    );
  };
  return (
    <div style={{ padding: "2rem" }}>
      <Slider {...settings}>
        {data.map((venue) => (
          <div key={venue.id} className="d-flex justify-content-center">
            <VenueButton
              id={venue.id}
              name={venue.name}
              onClick={() => handleVenueClick(venue.id)}
              isSelected={selectedVenueId === venue.id}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VenuesCarousel;
