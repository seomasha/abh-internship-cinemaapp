import React, { useState, useRef } from "react";
import NavBar from "../components/NavBar";
import { MdOutlineLocalMovies } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import TabButton from "../components/TabButton";
import "../styles/AdminPanel.css";
import { TbMovieOff, TbMovie } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaTrashAlt, FaLanguage } from "react-icons/fa";
import { CiLocationOn, CiClock2, CiCalendar } from "react-icons/ci";
import { Md18UpRating } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { IoIosLink } from "react-icons/io";
import { Button } from "react-bootstrap";
import Input from "../components/Input";
import TextArea from "../components/TextArea.jsx";
import Dropdown from "../components/Dropdown.jsx";
import DatePickerDropdown from "../components/DatePickerDropdown.jsx";
import MovieTable from "../components/MovieTable.jsx";
import Roadmap from "../components/Roadmap.jsx";
import Papa from "papaparse";
import ToastService from "../services/toastService.js";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("drafts");
  const [currentFlow, setCurrentFlow] = useState("default");
  const [movieCreationStep, setMovieCreationStep] = useState(1);
  const [movies, setMovies] = useState([
    {
      id: 1,
      name: "Movie 1",
      imageUrl: "https://via.placeholder.com/150",
      projectionDate: "2024-12-15",
      venue: "Venue 1",
      step: 1,
    },
    {
      id: 2,
      name: "Movie 2",
      imageUrl: "https://via.placeholder.com/150",
      projectionDate: "2024-12-20",
      venue: "Venue 2",
      step: 2,
    },
    {
      id: 3,
      name: "Movie 2",
      imageUrl: "https://via.placeholder.com/150",
      projectionDate: "2024-12-20",
      venue: "Venue 2",
      step: 3,
    },
    {
      id: 3,
      name: "Movie 2",
      imageUrl: "https://via.placeholder.com/150",
      projectionDate: "2024-12-20",
      venue: "Venue 2",
      step: 1,
    },
    {
      id: 3,
      name: "Movie 2",
      imageUrl: "https://via.placeholder.com/150",
      projectionDate: "2024-12-20",
      venue: "Venue 2",
      step: 1,
    },
    {
      id: 3,
      name: "Movie 2",
      imageUrl: "https://via.placeholder.com/150",
      projectionDate: "2024-12-20",
      venue: "Venue 2",
      step: 1,
    },
  ]);
  const [checkedMovies, setCheckedMovies] = useState([]);

  const [writersData, setWritersData] = useState(null);
  const [castData, setCastData] = useState(null);
  const [movieImages, setMovieImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [projections, setProjections] = useState([
    { id: Date.now(), city: "", venue: "", date: "" },
  ]);

  const writersFileInputRef = useRef(null);
  const castFileInputRef = useRef(null);

  const placeholderImage = "https://via.placeholder.com/300";

  const [movieName, setMovieName] = useState("");
  const [pgRating, setPgRating] = useState("");
  const [language, setLanguage] = useState("");
  const [movieDuration, setMovieDuration] = useState("");
  const [director, setDirector] = useState("");
  const [trailerLink, setTrailerLink] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [genre, setGenre] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [movieNameError, setMovieNameError] = useState("");
  const [pgRatingError, setPgRatingError] = useState("");
  const [languageError, setLanguageError] = useState("");
  const [movieDurationError, setMovieDurationError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [directorError, setDirectorError] = useState("");
  const [trailerLinkError, setTrailerLinkError] = useState("");
  const [synopsisError, setSynopsisError] = useState("");
  const [dateError, setDateError] = useState("");

  const handleCSVUpload = (file, type) => {
    Papa.parse(file, {
      complete: (result) => {
        const parsedData = result.data;

        if (type === "writers") {
          const writers = parsedData.map((row) => row.firstName);
          setWritersData(writers);
        }

        if (type === "cast") {
          const cast = parsedData.map((row) => ({
            realName: row.realName,
            role: row.role,
          }));
          setCastData(cast);
        }
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      handleCSVUpload(file, type);
    }
  };

  const handleClearData = (type) => {
    if (type === "writers") {
      setWritersData(null);
      writersFileInputRef.current.value = "";
    }
    if (type === "cast") {
      setCastData(null);
      castFileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length + movieImages.length <= 4) {
      setMovieImages((prevImages) => [...prevImages, ...Array.from(files)]);
    } else {
      ToastService.error("You can only upload up to 4 images.");
    }
  };

  const handleDeleteImage = (indexToDelete) => {
    const updatedImages = movieImages.filter(
      (image, index) => index !== indexToDelete
    );

    let newSelectedImageIndex = selectedImageIndex;
    if (selectedImageIndex === indexToDelete) {
      newSelectedImageIndex = -1;
    } else if (selectedImageIndex > indexToDelete) {
      newSelectedImageIndex--;
    }

    setMovieImages(updatedImages);
    setSelectedImageIndex(newSelectedImageIndex);
  };

  const handleAddProjection = () => {
    setProjections((prevProjections) => [
      ...prevProjections,
      { id: Date.now(), city: "", venue: "", date: "" }, //Date.now() just used for unique IDs for handling deletion and preventing bugs
    ]);
  };

  const handleRemoveProjection = (idToDelete) => {
    const updatedProjections = projections.filter(
      (projection) => projection.id !== idToDelete
    );
    setProjections(updatedProjections);
  };

  const setError = (condition, setter, message) => {
    if (condition) {
      setter(message);
      return true;
    } else {
      setter("");
      return false;
    }
  };

  const validateFields = () => {
    let isValid = true;

    isValid &= !setError(
      !movieName,
      setMovieNameError,
      "You should enter a movie name."
    );
    isValid &= !setError(
      !pgRating,
      setPgRatingError,
      "You should enter a PG rating."
    );
    isValid &= !setError(
      !language,
      setLanguageError,
      "You should enter a language."
    );
    isValid &= !setError(
      !movieDuration,
      setMovieDurationError,
      "You should enter a duration."
    );
    isValid &= !setError(
      !director,
      setDirectorError,
      "You should enter a director."
    );
    isValid &= !setError(
      !trailerLink,
      setTrailerLinkError,
      "You should enter a trailer link."
    );
    isValid &= !setError(
      !synopsis,
      setSynopsisError,
      "You should enter a synopsis."
    );
    isValid &= !setError(
      genre.length === 0,
      setGenreError,
      "You should select a genre."
    );
    isValid &= !setError(
      startDate === null || endDate === null,
      setDateError,
      "You should select both start and end date."
    );

    return isValid;
  };

  const handleContinue = () => {
    if (validateFields() && movieCreationStep === 1) {
      setMovieCreationStep(2);
    }

    if (movieCreationStep === 2) setMovieCreationStep(3);
    if (movieCreationStep === 3) {
      setCurrentFlow("default");
      setMovieCreationStep(1);
    }
  };

  const handleGenreChange = (selectedGenres) => {
    setGenre(selectedGenres);
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleCheckboxChange = (movieId, isChecked) => {
    if (isChecked) {
      setCheckedMovies((prev) => [...prev, movieId]);
    } else {
      setCheckedMovies((prev) => prev.filter((id) => id !== movieId));
    }
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex">
        <div
          className="navbar-background p-4 flex-grow-1 top-border"
          style={{ height: "100vh", zIndex: 1 }}
        >
          <h4 className="text-white bottom-border pb-4">Admin</h4>
          <p className="text-white mt-4">
            <MdOutlineLocalMovies />
            <span className="mx-2 pt-1">Movies</span>
          </p>
          <p className="text-white mt-4">
            <FaBuilding />
            <span className="mx-2 pt-1">Venues</span>
          </p>
        </div>

        <div className="col-10 primary-background p-4">
          {currentFlow === "default" && (
            <>
              <div className="d-flex justify-content-between">
                <h5>Movies</h5>
                {activeTab === "drafts" && movies.length && (
                  <Button
                    className="btn button-primary"
                    variant="danger"
                    onClick={() => {
                      setCurrentFlow("addMovie");
                    }}
                  >
                    Add Movie
                  </Button>
                )}
              </div>

              <div className="mt-3 border-bottom gap-5 d-flex">
                <TabButton
                  label={`Drafts (${movies.length})`}
                  isActive={activeTab === "drafts"}
                  onClick={() => setActiveTab("drafts")}
                />
                <TabButton
                  label="Currently Showing (0)"
                  isActive={activeTab === "currently-showing"}
                  onClick={() => setActiveTab("currently-showing")}
                />
                <TabButton
                  label="Upcoming (0)"
                  isActive={activeTab === "upcoming"}
                  onClick={() => setActiveTab("upcoming")}
                />
                <TabButton
                  label="Archived (0)"
                  isActive={activeTab === "archived"}
                  onClick={() => setActiveTab("archived")}
                />
              </div>

              <div className="mt-4">
                {activeTab === "drafts" && !movies.length && (
                  <div className="text-center">
                    <TbMovieOff size={64} className="mt-5" />
                    <h5 className="fw-bold mt-3">No movies added</h5>
                    <p className="mt-3">
                      You can add movie via Add Movie button
                    </p>
                    <Button
                      variant="danger"
                      className="mt-3 primary-red-background"
                      onClick={() => setCurrentFlow("addMovie")}
                    >
                      Add Movie
                    </Button>
                  </div>
                )}
                {activeTab === "drafts" && movies.length && (
                  <>
                    <div className="d-flex justify-content-end gap-3">
                      {checkedMovies.length > 0 && (
                        <>
                          <Button variant="outline-danger">Archive</Button>
                          <Button variant="outline-success">Publish</Button>
                        </>
                      )}
                    </div>
                    <MovieTable
                      movies={movies}
                      onCheckboxChange={handleCheckboxChange}
                    />
                  </>
                )}
                {activeTab === "currently-showing" && (
                  <>
                    <MovieTable movies={movies} />
                  </>
                )}
                {activeTab === "upcoming" && (
                  <>
                    <MovieTable movies={movies} />
                  </>
                )}
                {activeTab === "archived" && (
                  <>
                    <MovieTable movies={movies} />
                  </>
                )}
              </div>
            </>
          )}

          {currentFlow === "addMovie" && movieCreationStep === 1 && (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <h5>Add New Movie</h5>
                <div className="rounded p-2 primary-border">
                  <IoMdClose
                    size={24}
                    className="primary-red"
                    onClick={() => setCurrentFlow("default")}
                  />
                </div>
              </div>

              <Roadmap step={1} />

              <div>
                <div className="d-flex gap-5">
                  <Input
                    label="Movie Name"
                    placeholder="Type movie name"
                    leadingIcon={<TbMovie size={18} />}
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                    invalid={!!movieNameError}
                    invalidMessage={movieNameError}
                  />
                  <Input
                    label="PG Rating"
                    placeholder="Type PG rating"
                    leadingIcon={<Md18UpRating size={18} />}
                    onChange={(e) => setPgRating(e.target.value)}
                    invalid={!!pgRatingError}
                    invalidMessage={pgRatingError}
                  />
                </div>
                <div className="d-flex gap-5">
                  <Input
                    label="Language"
                    placeholder="Type language"
                    leadingIcon={<FaLanguage size={18} />}
                    onChange={(e) => setLanguage(e.target.value)}
                    invalid={!!languageError}
                    invalidMessage={languageError}
                  />
                  <Input
                    label="Movie Duration"
                    placeholder="Type movie duration"
                    leadingIcon={<CiClock2 size={18} />}
                    onChange={(e) => setMovieDuration(e.target.value)}
                    invalid={!!movieDurationError}
                    invalidMessage={movieDurationError}
                  />
                </div>
                <div className="d-flex gap-5">
                  <DatePickerDropdown
                    title={
                      startDate && endDate
                        ? `${startDate.toDateString().slice(0, 15)} - ${endDate
                            .toDateString()
                            .slice(0, 15)}`
                        : "Date Range"
                    }
                    icon={CiCalendar}
                    fullWidth={true}
                    label="Projection Date"
                    invalid={!!dateError}
                    invalidMessage={dateError}
                    onChange={handleDateChange}
                  />
                  <Dropdown
                    icon={CiLocationOn}
                    title="All Genres"
                    options={["Test", "New genre", "Other genre"]}
                    fullWidth={true}
                    label="Genre"
                    invalid={!!genreError}
                    invalidMessage={genreError}
                    onChange={handleGenreChange}
                  />
                </div>
                <div className="d-flex gap-5 mt-3">
                  <Input
                    label="Director"
                    placeholder="Add Director"
                    leadingIcon={<GoPerson size={18} />}
                    onChange={(e) => setDirector(e.target.value)}
                    invalid={!!directorError}
                    invalidMessage={directorError}
                  />
                  <Input
                    label="Trailer"
                    placeholder="Insert trailer link"
                    leadingIcon={<IoIosLink size={18} />}
                    onChange={(e) => setTrailerLink(e.target.value)}
                    invalid={!!trailerLinkError}
                    invalidMessage="You should enter a trailer link."
                  />
                </div>

                <TextArea
                  label="Your Message"
                  placeholder="Write synopsis"
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  invalid={!!synopsisError}
                  invalidMessage="You should enter a synopsis."
                />
              </div>

              <div className="d-flex align-items-center justify-content-between mt-5">
                <p className="back-button">Back</p>
                <div className="d-flex gap-3">
                  <button className="btn flex-grow-1 button-secondary">
                    Save to Drafts
                  </button>
                  <button
                    className="btn flex-grow-1 button-primary"
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </>
          )}

          {currentFlow === "addMovie" && movieCreationStep === 2 && (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <h5>Add New Movie</h5>
                <div className="rounded p-2 primary-border">
                  <IoMdClose
                    size={24}
                    className="primary-red"
                    onClick={() => setCurrentFlow("default")}
                  />
                </div>
              </div>

              <Roadmap step={2} />

              <div className="d-flex justify-content-evenly mt-5 w-100 p-2 gap-5">
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <h6>Writers</h6>
                    {writersData ? (
                      <FaTrashAlt
                        className="primary-red"
                        onClick={() => handleClearData("writers")}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="border p-5 rounded-3">
                    {!writersData ? (
                      <label
                        htmlFor="upload-writers"
                        className="d-flex align-items-center justify-content-center primary-red text-decoration-underline gap-1 fw-bold pointer"
                      >
                        <FaPlus /> Upload Writers via CSV
                      </label>
                    ) : (
                      <div className="d-flex justify-content-between">
                        {writersData.map((writer, index) => (
                          <p key={index} className="primary-red mx-3">
                            {writer}
                          </p>
                        ))}
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".csv"
                      onChange={(e) => handleFileChange(e, "writers")}
                      style={{ display: "none" }}
                      id="upload-writers"
                      ref={writersFileInputRef}
                    />
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <h6>Cast</h6>
                    {castData ? (
                      <FaTrashAlt
                        className="primary-red"
                        onClick={() => handleClearData("cast")}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="border p-5 rounded-3">
                    {!castData ? (
                      <label
                        htmlFor="upload-cast"
                        className="d-flex align-items-center justify-content-center primary-red text-decoration-underline gap-1 fw-bold pointer"
                      >
                        <FaPlus /> Upload Cast via CSV
                      </label>
                    ) : (
                      <div className="d-flex justify-content-between">
                        {castData.map((cast, index) => (
                          <div key={index}>
                            <p>
                              {cast.realName}
                              <br />
                              <span className="cast-role-text">
                                {cast.role}
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".csv"
                      onChange={(e) => handleFileChange(e, "cast")}
                      style={{ display: "none" }}
                      id="upload-cast"
                      ref={castFileInputRef}
                    />
                  </div>
                </div>
              </div>
              <div className="w-100 p-2">
                <h6>Upload Photos</h6>
                <div className="border p-5 rounded-3">
                  {movieImages.length > 0 ? (
                    <div className="mt-3 d-flex flex-wrap gap-3 justify-content-center">
                      {[
                        ...movieImages,
                        ...Array(4 - movieImages.length).fill(null),
                      ].map((image, index) => (
                        <div key={index}>
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <img
                              src={
                                image
                                  ? URL.createObjectURL(image)
                                  : placeholderImage
                              }
                              alt={`Preview ${index + 1}`}
                              style={{
                                width: "300px",
                                height: "300px",
                                objectFit: "cover",
                                marginBottom: "10px",
                                cursor: "pointer",
                                borderRadius: "24px",
                              }}
                              onClick={() =>
                                document
                                  .getElementById(`image-upload-${index}`)
                                  .click()
                              }
                              className="border"
                            />
                            <div
                              style={{
                                position: "absolute",
                                bottom: 10,
                                left: 0,
                                width: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                color: "white",
                                textAlign: "center",
                                padding: "5px",
                                fontSize: "14px",
                                borderBottomLeftRadius: "24px",
                                borderBottomRightRadius: "24px",
                              }}
                            >
                              Upload Photo
                            </div>
                          </div>

                          <div className="d-flex justify-content-between mt-3">
                            <div className="d-flex align-items-center gap-2">
                              <input
                                type="radio"
                                id={`image-${index}`}
                                name="selected-image"
                                checked={selectedImageIndex === index}
                                onChange={() => setSelectedImageIndex(index)}
                                style={{ accentColor: "#b22222" }}
                              />
                              <label
                                htmlFor={`image-${index}`}
                                className="fw-bold"
                              >
                                Cover Photo
                              </label>
                            </div>
                            <FaTrashAlt
                              className="primary-red pointer"
                              onClick={() => handleDeleteImage(index)}
                            />
                          </div>

                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, index)}
                            style={{ display: "none" }}
                            id={`image-upload-${index}`}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <label
                        htmlFor="upload-image"
                        className="d-flex align-items-center justify-content-center primary-red text-decoration-underline gap-1 fw-bold pointer"
                      >
                        <FaPlus /> Upload Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                        id="upload-image"
                        multiple
                      />
                      <p className="text-center secondary-text">
                        or just drag and drop
                      </p>
                      <p className="text-center secondary-text">
                        * Add 4 photos
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between mt-5 p-2">
                <p
                  className="back-button-available pointer"
                  onClick={() => {
                    setMovieCreationStep(1);
                  }}
                >
                  Back
                </p>
                <div className="d-flex gap-3">
                  <button className="btn flex-grow-1 button-secondary">
                    Save to Drafts
                  </button>
                  <button
                    className="btn flex-grow-1 button-primary"
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </>
          )}

          {currentFlow === "addMovie" && movieCreationStep === 3 && (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <h5>Add New Movie</h5>
                <div className="rounded p-2 primary-border">
                  <IoMdClose
                    size={24}
                    className="primary-red"
                    onClick={() => setCurrentFlow("default")}
                  />
                </div>
              </div>

              <Roadmap step={3} />

              {projections.map((projection, index) => (
                <div
                  key={projection.id}
                  className="d-flex w-100 gap-4 align-items-center"
                >
                  <div className="w-100">
                    <Dropdown
                      icon={CiLocationOn}
                      title="Choose City"
                      options={["Sead", "City 2", "City 3"]}
                      value={projection.city}
                      onChange={(e) => {
                        const updatedProjections = [...projections];
                        updatedProjections[index].city = e.target.value;
                        setProjections(updatedProjections);
                      }}
                    />
                  </div>
                  <div className="w-100">
                    <Dropdown
                      icon={CiLocationOn}
                      title="Choose Venue"
                      options={["Venue 1", "Venue 2", "Venue 3"]}
                      value={projection.venue}
                      onChange={(e) => {
                        const updatedProjections = [...projections];
                        updatedProjections[index].venue = e.target.value;
                        setProjections(updatedProjections);
                      }}
                    />
                  </div>
                  <div className="w-100">
                    <Dropdown
                      icon={CiLocationOn}
                      title="Choose Date"
                      options={["2024-12-15", "2024-12-16", "2024-12-17"]}
                      value={projection.date}
                      onChange={(e) => {
                        const updatedProjections = [...projections];
                        updatedProjections[index].date = e.target.value;
                        setProjections(updatedProjections);
                      }}
                    />
                  </div>
                  <FaTrashAlt
                    size={36}
                    className={`primary-red pointer mt-3 ${
                      projections.length === 1 ? "disabled" : ""
                    }`}
                    onClick={() =>
                      projections.length > 1 &&
                      handleRemoveProjection(projection.id)
                    }
                  />
                </div>
              ))}

              <p
                className="d-flex align-items-center justify-content-center primary-red text-decoration-underline gap-1 fw-bold mt-5 pointer"
                onClick={handleAddProjection}
              >
                <FaPlus /> Add Projection
              </p>

              <div className="d-flex align-items-center justify-content-between mt-5 p-2">
                <p
                  className="back-button-available pointer"
                  onClick={() => setMovieCreationStep(2)}
                >
                  Back
                </p>
                <div className="d-flex gap-3">
                  <button className="btn flex-grow-1 button-secondary">
                    Save to Drafts
                  </button>
                  <button
                    className="btn flex-grow-1 button-primary"
                    onClick={handleContinue}
                  >
                    Add Movie
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
