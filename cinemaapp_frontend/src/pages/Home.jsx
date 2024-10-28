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
      const projections = await projectionService.getAll();

      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 10);

      const currentlyShowingSet = new Set();
      const upcomingSet = new Set();
      const currentlyShowing = [];
      const upcoming = [];

      projections.forEach((projection) => {
        const projectionDate = new Date(projection.projectionDate);
        const movie = projection.movieId;

        if (projectionDate >= today && projectionDate <= endDate) {
          if (!currentlyShowingSet.has(movie.name)) {
            currentlyShowingSet.add(movie.name);
            currentlyShowing.push(movie);
          }
        } else if (projectionDate > endDate) {
          if (!upcomingSet.has(movie.name)) {
            upcomingSet.add(movie.name);
            upcoming.push(movie);
          }
        }
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
      const movies = await projectionService.getProjectionsByVenueId(
        selectedVenueId
      );

      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 10);

      const currentlyShowing = movies.filter((movie) => {
        const projectionDate = new Date(movie.projectionDate);
        return projectionDate >= today && projectionDate <= endDate;
      });

      const upcoming = movies.filter((movie) => {
        const projectionDate = new Date(movie.projectionDate);
        return projectionDate > endDate;
      });

      setCurrentlyShowingMovies(currentlyShowing.map((movie) => movie.movieId));
      setUpcomingMovies(upcoming.map((movie) => movie.movieId));
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
