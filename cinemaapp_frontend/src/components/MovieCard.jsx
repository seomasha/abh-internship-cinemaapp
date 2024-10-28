import React from "react";
import "../styles/MovieCard.css";

const MovieCard = () => {
  return (
    <div className="d-flex flex-column flex-md-row border rounded-5 p-3 mt-4 gap-4 gap-md-5 movie-card">
      <img
        src="https://artfiles.alphacoders.com/754/thumb-1920-75479.jpg"
        className="rounded-4 movie-card-image"
        alt="Movie Poster"
      />
      <div className="d-flex flex-column justify-content-between">
        <div>
          <h3 className="fw-bold">The Dark Knight</h3>
          <p className="mt-3">
            PG 13 <span className="primary-red">|</span> English{" "}
            <span className="primary-red">|</span> 117min
          </p>
          <div className="d-flex flex-wrap gap-2 gap-md-4">
            <p className="movie-card-category p-2 rounded">Fantasy</p>
            <p className="movie-card-category p-2 rounded">Adventure</p>
            <p className="movie-card-category p-2 rounded">Action</p>
          </div>
        </div>
        <p className="fw-light mt-3 mt-md-0">
          Playing in cinema until 14.02.2025
        </p>
      </div>
      <div className="mt-3 mt-md-0">
        <h5 className="primary-red fw-bold">Showtimes</h5>
        <div className="d-flex flex-wrap gap-2 gap-md-4 mt-2">
          <p className="fw-bold rounded border py-2 px-3">12:00</p>
          <p className="fw-bold rounded border py-2 px-3">15:00</p>
          <p className="fw-bold rounded border py-2 px-3">18:00</p>
          <p className="fw-bold rounded border py-2 px-3">21:00</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
