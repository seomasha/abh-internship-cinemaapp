import React, { useState, useEffect } from "react";

import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import VenuesCarousel from "../components/VenuesCarousel";
import PaginatedList from "../components/PaginatedList";
import Footer from "../components/Footer";

import { movieService } from "../services/movieService";
import { venueService } from "../services/venueService";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [venues, setVenues] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(null);

  useEffect(() => {
    const fetchMoviesAndVenues = async () => {
      const movies = await movieService.getAll();
      const venues = await venueService.getAll();

      setMovies(movies);
      setVenues(venues);
    };

    fetchMoviesAndVenues();
  }, []);

  return (
    <div>
      {console.log(venues)}
      <NavBar />
      <Hero data={movies} />
      <VenuesCarousel data={venues} setMovies={setMovies} setSelectedVenueId={setSelectedVenueId}/>
      <PaginatedList title="Currently Showing" data={movies} />
      <PaginatedList title="Upcoming Movies" data={movies} />
      <PaginatedList title="Venues" data={venues} />
      <Footer />
    </div>
  );
};

export default Home;
