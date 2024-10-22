import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";

import { CiLocationOn, CiClock1 } from "react-icons/ci";

const CurrentlyShowing = () => {
  return (
    <div>
      <NavBar />

      <div className="p-5">
        <h2 className="fw-bold">Currently showing (9)</h2>

        <SearchBar />
        <div className="row gx-4">
          <div className="col-12 col-md-3">
            <Dropdown
              icon={CiLocationOn}
              title="All Cities"
              options={["Option 1", "Option 2"]}
            />
          </div>
          <div className="col-12 col-md-3">
            <Dropdown
              icon={CiLocationOn}
              title="All Cinemas"
              options={["Option 1", "Option 2"]}
            />
          </div>
          <div className="col-12 col-md-3">
            <Dropdown
              icon={CiLocationOn}
              title="All Genres"
              options={["Option 1", "Option 2"]}
            />
          </div>
          <div className="col-12 col-md-3">
            <Dropdown
              icon={CiClock1}
              title="All Projection Times"
              options={["Option 1", "Option 2"]}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CurrentlyShowing;
