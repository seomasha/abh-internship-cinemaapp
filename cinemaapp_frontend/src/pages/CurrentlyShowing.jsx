import React, { useState } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import { CiLocationOn, CiClock1 } from "react-icons/ci";
import DayPicker from "../components/DayPicker";

const CurrentlyShowing = () => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(null);

  const dayPickers = [];

  for (let i = 0; i < 10; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    const dateOptions = { month: "short", day: "numeric" };
    const dayOptions = { weekday: "short" };

    const date = nextDate.toLocaleDateString("en-US", dateOptions);
    const day = nextDate.toLocaleDateString("en-US", dayOptions);

    dayPickers.push(
      <DayPicker
        key={i}
        date={date}
        day={day}
        isSelected={selectedDay === i}
        onSelect={() => setSelectedDay(i)}
      />
    );
  }

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

        <div className="d-flex flex-wrap justify-content-between mt-4">
          {dayPickers}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CurrentlyShowing;
