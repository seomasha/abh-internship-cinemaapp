import React from "react";

import MyNavbar from "./components/MyNavbar";
import Hero from "./components/Hero";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import VenuesCarousel from "./components/VenuesCarousel";
import Footer from "./components/Footer";
import PaginatedList from "./components/PaginatedList";

function App() {
  return (
    <div style={{fontFamily: "Urbanist"}}>
      <MyNavbar />
      <Hero />
      <VenuesCarousel />
      <PaginatedList />
      <PaginatedList />
      <PaginatedList />
      <Footer />
    </div>
  );
}

export default App;
