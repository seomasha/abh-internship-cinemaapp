import React, { useEffect, useRef, useState } from "react";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import DayPicker from "../components/DayPicker";
import SmallButton from "../components/SmallButton";
import PaginatedList from "../components/PaginatedList";
import HeroMovieCategory from "../components/HeroMovieCategory";

import { movieService } from "../services/movieService";

import {
  FaRegStar,
  FaRegBuilding,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

import "../styles/MovieDetails.css";

const MovieDetails = () => {
  const dayPickerContainerRef = useRef(null);
  const [movies, setMovies] = useState({ movies: [], totalSize: 0 });

  const scrollLeft = () => {
    dayPickerContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    dayPickerContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const movieList = await movieService.getMovies({ size: 6 });
      setMovies({ movies: movieList.movies, totalSize: movieList.totalSize });
    };

    fetchMovies();
  }, []);

  return (
    <div>
      {console.log(movies)}
      <NavBar />
      <h3 className="px-5 py-4">Movie Details</h3>

      <div className="px-5 pb-3 d-flex align-items-center">
        <div className="video-container me-5">
          <iframe
            width="100%"
            height="560"
            src="https://www.youtube.com/embed/mG4tfdYytEk"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-left-corners"
          ></iframe>
        </div>

        <div className="image-grid">
          <img
            src="http://10.10.11.72:9002/images/it.jpg"
            alt="Image 1"
            className="grid-image"
          />
          <img
            src="http://10.10.11.72:9002/images/it.jpg"
            alt="Image 2"
            className="grid-image rounded-top-right"
          />
          <img
            src="http://10.10.11.72:9002/images/it.jpg"
            alt="Image 3"
            className="grid-image"
          />
          <img
            src="http://10.10.11.72:9002/images/it.jpg"
            alt="Image 4"
            className="grid-image rounded-bottom-right"
          />
        </div>
      </div>

      <div className="px-5 d-flex">
        <div>
          <h3>Avatar: The way of the water</h3>
          <h6 className="fw-light gap-3 py-2">
            PG 13 <span className="primary-red px-2">|</span>
            English <span className="primary-red px-2">|</span>
            117 Min <span className="primary-red px-2">|</span>
            Projection date: 2023/07/04 - 2023/07/10
          </h6>
          <div className="d-flex gap-3 py-2">
            <HeroMovieCategory genre="Fantasy" />
            <HeroMovieCategory genre="Action" />
            <HeroMovieCategory genre="Adventure" />
          </div>
          <p className="w-full fs-6 py-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut
            quisquam officia repudiandae qui rerum eveniet dolorum atque, sequi
            unde consectetur maxime facilis nostrum eos non. Alias similique
            provident dolores modi!
          </p>
          <div className="fw-light py-4">
            <h6>Director: James Cameron</h6>
            <h6 className="mt-4">Writers: James Cameron, Rick Jaffa</h6>
          </div>
          <div className="d-flex align-items-center mb-4">
            <div className="vertical-line"></div>
            <h4>Cast</h4>
          </div>
          <div className="cast-grid">
            <span className="fw-bold fs-6">Sam Worthington</span>
            <span className="fw-bold fs-6">Milos Bikovic</span>
            <span className="fw-bold fs-6">Text 3</span>
            <span className="fw-bold fs-6">Text 4</span>
            <span className="fw-bold fs-6">Text 5</span>
            <span className="fw-bold fs-6">Text 6</span>
          </div>
        </div>
        <div className="border rounded-4 w-50 shadow">
          <div className="d-flex justify-content-between p-4 gap-3">
            <div className="dropdown-full-width">
              <Dropdown
                icon={CiLocationOn}
                title="Choose City"
                options={["cities"]}
                onChange={() => console.log("test")}
              />
            </div>
            <div className="dropdown-full-width">
              <Dropdown
                icon={FaRegBuilding}
                title="Choose Cinema"
                options={["cities"]}
                onChange={() => console.log("test")}
              />
            </div>
          </div>
          <div>
            <div className="d-flex flex-column align-items-center px-4">
              <div className="day-picker-container" ref={dayPickerContainerRef}>
                {Array.from({ length: 10 }, (_, index) => (
                  <DayPicker
                    key={index}
                    date={`Dec ${22 + index}`}
                    day={index === 0 ? "Today" : `Day ${index + 1}`}
                    small={true}
                  />
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-2 gap-3 px-4">
              <SmallButton onClick={scrollLeft} icon={<FaArrowLeft />} />
              <SmallButton onClick={scrollRight} icon={<FaArrowRight />} />
            </div>
            <h5 className="mt-5 px-4">Standard</h5>
            <div className="d-flex px-4 py-2 gap-3">
              <p
                className={`fw-bold rounded border py-2 px-3 fs-6`}
                style={{ cursor: "pointer", margin: 0 }}
              >
                12:00
              </p>
              <p
                className="fw-bold rounded border py-2 px-3 fs-6"
                style={{ cursor: "pointer", margin: 0 }}
              >
                12:00
              </p>
              <p
                className="fw-bold rounded border py-2 px-3 fs-6"
                style={{ cursor: "pointer", margin: 0 }}
              >
                12:00
              </p>
              <p
                className="fw-bold rounded border py-2 px-3 fs-6"
                style={{ cursor: "pointer", margin: 0 }}
              >
                12:00
              </p>
            </div>
            <hr></hr>
            <div className="d-flex px-4 mb-4 gap-3">
              <button className="btn flex-grow-1 button-secondary">
                Reserve Ticket
              </button>
              <button className="btn flex-grow-1 button-primary">
                Buy Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 mt-4">
        <div className="d-flex align-items-center mb-4">
          <div className="vertical-line"></div>
          <h4>Rating</h4>
        </div>
        <div className="d-flex gap-3 mb-4">
          <div className="d-flex align-items-center gap-2 border rounded p-3">
            <FaRegStar size={20} className="primary-red" />
            <div>
              <h6>9.7</h6>
              <p>IMDB Rating</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 border rounded p-3">
            <FaRegStar size={20} className="primary-red" />
            <div>
              <h6>9.7</h6>
              <p>Rotten Tomatoes</p>
            </div>
          </div>
        </div>
      </div>
      <PaginatedList
        title="See Also"
        data={movies.movies}
        totalSize={movies.totalSize}
      />
      <Footer />
    </div>
  );
};

export default MovieDetails;
