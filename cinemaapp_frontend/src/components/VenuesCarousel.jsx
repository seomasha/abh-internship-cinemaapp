import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VenueButton from "./VenueButton";
import { movieService } from "../services/movieService";

const VenuesCarousel = ({ data, setMovies, setSelectedVenueId }) => {
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleVenueClick = async (venueId) => {
    const response = await movieService.getMoviesByVenueId(venueId);
    setMovies(response);
    setSelectedVenueId(venueId);
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
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VenuesCarousel;
