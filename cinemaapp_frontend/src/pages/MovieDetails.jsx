import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import movieRatingApiService from "../services/movieRatingApiService";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import DayPicker from "../components/DayPicker";
import SmallButton from "../components/SmallButton";
import PaginatedList from "../components/PaginatedList";
import HeroMovieCategory from "../components/HeroMovieCategory";
import ProjectionTimes from "../components/ProjectionTimes";
import { Spinner } from "react-bootstrap";
import screenSizes from "../utils/screenSizes";

import { movieService } from "../services/movieService";
import { useNavBar } from "../context/NavBarContext";

import {
  FaRegBuilding,
  FaArrowLeft,
  FaArrowRight,
  FaRegBell,
} from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

import "../styles/MovieDetails.css";
import { venueService } from "../services/venueService";
import Rating from "../components/Rating";
import { projectionService } from "../services/projectionService";

const MovieDetails = () => {
  const dayPickerContainerRef = useRef(null);
  const { id } = useParams();
  const [movies, setMovies] = useState({ movies: [], totalSize: 0 });
  const [movie, setMovie] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [cities, setCities] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedDay, setSelectedDay] = useState({
    index: null,
    day: null,
    date: null,
  });
  const [selectedTime, setSelectedTime] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recommendedMoviesPage, setRecommendedMoviesPage] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [projectionTimes, setProjectionTimes] = useState([]);
  const [selectedProjection, setSelectedProjection] = useState(null);
  const itemsPerPage = 6;

  const movieDetails = {
    projection: selectedProjection,
    selectedDay: selectedDay,
  };

  const navigate = useNavigate();

  const splitVenues = venues.map((venue) => {
    const [id, name] = venue.split(",");
    return { id: parseInt(id), name: name };
  });

  const selectedVenueId = splitVenues.find(
    (venue) => venue.name === selectedVenue[0]
  );

  const { toggleSignIn, isLoggedIn } = useNavBar();

  const today = new Date();
  const dateOptions = { month: "short", day: "numeric" };
  const dayOptions = { weekday: "short" };
  const nextDate = new Date(today);

  const scrollLeft = () => {
    dayPickerContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    dayPickerContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const handleTimeClick = (time) => {
    setSelectedTime((prevTime) => (prevTime === time ? null : time));
  };

  const handleReserveButton = () => {
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  useEffect(() => {
    const fetchSelectedProjection = async () => {
      if (selectedVenue.length > 0) {
        const projection = await projectionService.getProjection(
          id,
          selectedVenueId.id
        );
        setSelectedProjection(projection);
      }
    };
    fetchSelectedProjection();
  }, [id, selectedVenue]);

  const handleButtonClick = () => {
    navigate("/seat-and-tickets", { state: movieDetails });
  };

  const handleNotLoggedIn = () => {
    sessionStorage.setItem("redirectAfterLogin", `/seat-and-tickets`);
    toggleSignIn();
  };

  const dayPickers = [];
  for (let i = 0; i < 10; i++) {
    nextDate.setDate(today.getDate() + i);
    const date = nextDate.toLocaleDateString("en-US", dateOptions);
    const day = nextDate.toLocaleDateString("en-US", dayOptions);

    dayPickers.push(
      <DayPicker
        key={date}
        date={date}
        day={day}
        isSelected={selectedDay.index === i}
        onSelect={() => {
          if (i === selectedDay?.index) {
            setSelectedDay({ index: null, day: null, date: null });
          } else {
            setSelectedDay({ index: i, day: day, date: date });
          }
        }}
        small={true}
      />
    );
  }

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("redirectAfterLogin");
    };
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= screenSizes.medium);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProjectionTimes = async () => {
      const projectionTimes =
        await projectionService.getFilteredProjectionTimes(
          movie.name,
          selectedCity,
          selectedVenue
        );
      setProjectionTimes(projectionTimes);
    };
    fetchProjectionTimes();
  }, [movie.name, selectedCity, selectedVenue]);

  useEffect(() => {
    const fetchCities = async () => {
      const cityList = await venueService.getCitiesByMovieName(movie.name);
      setCities(cityList);
    };

    const fetchVenues = async () => {
      const venueList = await venueService.getVenuesByCityAndMovieName(
        movie.name,
        selectedCity
      );
      setVenues(venueList.map((venue) => venue));
    };

    fetchCities();
    fetchVenues();
  }, [movie.name, selectedCity]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieList = await movieService.getMovies({
        page: recommendedMoviesPage,
        size: itemsPerPage,
      });
      setMovies({ movies: movieList.movies, totalSize: movieList.totalSize });
    };

    fetchMovies();
  }, [recommendedMoviesPage]);

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await movieService.get(id);
      setMovie(movieData);
      setLoading(false);
    };

    const fetchRatings = async () => {
      if (movie?.name) {
        const ratingData = await movieRatingApiService.getMovieRatings(
          movie?.name
        );
        setRatings(ratingData.Ratings);
      }
    };

    fetchMovie();
    fetchRatings();
  }, [id, movie?.name]);

  const handleRecommendedMoviesPage = (newPage) => {
    setRecommendedMoviesPage(newPage);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <NavBar state={movieDetails} />
      <h3 className="px-5 py-4">Movie Details</h3>
      <div className="px-5 pb-3 d-flex flex-column flex-lg-row  align-items-center">
        <div className="video-container me-5 container d-flex justify-content-center">
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
            className={`rounded${isSmallScreen ? "" : "-left-corners"}`}
            style={{
              minWidth: "250px",
              maxWidth: "100%",
              minHeight: "250px",
              height: "560px",
            }}
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
                    index === 2 && !isSmallScreen ? "rounded-top-right" : ""
                  } ${
                    index === 4 && !isSmallScreen ? "rounded-bottom-right" : ""
                  }`}
                />
              )
          )}
        </div>
      </div>

      <div className="px-3 px-md-5 d-flex flex-column flex-md-row justify-content-between">
        <div className="col-12 col-md-6">
          <h3>{movie.name}</h3>
          <h6 className="fw-light gap-3 py-2">
            {movie.pgRating} <span className="primary-red px-2">|</span>
            {movie.language} <span className="primary-red px-2">|</span>
            {movie.movieDuration} Min{" "}
            <span className="primary-red px-2">|</span>
            Projection date: {movie.projectionStartDate} -{" "}
            {movie.projectionEndDate}
          </h6>
          <div className="d-flex gap-3 py-2 flex-wrap">
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
        <div className="border rounded-4 col-12 col-md-6 shadow mt-4 mt-md-0">
          {showSuccessMessage ? (
            <div className="d-flex flex-column p-3 text-center success-message">
              <h4 className="fw-bold">{movie.name} is coming in April!</h4>
              <p className="mt-3">
                Get notified when the movie is part of the schedule
              </p>
              <div className="mt-5 p-5 mx-auto">
                <div className="icon-container p-5 rounded-circle bell-animation">
                  <FaRegBell size={48} className="bell" />
                </div>
              </div>
              <hr />
              <button className="btn flex-grow-1 button-primary">
                Notify me
              </button>
              <p className="mt-3">
                Only signed-up users can be notified.{" "}
                <span className="text-decoration-underline fw-bold">
                  Sign up.
                </span>
              </p>
            </div>
          ) : (
            <div>
              <div className="d-flex flex-column flex-md-row justify-content-between p-4 gap-3 container">
                <div className="dropdown-full-width col-12 col-md-6">
                  <Dropdown
                    icon={CiLocationOn}
                    title="Choose City"
                    options={cities}
                    onChange={(selectedCity) => setSelectedCity(selectedCity)}
                    isUnique={true}
                  />
                </div>
                <div className="dropdown-full-width col-12 col-md-6">
                  <Dropdown
                    icon={FaRegBuilding}
                    title="Choose Cinema"
                    options={splitVenues.map((venue) => venue.name)}
                    onChange={(selectedVenue) =>
                      setSelectedVenue(selectedVenue)
                    }
                    isUnique={true}
                  />
                </div>
              </div>

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
              <div className="d-flex flex-column flex-md-row px-4 py-2 gap-3">
                <ProjectionTimes
                  projectionTimes={projectionTimes}
                  selectedTime={selectedTime}
                  onTimeClick={handleTimeClick}
                />
              </div>

              <hr />

              <div className="d-flex flex-column flex-md-row px-4 mb-4 gap-3">
                <button
                  className="btn flex-grow-1 button-secondary"
                  onClick={handleReserveButton}
                  disabled={
                    selectedTime === null ||
                    selectedDay.day === null ||
                    selectedDay.date === null
                  }
                >
                  Reserve Ticket
                </button>
                <button
                  className="btn flex-grow-1 button-primary"
                  onClick={isLoggedIn ? handleButtonClick : handleNotLoggedIn}
                  disabled={
                    selectedDay.day === null ||
                    selectedDay.date === null ||
                    selectedTime === null
                  }
                >
                  Buy Ticket
                </button>
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
          {ratings && ratings.length > 0 ? (
            ratings.map((rating) => (
              <Rating
                key={rating.Source}
                source={rating.Source}
                value={rating.Value}
              />
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
        page={recommendedMoviesPage}
        onPageChange={handleRecommendedMoviesPage}
        perPage={6}
      />
      <Footer />
    </div>
  );
};

export default MovieDetails;
