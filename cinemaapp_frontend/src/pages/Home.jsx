import React, { useState, useEffect } from "react";

import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import VenuesCarousel from "../components/VenuesCarousel";
import PaginatedList from "../components/PaginatedList";
import Footer from "../components/Footer";

import { movieService } from "../services/movieService";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await movieService.getAll();
      console.log(data);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <NavBar />
      <Hero data={movies} />
      <VenuesCarousel />
      <PaginatedList title="Currently Showing" data={movies} />
      <PaginatedList title="Upcoming Movies" data={movies} />
      <PaginatedList title="Venues" data={movies} />
      <Footer />
    </div>
  );
};

export default Home;
