import React, { useState } from "react";
import "../styles/MovieCard.css";
import ProjectionTimes from "./ProjectionTimes";

const MovieCard = ({
  title,
  pgRating,
  language,
  movieDuration,
  genres,
  projectionEndDate,
  projectionTimes,
  photo,
}) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeClick = (time) => {
    setSelectedTime((prevTime) => (prevTime === time ? null : time));
  };

  const formattedEndDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(projectionEndDate));

  return (
    <div className="d-flex flex-column flex-md-row border rounded-5 p-3 mt-4 gap-4 gap-md-5 movie-card">
      <img
        src={photo}
        className="rounded-4 movie-card-image"
        alt="Movie Poster"
      />
      <div className="d-flex flex-column justify-content-between">
        <div>
          <h3 className="fw-bold">{title}</h3>
          <p className="mt-3">
            {pgRating} <span className="primary-red">|</span> {language}{" "}
            <span className="primary-red">|</span> {movieDuration}min
          </p>
          <div className="d-flex flex-wrap gap-2 gap-md-4">
            {genres.map((genre) => (
              <p key={genre.id} className="movie-card-category p-2 rounded m-0 mt-4">
                {genre.name}
              </p>
            ))}
          </div>
        </div>
        <p className="fw-light mt-3 mt-md-0">
          Playing in cinema until {formattedEndDate}
        </p>
      </div>
      <div className="mt-3 mt-md-0">
        <h5 className="primary-red fw-bold">Showtimes</h5>
        <div className="d-flex flex-wrap gap-2 gap-md-4 mt-2">
          <ProjectionTimes
            projectionTimes={projectionTimes}
            selectedTime={selectedTime}
            onTimeClick={handleTimeClick}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
