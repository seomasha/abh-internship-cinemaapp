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
  const [currentlyShowingMovies, setCurrentlyShowingMovies] = useState(movies);

  useEffect(() => {
    const fetchMoviesAndVenues = async () => {
      const movies = await movieService.getAll();
      const venues = await venueService.getAll();

      setMovies(movies);
      setHeroMovies(movies);
      setVenues(venues);

      setCurrentlyShowingMovies(movies);
    };

    fetchMoviesAndVenues();
  }, []);

  useEffect(() => {
    const fetchCurrentlyShowingMovies = async () => {
      const movies = await projectionService.getProjectionsByVenueId(
        selectedVenueId
      );

      const todaysMovies = movies.filter(
        (movie) =>
          movie.projectionDate.split("T")[0] ===
          new Date().toISOString().split("T")[0]
      );
      setCurrentlyShowingMovies(todaysMovies.map((movie) => movie.movieId));
    };

    if (selectedVenueId !== null) {
      fetchCurrentlyShowingMovies();
    }
  }, [selectedVenueId]);

  return (
    <div>
      {console.log(currentlyShowingMovies)}
      <NavBar />
      <Hero data={heroMovies} />
      <VenuesCarousel
        data={venues}
        setMovies={setMovies}
        setSelectedVenueId={setSelectedVenueId}
      />
      <PaginatedList title="Currently Showing" data={currentlyShowingMovies} />
      <PaginatedList title="Upcoming Movies" data={movies} />
      <PaginatedList title="Venues" data={venues} />
      <Footer />
    </div>
  );
};

export default Home;
