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

      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 10);

      const currentlyShowing = movies.filter((movie) => {
        const projectionStartDate = new Date(movie.projectionStartDate);
        const projectionEndDate = new Date(movie.projectionEndDate);
        return projectionStartDate <= endDate && projectionEndDate >= today;
      });

      const upcoming = movies.filter((movie) => {
        const projectionStartDate = new Date(movie.projectionStartDate);
        return projectionStartDate > endDate;
      });

      setHeroMovies(movies);
      setVenues(venues);
      setCurrentlyShowingMovies(currentlyShowing);
      setUpcomingMovies(upcoming);
    };

    fetchMoviesAndVenues();
  }, []);

  useEffect(() => {
    const fetchCurrentlyShowingAndUpcomingMovies = async () => {
      if (selectedVenueId) {
        const projections = await projectionService.getProjectionsByVenueId(
          selectedVenueId
        );
        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 10);

        const currentlyShowing = projections
          .filter((projection) => {
            const projectionStartDate = new Date(
              projection.movieId.projectionStartDate
            );
            const projectionEndDate = new Date(
              projection.movieId.projectionEndDate
            );
            return projectionStartDate <= endDate && projectionEndDate >= today;
          })
          .map((projection) => projection.movieId);

        const upcoming = projections
          .filter((projection) => {
            const projectionStartDate = new Date(
              projection.movieId.projectionStartDate
            );
            return projectionStartDate > endDate;
          })
          .map((projection) => projection.movieId);

        setCurrentlyShowingMovies(currentlyShowing);
        setUpcomingMovies(upcoming);
      }
    };

    fetchCurrentlyShowingAndUpcomingMovies();
  }, [selectedVenueId]);

  return (
    <div>
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
