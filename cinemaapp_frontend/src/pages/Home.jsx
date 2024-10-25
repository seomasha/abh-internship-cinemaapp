import React, { useState, useEffect } from "react";

import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import VenuesCarousel from "../components/VenuesCarousel";
import PaginatedList from "../components/PaginatedList";
import Footer from "../components/Footer";

import { movieService } from "../services/movieService";
import { venueService } from "../services/venueService";
import { projectionService } from "../services/projectionService";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [currentlyShowingMovies, setCurrentlyShowingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesAndVenues = async () => {
      const movies = await movieService.getAll();
      const venues = await venueService.getAll();

      setHeroMovies(movies);
      setVenues(venues);

      setCurrentlyShowingMovies(
        movies.filter((movie) => movie.status === "Released")
      );
      setUpcomingMovies(
        movies.filter((movie) => movie.status === "Unreleased")
      );
    };

    fetchMoviesAndVenues();
  }, []);

  useEffect(() => {
    const fetchCurrentlyShowingAndUpcomingMovies = async () => {
      const movies = await projectionService.getProjectionsByVenueId(
        selectedVenueId
      );

      const todaysMovies = movies.filter(
        (movie) =>
          movie.projectionDate &&
          movie.projectionDate.split("T")[0] ===
            new Date().toISOString().split("T")[0]
      );

      const upcomingMovies = movies.filter(
        (movie) => movie.projectionDate === null
      );

      setCurrentlyShowingMovies(todaysMovies.map((movie) => movie.movieId));
      setUpcomingMovies(upcomingMovies.map((movie) => movie.movieId));
    };

    if (selectedVenueId !== null) {
      fetchCurrentlyShowingAndUpcomingMovies();
    }
  }, [selectedVenueId]);

  return (
    <div>
      {console.log(upcomingMovies)}
      <NavBar />
      <Hero data={heroMovies} />
      <VenuesCarousel
        data={venues}
        setMovies={setMovies}
        setSelectedVenueId={setSelectedVenueId}
      />
      <PaginatedList title="Currently Showing" data={currentlyShowingMovies} />
      <PaginatedList title="Upcoming Movies" data={upcomingMovies} />
      <PaginatedList title="Venues" data={venues} />
      <Footer />
    </div>
  );
};

export default Home;
