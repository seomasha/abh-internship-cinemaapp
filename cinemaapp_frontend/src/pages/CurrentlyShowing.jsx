import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import { CiLocationOn, CiClock1 } from "react-icons/ci";
import DayPicker from "../components/DayPicker";
import MovieCard from "../components/MovieCard";
import { Carousel } from "react-bootstrap";
import { movieService } from "../services/movieService";
import { venueService } from "../services/venueService";
import { genreService } from "../services/genreService";
import { projectionService } from "../services/projectionService";
import { TbMovie } from "react-icons/tb";

import "../styles/CurrentlyShowing.css";

const CurrentlyShowing = () => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentlyShowingMovies, setCurrentlyShowingMovies] = useState({
    movies: [],
    totalSize: 0,
  });
  const [venues, setVenues] = useState({ venues: [], totalSize: 0 });
  const [cities, setCities] = useState([]);
  const [genres, setGenres] = useState([]);
  const [projectionTimes, setProjectionTimes] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjectionTimes, setSelectedProjectionTimes] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const dayPickers = [];

  for (let i = 0; i < 10; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    const dateOptions = { month: "short", day: "numeric" };
    const dayOptions = { weekday: "short" };

    const date = nextDate.toLocaleDateString("en-US", dateOptions);
    const day = nextDate.toLocaleDateString("en-US", dayOptions);

    dayPickers.push(
      <DayPicker
        key={i}
        date={date}
        day={day}
        isSelected={selectedDay === i}
        onSelect={() => setSelectedDay(i)}
      />
    );
  }

  useEffect(() => {
    if (searchQuery) {
      setPage(0);
    }
  }, [searchQuery]);

  const loadMoreMovies = () => {
    setPage((prevState) => prevState + 1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const currentlyShowing = await movieService.getMovies({
        page: page,
        ...(searchQuery && { name: searchQuery }),
        ...(selectedProjectionTimes.length > 0 && {
          projectionTimes: selectedProjectionTimes.join(","),
        }),
        ...(selectedGenres.length > 0 && {
          genres: selectedGenres.join(","),
        }),
        ...(selectedCities.length > 0 && {
          cities: selectedCities.join(","),
        }),
        ...(selectedVenues.length > 0 && {
          venues: selectedVenues.join(","),
        }),
        ...(selectedDay !== null && {
          selectedDay: new Date(today.setDate(today.getDate() + selectedDay))
            .toISOString()
            .split("T")[0],
        }),
      });
      setCurrentlyShowingMovies((prevState) => ({
        movies:
          page > 0
            ? [...prevState.movies, ...currentlyShowing.movies]
            : currentlyShowing.movies,
        totalSize: currentlyShowing.totalSize,
      }));
    };

    fetchMovies();
  }, [
    page,
    searchQuery,
    selectedProjectionTimes,
    selectedGenres,
    selectedCities,
    selectedVenues,
    selectedDay,
  ]);

  useEffect(() => {
    const fetchVenues = async () => {
      const venueList = await venueService.getAll();
      setVenues({ venues: venueList.venues, totalSize: venueList.totalSize });
    };

    const fetchCities = async () => {
      const cityList = await venueService.getAllCities();
      setCities(cityList);
    };

    const fetchGenres = async () => {
      const genreList = await genreService.getAll();
      setGenres(genreList);
    };

    const fetchProjectionTimes = async () => {
      const projectionTimesList =
        await projectionService.getAllDistinctProjectionTimes();
      setProjectionTimes(projectionTimesList);
    };

    fetchVenues();
    fetchCities();
    fetchGenres();
    fetchProjectionTimes();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="p-5">
        <h2 className="fw-bold">
          Currently showing ({currentlyShowingMovies.totalSize})
        </h2>

        <SearchBar onSearch={handleSearch} />
        <div className="row gx-4">
          <div className="col-12 col-md-3">
            <Dropdown
              icon={CiLocationOn}
              title="All Cities"
              options={cities}
              onChange={setSelectedCities}
            />
          </div>
          <div className="col-12 col-md-3">
            <Dropdown
              icon={CiLocationOn}
              title="All Cinemas"
              options={venues.venues.map((venue) => venue.name)}
              onChange={setSelectedVenues}
            />
          </div>
          <div className="col-12 col-md-3">
            <Dropdown
              icon={CiLocationOn}
              title="All Genres"
              options={genres.map((genre) => genre.name)}
              onChange={setSelectedGenres}
            />
          </div>
          <div className="col-12 col-md-3">
            <Dropdown
              icon={CiClock1}
              title="All Projection Times"
              options={projectionTimes.map((time) => time.slice(0, 5))}
              onChange={setSelectedProjectionTimes}
            />
          </div>
        </div>

        <div className="mt-4 d-lg-none">
          <Carousel prevLabel="" nextLabel="" interval={null}>
            {dayPickers.map((picker, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-center">{picker}</div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <div className="d-none flex-wrap d-lg-flex justify-content-start justify-content-xl-between mt-4 gap-1">
          {dayPickers}
        </div>

        <div className="mt-4">
          {currentlyShowingMovies.movies.length > 0 ? (
            <>
              {currentlyShowingMovies.movies.map((movie) => {
                return (
                  <MovieCard
                    key={movie.id}
                    title={movie.name}
                    pgRating={movie.pgRating}
                    language={movie.language}
                    movieDuration={movie.movieDuration}
                    genres={movie.genres}
                    projectionEndDate={movie.projectionEndDate}
                    photo={
                      movie.photos.find((photo) => photo.entityType === "movie")
                        ?.url
                    }
                    projectionTimes={movie.projectionTimes}
                  />
                );
              })}

              {currentlyShowingMovies.movies.length <
                currentlyShowingMovies.totalSize && (
                <div className="text-center">
                  <button
                    className="btn primary-red text-decoration-underline fw-bold mt-4"
                    onClick={loadMoreMovies}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center border rounded-5 padding">
              <TbMovie size={128} />
              <h6 className="mt-4 fw-bold">No movies to preview for filters</h6>
              <p className="fw-light mt-4">
                We are working on updating our schedule for upcoming movies.
                Stay tuned for amazing movie
                <br /> experience or explore our other exciting cinema features
                in the meantime!
              </p>
              <Link
                to="/tickets"
                className="text-decoration-none"
                aria-label="Tickets"
              >
                <h6 className="fw-bold primary-red text-decoration-underline">
                  Explore Upcoming Movies
                </h6>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CurrentlyShowing;
