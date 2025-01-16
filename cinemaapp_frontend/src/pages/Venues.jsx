import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import VenueCard from "../components/VenueCard";

import { CiLocationOn } from "react-icons/ci";
import { venueService } from "../services/venueService";

const Venues = () => {
  const [venues, setVenues] = useState({ venues: [], totalSize: 0 });
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 4;

  useEffect(() => {
    const getVenues = async () => {
      const response = await venueService.getAll(0, pageSize);
      setVenues({ venues: response.venues, totalSize: response.totalSize });
    };

    const getCities = async () => {
      const response = await venueService.getAllCities();
      setCities(response);
    };

    getCities();
    getVenues();
  }, []);

  const loadMoreVenues = async () => {
    const nextPage = page + 1;
    const response = await venueService.getAll(nextPage, pageSize);
    setVenues((prevState) => ({
      ...prevState,
      venues: [...prevState.venues, ...response.venues],
    }));
    setPage(nextPage);
  };

  return (
    <div>
      <NavBar />
      <h2 className="px-5 pt-5">Venues ({venues.totalSize})</h2>

      <div className="d-flex px-5 gap-3">
        <SearchBar />
        <div className="mt-3" style={{ width: "15%" }}>
          <Dropdown icon={CiLocationOn} title="City" options={cities} />
        </div>
      </div>

      <div className="p-5">
        <div
          className="grid-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          {venues.venues.map((venue) => (
            <VenueCard
              key={venue.id}
              id={venue.id}
              image={
                venue.photoImageId?.url || "https://via.placeholder.com/300"
              }
              title={venue.name}
            />
          ))}
        </div>
      </div>

      {venues.totalSize > venues.venues.length && (
        <p
          className="text-center primary-red my-4 fw-bold text-decoration-underline fs-6 pointer"
          onClick={loadMoreVenues}
        >
          Load more
        </p>
      )}

      <Footer />
    </div>
  );
};

export default Venues;
