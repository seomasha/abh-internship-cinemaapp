import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

const CurrentlyShowing = () => {
  return (
    <div>
      <NavBar />

      <div className="p-5">
        <h2 className="fw-bold">Currently showing (9)</h2>

        <SearchBar />
      </div>

      <Footer />
    </div>
  );
};

export default CurrentlyShowing;
