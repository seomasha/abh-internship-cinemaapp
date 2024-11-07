import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import DayPicker from "../components/DayPicker";
import SmallButton from "../components/SmallButton";
import PaginatedList from "../components/PaginatedList";
import HeroMovieCategory from "../components/HeroMovieCategory";

import { movieService } from "../services/movieService";

import {
  FaRegStar,
  FaRegBuilding,
  FaArrowLeft,
  FaArrowRight,
  FaRegBell,
} from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

import "../styles/MovieDetails.css";
import axios from "axios";
import { venueService } from "../services/venueService";

const MovieDetails = () => {
  const dayPickerContainerRef = useRef(null);
  const { id } = useParams();
  const [movies, setMovies] = useState({ movies: [], totalSize: 0 });
  const [movie, setMovie] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [cities, setCities] = useState([]);
  const [venues, setVenues] = useState({ venues: [], totalSize: 0 });
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const today = new Date();

  const dateOptions = { month: "short", day: "numeric" };
  const dayOptions = { weekday: "short" };

  const scrollLeft = () => {
    dayPickerContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    dayPickerContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const handleTimeClick = (time) => {
    setSelectedTime((prevTime) => (prevTime === time ? null : time));
  };

  const handleButtonClick = () => {
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  const dayPickers = [];
  for (let i = 0; i < 10; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    const date = nextDate.toLocaleDateString("en-US", dateOptions);
    const day = nextDate.toLocaleDateString("en-US", dayOptions);

    dayPickers.push(
      <DayPicker
        key={i}
        date={date}
        day={day}
        isSelected={selectedDay === i}
        onSelect={() => {
          if (i === selectedDay) {
            setSelectedDay(null);
          } else {
            setSelectedDay(i);
          }
        }}
        small={true}
      />
    );
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const movieList = await movieService.getMovies({ size: 6 });
      setMovies({ movies: movieList.movies, totalSize: movieList.totalSize });
    };

    const fetchCities = async () => {
      const cityList = await venueService.getAllCities();
      setCities(cityList);
    };

    const fetchVenues = async () => {
      const venueList = await venueService.getAll();
      setVenues({ venues: venueList.venues, totalSize: venueList.totalSize });
    };

    fetchCities();
    fetchMovies();
    fetchVenues();
  }, []);

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await movieService.get(id);
      setMovie(movieData);
    };

    const fetchRatings = async () => {
      const ratings = await axios.get(
        `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&t=${movie.name.replace(" ", "+")}`
      );
      setRatings(ratings.data);
    };

    fetchMovie();
    fetchRatings();
  }, [id, movie.name]);

  return (
    <div>
      <NavBar />
      <h3 className="px-5 py-4">Movie Details</h3>

      <div className="px-5 pb-3 d-flex align-items-center">
        <div className="video-container me-5">
          <iframe
            width="100%"
            height="560"
            src={
              movie.trailerLink
                ? movie.trailerLink.replace("watch?v=", "embed/")
                : ""
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-left-corners"
          ></iframe>
        </div>

        <div className="image-grid">
          {movie.photos?.map(
            (photo, index) =>
              photo.entityType === "movie" && (
                <img
                  key={photo.id}
                  src={photo.url}
                  alt={`Image ${index + 1}`}
                  className={`grid-image ${
                    index === 2 ? "rounded-top-right" : ""
                  } ${index === 4 ? "rounded-bottom-right" : ""}`}
                />
              )
          )}
        </div>
      </div>

      <div className="px-5 d-flex justify-content-between">
        <div>
          <h3>{movie.name}</h3>
          <h6 className="fw-light gap-3 py-2">
            {movie.pgRating} <span className="primary-red px-2">|</span>
            {movie.language} <span className="primary-red px-2">|</span>
            {movie.movieDuration} Min{" "}
            <span className="primary-red px-2">|</span>
            Projection date: {movie.projectionStartDate} -{" "}
            {movie.projectionEndDate}
          </h6>
          <div className="d-flex gap-3 py-2">
            {movie.genres?.map((genre) => (
              <HeroMovieCategory key={genre.id} genre={genre.name} />
            ))}
          </div>
          <p className="w-full fs-6 py-2">{movie.synopsis}</p>
          <div className="fw-light py-4">
            <h6>Director: {movie.director}</h6>
            <h6 className="mt-4">Writers: {movie.writers}</h6>
          </div>
          <div className="d-flex align-items-center mb-4">
            <div className="vertical-line"></div>
            <h4>Cast</h4>
          </div>
          <div className="cast-grid">
            {movie.actors?.split(",").map((actor) => (
              <span key={actor} className="fw-bold fs-6">
                {actor}
              </span>
            ))}
          </div>
        </div>
        <div className="border rounded-4 w-50 shadow">
          {showSuccessMessage ? (
            <div className="p-3 text-center">
              <h5>{movie.name}</h5>
              <p>Get notified when the movie is part of the schedule</p>
              <FaRegBell />
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-between p-4 gap-3">
                <div className="dropdown-full-width">
                  <Dropdown
                    icon={CiLocationOn}
                    title="Choose City"
                    options={cities}
                    onChange={() => console.log("test")}
                  />
                </div>
                <div className="dropdown-full-width">
                  <Dropdown
                    icon={FaRegBuilding}
                    title="Choose Cinema"
                    options={venues.venues.map((venue) => venue.name)}
                    onChange={() => console.log("test")}
                  />
                </div>
              </div>
              <div>
                <div className="d-flex flex-column align-items-center px-4">
                  <div
                    className="day-picker-container"
                    ref={dayPickerContainerRef}
                  >
                    {dayPickers}
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-2 gap-3 px-4">
                  <SmallButton onClick={scrollLeft} icon={<FaArrowLeft />} />
                  <SmallButton onClick={scrollRight} icon={<FaArrowRight />} />
                </div>
                <h5 className="mt-5 px-4">Standard</h5>
                <div className="d-flex px-4 py-2 gap-3">
                  {movie.projectionTimes?.map((time, index) => (
                    <p
                      key={index}
                      onClick={() => handleTimeClick(time)}
                      className={`fw-bold rounded border py-2 px-3 ${
                        selectedTime === time ? "selected-time" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      {time.slice(0, 5)}
                    </p>
                  ))}
                </div>
                <hr />
                <div className="d-flex px-4 mb-4 gap-3">
                  <button
                    className="btn flex-grow-1 button-secondary"
                    onClick={handleButtonClick}
                    disabled={selectedDay === null || selectedTime === null}
                  >
                    Reserve Ticket
                  </button>
                  <button
                    className="btn flex-grow-1 button-primary"
                    onClick={handleButtonClick}
                    disabled={selectedDay === null || selectedTime === null}
                  >
                    Buy Ticket
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-5 mt-4">
        <div className="d-flex align-items-center mb-4">
          <div className="vertical-line"></div>
          <h4>Rating</h4>
        </div>
        <div className="d-flex gap-3 mb-4">
          {ratings.Ratings && ratings.Ratings.length > 0 ? (
            ratings.Ratings.map((rating) => (
              <div
                key={rating.source}
                className="d-flex align-items-center gap-2 border rounded p-3"
              >
                <FaRegStar size={20} className="primary-red" />
                <div>
                  <h6>{rating.Value}</h6>
                  <p>{rating.Source}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No ratings available</p>
          )}
        </div>
      </div>
      <PaginatedList
        title="See Also"
        data={movies.movies}
        totalSize={movies.totalSize}
      />
      <Footer />
    </div>
  );
};

export default MovieDetails;
