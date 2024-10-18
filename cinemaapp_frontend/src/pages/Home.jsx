import React from "react";

import MyNavbar from "../components/MyNavbar";
import Hero from "../components/Hero";
import VenuesCarousel from "../components/VenuesCarousel";
import PaginatedList from "../components/PaginatedList";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <MyNavbar />
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
