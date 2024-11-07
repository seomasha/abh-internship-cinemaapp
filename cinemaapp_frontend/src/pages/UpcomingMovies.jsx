import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import { CiLocationOn } from "react-icons/ci";
import Card from "../components/Card";
import { movieService } from "../services/movieService";
import { venueService } from "../services/venueService";
import { genreService } from "../services/genreService";
import { TbMovie } from "react-icons/tb";
import { FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";

import "../styles/CurrentlyShowing.css";
import DatePickerDropdown from "../components/DatePickerDropdown";

const UpcomingMovies = () => {
  const [upcomingMovies, setupcomingMovies] = useState({
    movies: [],
    totalSize: 0,
  });
  const [venues, setVenues] = useState({ venues: [], totalSize: 0 });
  const [cities, setCities] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

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

  const handleDateChange = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate });
    resetPage();
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const currentlyShowing = await movieService.getMovies({
        type: "upcoming",
        page: page,
        ...(searchQuery && { name: searchQuery }),
        ...(selectedGenres.length > 0 && {
          genres: selectedGenres.join(","),
        }),
        ...(selectedCities.length > 0 && {
          cities: selectedCities.join(","),
        }),
        ...(selectedVenues.length > 0 && {
          venues: selectedVenues.join(","),
        }),
        ...(dateRange.startDate &&
          dateRange.endDate && {
            upcomingStartDate: dateRange.startDate.toISOString().split("T")[0],
            upcomingEndDate: dateRange.endDate.toISOString().split("T")[0],
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
    selectedGenres,
    selectedCities,
    selectedVenues,
    dateRange,
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

    fetchVenues();
    fetchCities();
    fetchGenres();
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
            <DatePickerDropdown
              title="Date range"
              icon={FaCalendarAlt}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className="mt-4">
          {upcomingMovies.movies.length > 0 ? (
            <>
              <div className="card-grid">
                {upcomingMovies.movies.map((movie) => {
                  return (
                    <Card
                      key={movie.id}
                      title={movie.name}
                      subtitle={movie.movieDuration}
                      genre={movie.genres.map((genre) => genre.name).join(", ")}
                      imageUrl={
                        movie.photos.find(
                          (photo) => photo.entityType === "movie"
                        )?.url
                      }
                      upcoming={movie.projectionStartDate}
                    />
                  );
                })}
              </div>

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
