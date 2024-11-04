import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import { CiLocationOn } from "react-icons/ci";
import Card from "../components/Card";
import { movieService } from "../services/movieService";
import { venueService } from "../services/venueService";
import { genreService } from "../services/genreService";
import { projectionService } from "../services/projectionService";
import { TbMovie } from "react-icons/tb";
import { FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";

import "../styles/CurrentlyShowing.css";

const UpcomingMovies = () => {
  const [upcomingMovies, setupcomingMovies] = useState({
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

  useEffect(() => {
    if (searchQuery) {
      resetPage();
    }
  }, [searchQuery]);

  const resetPage = () => {
    setPage(0);
  };

  const loadMoreMovies = () => {
    setPage((prevState) => prevState + 1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCityChange = (selectedCities) => {
    setSelectedCities(selectedCities);
    resetPage();
  };

  const handleVenueChange = (selectedVenues) => {
    setSelectedVenues(selectedVenues);
    resetPage();
  };

  const handleGenreChange = (selectedGenres) => {
    setSelectedGenres(selectedGenres);
    resetPage();
  };

  const handleProjectionTimeChange = (selectedProjectionTimes) => {
    setSelectedProjectionTimes(selectedProjectionTimes);
    resetPage();
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const currentlyShowing = await movieService.getMovies({
        type: "upcoming",
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
      });
      setupcomingMovies((prevState) => ({
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
          Upcoming movies ({upcomingMovies.totalSize})
        </h2>

        <SearchBar onSearch={handleSearch} />
        <div className="row gx-4">
          <div className="col-12 col-md-3">
            <Dropdown
              icon={CiLocationOn}
              title="All Cities"
              options={cities}
              onChange={handleCityChange}
            />
          </div>
          <div className="col-12 col-md-3">
            <Dropdown
              icon={FaBuilding}
              title="All Cinemas"
              options={venues.venues.map((venue) => venue.name)}
              onChange={handleVenueChange}
            />
          </div>
          <div className="col-12 col-md-3">
            <Dropdown
              icon={BiCameraMovie}
              title="All Genres"
              options={genres.map((genre) => genre.name)}
              onChange={handleGenreChange}
            />
          </div>
          <div className="col-12 col-md-3">
            <Dropdown
              icon={FaCalendarAlt}
              title="All Projection Times"
              options={projectionTimes.map((time) => time.slice(0, 5))}
              onChange={handleProjectionTimeChange}
            />
          </div>
        </div>

        <div className="mt-4 d-flex flex-wrap justify-content-start gap-3 row">
          {upcomingMovies.movies.length > 0 ? (
            <>
              {upcomingMovies.movies.map((movie) => {
                return (
                  <Card
                    key={movie.id}
                    title={movie.name}
                    subtitle={movie.movieDuration}
                    genre={movie.genres.map((genre) => genre.name).join(", ")}
                    imageUrl={
                      movie.photos.find((photo) => photo.entityType === "movie")
                        ?.url
                    }
                    upcoming={movie.projectionStartDate}
                  />
                );
              })}

              {upcomingMovies.movies.length < upcomingMovies.totalSize && (
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
              <TbMovie size={80} />
              <h6 className="mt-4 fw-bold">No upcoming movies</h6>
              <p className="fw-light mt-4">
                We are working on updating our schedule for upcoming movies.
                Stay tuned for amazing movie
                <br /> experience or explore our other exciting cinema features
                in the meantime!
              </p>
              <Link
                to="/currently-showing"
                className="text-decoration-none"
                aria-label="Tickets"
              >
                <h6 className="fw-bold primary-red text-decoration-underline">
                  Explore Currently Showing Movies
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

export default UpcomingMovies;
