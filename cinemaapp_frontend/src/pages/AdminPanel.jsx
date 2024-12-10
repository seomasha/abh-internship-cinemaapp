import React, { useState, useRef } from "react";
import NavBar from "../components/NavBar";
import { MdOutlineLocalMovies } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import TabButton from "../components/TabButton";
import "../styles/AdminPanel.css";
import { TbMovieOff } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaRegTrashAlt, FaTrashAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { Button } from "react-bootstrap";
import Input from "../components/Input";
import TextArea from "../components/TextArea.jsx";
import Dropdown from "../components/Dropdown.jsx";
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
  const [writersData, setWritersData] = useState(null);
  const [castData, setCastData] = useState(null);
  const [movieImages, setMovieImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const writersFileInputRef = useRef(null);
  const castFileInputRef = useRef(null);

  const placeholderImage = "https://via.placeholder.com/300";

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
                    <MovieTable movies={movies} />
                  </>
                )}
                {activeTab === "currently-showing" && (
                  <p>Here are the Currently Showing Movies</p>
                )}
                {activeTab === "upcoming" && (
                  <p>Here are the Upcoming Movies</p>
                )}
                {activeTab === "archived" && (
                  <p>Here are the Archived Movies</p>
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
                  <Input label="Movie Name" placeholder="Type movie name" />
                  <Input label="PG Rating" placeholder="Type PG rating" />
                </div>
                <div className="d-flex gap-5">
                  <Input label="Language" placeholder="Type language" />
                  <Input
                    label="Movie Duration"
                    placeholder="Type movie duration"
                  />
                </div>
                <div className="d-flex gap-5">
                  <Input
                    label="Projection Date"
                    placeholder="Projection Date"
                  />
                  <Input label="Genre" placeholder="Choose Genre" />
                </div>
                <div className="d-flex gap-5">
                  <Input label="Director" placeholder="Add Director" />
                  <Input label="Trailer" placeholder="Insert trailer link" />
                </div>

                <TextArea
                  label="Your Message"
                  placeholder="Write your message here"
                  value="Sead"
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
                    onClick={() => setMovieCreationStep(2)}
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
                            }}
                            onClick={() =>
                              document
                                .getElementById(`image-upload-${index}`)
                                .click()
                            }
                          />
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
                    onClick={() => setMovieCreationStep(3)}
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

              <div className="d-flex w-100 gap-4 align-items-center">
                <div className="w-100">
                  <Dropdown
                    icon={CiLocationOn}
                    title="Choose City"
                    options={["Sead"]}
                  />
                </div>
                <div className="w-100">
                  <Dropdown
                    icon={CiLocationOn}
                    title="Choose City"
                    options={["Sead"]}
                  />
                </div>
                <div className="w-100">
                  <Dropdown
                    icon={CiLocationOn}
                    title="Choose City"
                    options={["Sead"]}
                  />
                </div>
                <div className="rounded light-background mt-3">
                  <FaRegTrashAlt size={16} className="primary-red" />
                </div>
              </div>

              <p className="d-flex align-items-center justify-content-center primary-red text-decoration-underline gap-1 fw-bold mt-5 pointer">
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
                    onClick={() => {
                      setCurrentFlow("default");
                      setMovieCreationStep(1);
                    }}
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
