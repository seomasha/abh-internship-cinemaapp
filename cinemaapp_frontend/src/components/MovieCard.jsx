import React from "react";
import "../styles/MovieCard.css";

const MovieCard = () => {
  return (
    <div className="d-flex border rounded-5 p-3 mt-4 gap-5 movie-card">
      <img
        src="https://artfiles.alphacoders.com/754/thumb-1920-75479.jpg"
        className="rounded-4"
      />
      <div className="d-flex flex-column justify-content-between">
        <div>
          <h3 className="fw-bold">The Dark Knight</h3>
          <p className="mt-4">
            PG 13 <span className="primary-red">|</span> English{" "}
            <span className="primary-red">|</span> 117min
          </p>
          <div className="d-flex flex-wrap gap-4">
            <p className="movie-card-category p-2 rounded">Fantasy</p>
            <p className="movie-card-category p-2 rounded">Fantasy</p>
            <p className="movie-card-category p-2 rounded">Fantasy</p>
          </div>
        </div>
        <p className="fw-light">Playing in cinema until 14.02.2025</p>
      </div>
      <div>
        <h5 className="primary-red fw-bold">Showtimes</h5>
        <div className="d-flex gap-4">
          <p className="fw-bold rounded border py-2 px-3">12:00</p>
          <p className="fw-bold rounded border py-2 px-3">12:00</p>
          <p className="fw-bold rounded border py-2 px-3">12:00</p>
          <p className="fw-bold rounded border py-2 px-3">12:00</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
