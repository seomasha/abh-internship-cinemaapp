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

    const fetchCurrentlyShowingMovies = async () => {
      const currentlyShowing = await movieService.getCurrentlyShowingMovies();
      setCurrentlyShowingMovies(currentlyShowing);
      setHeroMovies(currentlyShowing);
    };

    const fetchUpcomingMovies = async () => {
      const upcoming = await movieService.getUpcomingMovies();
      setUpcomingMovies(upcoming);
    };

    fetchCurrentlyShowingMovies();
    fetchUpcomingMovies();
    fetchVenues();
  }, []);

  useEffect(() => {
    const fetchCurrentlyShowingAndUpcomingMovies = async () => {
      if (selectedVenueId) {
        const projections = await projectionService.getProjectionsByVenueId(
          selectedVenueId
        );

        setCurrentlyShowingMovies(projections.currentlyShowing);
        setUpcomingMovies(projections.upcoming);
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
