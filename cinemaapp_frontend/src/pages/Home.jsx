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
  const [venues, setVenues] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [currentlyShowingMovies, setCurrentlyShowingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      const venues = await venueService.getAll();
      setVenues(venues);
    };

    const fetchMovies = async () => {
      const currentlyShowing = await movieService.getCurrentlyShowingMovies();
      const upcoming = await movieService.getUpcomingMovies();
      const heroMovies = await movieService.getHeroMovies();

      setCurrentlyShowingMovies(currentlyShowing);
      setUpcomingMovies(upcoming);
      setHeroMovies(heroMovies);
    };

    fetchMovies();
    fetchVenues();
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
