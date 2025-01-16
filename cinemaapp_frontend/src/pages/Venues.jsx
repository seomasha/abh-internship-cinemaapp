import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import Venue from "../components/Venue";

import { CiLocationOn } from "react-icons/ci";

const Venues = () => {
  return (
    <div>
      <NavBar />
      <h2 className="px-5 pt-5">Venues (6)</h2>

      <div className="d-flex px-5 gap-3">
        <SearchBar />
        <div className="mt-3" style={{ width: "15%" }}>
          <Dropdown icon={CiLocationOn} title="City" options={[""]} />
        </div>
      </div>

      <div className="p-5">
        <div className="d-flex gap-3 mx-1">
          <Venue
            id={1}
            image="https://via.placeholder.com/300"
            title="Cineplexx"
          />
          <Venue
            id={2}
            image="https://via.placeholder.com/300"
            title="Cineplexx"
          />
        </div>
      </div>

      <p className="text-center primary-red my-4 fw-bold text-decoration-underline fs-6 pointer">
        Load more
      </p>

      <Footer />
    </div>
  );
};

export default Venues;
