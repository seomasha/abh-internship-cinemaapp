import React from "react";

import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import VenuesCarousel from "../components/VenuesCarousel";
import PaginatedList from "../components/PaginatedList";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <VenuesCarousel />
      <PaginatedList title="Currently Showing" />
      <PaginatedList title="Upcoming Movies" />
      <PaginatedList title="Venues" />
      <Footer />
    </div>
  );
};

export default Home;
