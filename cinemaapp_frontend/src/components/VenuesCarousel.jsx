import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VenueButton from "./VenueButton";
import ErrorHandler from "../services/errorHandler";
import { movieService } from "../services/movieService";

const VenuesCarousel = ({ data, setMovies, setSelectedVenueId }) => {
  const settings = {
    infinite: true,
    speed: 500,
    centerMode: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
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

  const handleVenueClick = async (venueId) => {
    try {
      const response = await movieService.getMoviesByVenueId(venueId);
      setMovies(response.data);
      setMovies(response);
      setSelectedVenueId(venueId);
    } catch (error) {
      ErrorHandler.handleError(error);
    }
  };

  return (
    <div
      style={{ padding: "2rem", textAlign: "center" }}
      className="slider-container"
    >
      <Slider {...settings}>
        {data.map((venue) => (
          <VenueButton
            id={venue.id}
            key={venue.id}
            name={venue.name}
            onClick={handleVenueClick}
          />
        ))}
      </Slider>
    </div>
  );
};

export default VenuesCarousel;
