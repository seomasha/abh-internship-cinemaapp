import React, { useState, useRef, useEffect } from "react";
import NavBar from "../components/NavBar";
import { MdOutlineLocalMovies } from "react-icons/md";
import { FaBuilding, FaPhoneAlt, FaRegBuilding } from "react-icons/fa";
import TabButton from "../components/TabButton";
import "../styles/AdminPanel.css";
import { TbMovieOff, TbMovie } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaTrashAlt, FaLanguage } from "react-icons/fa";
import { CiLocationOn, CiClock2, CiCalendar } from "react-icons/ci";
import { Md18UpRating } from "react-icons/md";
import { GoHash, GoPerson } from "react-icons/go";
import { IoIosLink } from "react-icons/io";
import { Button, Spinner } from "react-bootstrap";
import Input from "../components/Input";
import TextArea from "../components/TextArea.jsx";
import Dropdown from "../components/Dropdown.jsx";
import DatePickerDropdown from "../components/DatePickerDropdown.jsx";
import MovieTable from "../components/MovieTable.jsx";
import Roadmap from "../components/Roadmap.jsx";
import Card from "../components/Card.jsx";
import Papa from "papaparse";
import ToastService from "../services/toastService.js";
import { movieService } from "../services/movieService.js";
import { photoService } from "../services/photoService.js";
import { venueService } from "../services/venueService.js";
import { projectionService } from "../services/projectionService.js";
import { genreService } from "../services/genreService.js";
import { TimePicker } from "rsuite";
import { FiPhone } from "react-icons/fi";

const AdminPanel = () => {
  const [selectedOption, setSelectedOption] = useState("movie");
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [activeTab, setActiveTab] = useState("drafts");
  const [currentFlow, setCurrentFlow] = useState("default");
  const [movieCreationStep, setMovieCreationStep] = useState(1);
  const [movies, setMovies] = useState([]);
  const [currentlyShowingMovies, setCurrentlyShowingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [archivedMovies, setArchivedMovies] = useState([]);
  const [checkedMovies, setCheckedMovies] = useState([]);
  const [writersData, setWritersData] = useState(null);
  const [castData, setCastData] = useState(null);
  const [movieImages, setMovieImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [projections, setProjections] = useState([
    { id: 0, city: "", venue: "", time: "", venues: [] },
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
  const [genre, setGenre] = useState([{ id: null, name: "" }]);
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
  const [writersError, setWritersError] = useState("");
  const [castError, setCastError] = useState("");
  const [imageError, setImageError] = useState("");
  const [selectedCoverPhotoError, setSelectedCoverPhotoError] = useState("");
  const [cityError, setCityError] = useState({});
  const [venueError, setVenueError] = useState({});
  const [projectionTimeError, setProjectionTimeError] = useState({});
  const [duplicateError, setDuplicateError] = useState({});

  const [movieId, setMovieId] = useState(0);
  const [cities, setCities] = useState([]);
  const [genres, setGenres] = useState([]);

  // Venues

  const [venues, setVenues] = useState({ venues: [], totalSize: 0 });
  const [selectedVenue, setSelectedVenue] = useState(0);

  const [venueName, setVenueName] = useState("");
  const [venueImage, setVenueImage] = useState(null);
  const [venueImageFile, setVenueImageFile] = useState(null);
  const [venuePhone, setVenuePhone] = useState("");
  const [venueStreet, setVenueStreet] = useState("");
  const [venueStreetNumber, setVenueStreetNumber] = useState("");
  const [venueCity, setVenueCity] = useState("");

  const [venueImageError, setVenueImageError] = useState("");
  const [venueNameError, setVenueNameError] = useState("");
  const [venuePhoneError, setVenuePhoneError] = useState("");
  const [venueStreetError, setVenueStreetError] = useState("");
  const [venueStreetNumberError, setVenueStreetNumberError] = useState("");
  const [venueCityError, setVenueCityError] = useState("");

  const [venueLoading, setVenueLoading] = useState(false);
  const [venuePage, setVenuePage] = useState(0);
  const venuePageSize = 6;

  useEffect(() => {
    const getDraftMovies = async () => {
      const response = await movieService.getDraftMovies();
      setMovies(response);
    };

    const getArchivedMovies = async () => {
      const response = await movieService.getArchivedMovies();
      setArchivedMovies(response);
    };

    const getCurrentlyShowingMovies = async () => {
      const response = await movieService.getMovies({ size: 50 });
      setCurrentlyShowingMovies(response);
    };

    const getUpcomingMovies = async () => {
      const response = await movieService.getMovies({
        type: "upcoming",
        size: 50,
      });
      setUpcomingMovies(response);
    };

    const getCities = async () => {
      const response = await venueService.getAllCities();
      setCities(response);
    };

    const getGenres = async () => {
      const response = await genreService.getAll();
      setGenres(response);
    };

    getDraftMovies();
    getCities();
    getGenres();
    getArchivedMovies();
    getCurrentlyShowingMovies();
    getUpcomingMovies();
  }, []);

  useEffect(() => {
    const getAllVenues = async () => {
      const response = await venueService.getAll(venuePage, venuePageSize);
      setVenues((prev) => {
        if (venuePage === 0) {
          return { venues: response.venues, totalSize: response.totalSize };
        } else {
          return {
            venues: [...prev.venues, ...response.venues],
            totalSize: response.totalSize,
          };
        }
      });
    };

    getAllVenues();
  }, [venuePage, venuePageSize]);

  useEffect(() => {
    const getSelectedMovie = async () => {
      const response = await movieService.get(movieId);
      setSelectedMovie(response);
    };

    if (movieId !== 0) {
      getSelectedMovie();
    }
  }, [movieId]);

  useEffect(() => {
    const getSelectedVenue = async () => {
      const response = await venueService.get(selectedVenue.id);
      setSelectedVenue(response);
    };

    if (selectedVenue !== 0) getSelectedVenue();
  }, []);

  useEffect(() => {
    setMovieName(selectedMovie.name);
    setPgRating(selectedMovie.pgRating);
    setLanguage(selectedMovie.language);
    setMovieDuration(selectedMovie.movieDuration);
    setStartDate(selectedMovie.projectionStartDate);
    setEndDate(selectedMovie.projectionEndDate);
    setGenre(selectedMovie.genres);
    setDirector(selectedMovie.director);
    setTrailerLink(selectedMovie.trailerLink);
    setSynopsis(selectedMovie.synopsis);

    if (selectedMovie.actors && selectedMovie.writers && selectedMovie.photos) {
      setWritersData(selectedMovie.writers.split(","));
      setCastData(
        selectedMovie.actors.split(",").map((actor) => ({
          realName: actor.trim(),
          role: "",
        }))
      );
      setMovieImages(
        selectedMovie.photos.map((photo) => ({ url: photo.url, id: photo.id }))
      );
    }
  }, [selectedMovie]);

  const getVenuesByCity = async (cityName) => {
    const response = await venueService.getVenuesByCity(cityName);
    return response;
  };

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

  const handleVenueImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVenueImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVenueImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = async (e, index = null) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    if (index !== null) {
      setMovieImages((prevImages) => {
        const updatedImages = [...prevImages];
        const oldImage = updatedImages[index];

        updatedImages[index] = { file: files[0] };
        return updatedImages;
      });

      const oldImage = movieImages[index];
      if (oldImage?.id) {
        await photoService.deleteByID(oldImage.id);
      }
    } else {
      setMovieImages((prevImages) => {
        if (files.length + prevImages.length <= 4) {
          return [...prevImages, ...files.map((file) => ({ file }))];
        } else {
          ToastService.error("You can only upload up to 4 images.");
          return prevImages;
        }
      });
    }
  };

  const handleDeleteImage = async (indexToDelete) => {
    const imageToDelete = movieImages[indexToDelete];

    if (imageToDelete.id) {
      const response = await photoService.deleteByID(imageToDelete.id);
    }

    const updatedImages = movieImages.filter(
      (_, index) => index !== indexToDelete
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
    const newProjection = {
      id: Date.now(), //Date.now() just used for unique IDs for handling deletion and preventing bugs
      city: "",
      venue: "",
      time: "",
      venues: [],
    };

    setProjections((prevProjections) => [...prevProjections, newProjection]);
  };

  const handleRemoveProjection = async (idToDelete) => {
    const updatedProjections = projections.filter(
      (projection) => projection.id !== idToDelete
    );

    await projectionService.deleteProjection(idToDelete);

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

  const validateMovieCreationStepOne = () => {
    let isValid = true;

    const validationRules = [
      {
        condition: !movieName,
        setError: setMovieNameError,
        errorMessage: "You should enter a movie name.",
      },
      {
        condition: !pgRating,
        setError: setPgRatingError,
        errorMessage: "You should enter a PG rating.",
      },
      {
        condition: !language,
        setError: setLanguageError,
        errorMessage: "You should enter a language.",
      },
      {
        condition: !movieDuration,
        setError: setMovieDurationError,
        errorMessage: "You should enter a duration.",
      },
      {
        condition: !director,
        setError: setDirectorError,
        errorMessage: "You should enter a director.",
      },
      {
        condition: !trailerLink,
        setError: setTrailerLinkError,
        errorMessage: "You should enter a trailer link.",
      },
      {
        condition: !synopsis,
        setError: setSynopsisError,
        errorMessage: "You should enter a synopsis.",
      },
      {
        condition: !genre,
        setError: setGenreError,
        errorMessage: "You should select a genre.",
      },
      {
        condition: startDate === null || endDate === null,
        setError: setDateError,
        errorMessage: "You should select both start and end date.",
      },
    ];

    validationRules.forEach(({ condition, setError, errorMessage }) => {
      if (condition) {
        setError(errorMessage);
        isValid = false;
      } else {
        setError("");
      }
    });

    return isValid;
  };

  const validateMovieCreationStepTwo = () => {
    let isValid = true;

    const validationRules = [
      {
        condition: !writersData,
        setError: setWritersError,
        errorMessage: "You should add writers.",
      },
      {
        condition: !castData,
        setError: setCastError,
        errorMessage: "You should add cast.",
      },
      {
        condition: movieImages.length === 0,
        setError: setImageError,
        errorMessage: "You should add images.",
      },
      {
        condition: selectedImageIndex === -1,
        setError: setSelectedCoverPhotoError,
        errorMessage: "You should select an image as a cover photo.",
      },
    ];

    validationRules.forEach(({ condition, setError, errorMessage }) => {
      if (condition) {
        setError(errorMessage);
        isValid = false;
      } else {
        setError("");
      }
    });

    return isValid;
  };

  const validateMovieCreationStepThree = () => {
    let isValid = true;

    const newCityErrors = {};
    const newVenueErrors = {};
    const newDateErrors = {};
    const duplicateErrors = {};

    const seenProjections = new Set();

    projections.forEach((projection, index) => {
      const { city, venue, time } = projection;

      if (!city) {
        newCityErrors[index] = "You should select a city.";
        isValid = false;
      }

      if (!venue) {
        newVenueErrors[index] = "You should select a venue.";
        isValid = false;
      }

      if (!time) {
        newDateErrors[index] = "You should select a time.";
        isValid = false;
      }

      const key = `${city}-${venue}-${time}`;
      if (seenProjections.has(key)) {
        duplicateErrors[index] =
          "Duplicate projection detected: City, venue, and time must be unique.";
        isValid = false;
      } else {
        seenProjections.add(key);
      }
    });

    setCityError(newCityErrors);
    setVenueError(newVenueErrors);
    setProjectionTimeError(newDateErrors);
    setDuplicateError(duplicateErrors);

    return isValid;
  };

  const validateVenueCreation = () => {
    let isValid = true;

    const validationRules = [
      {
        condition: !venueName,
        setError: setVenueNameError,
        errorMessage: "You should add a name.",
      },
      {
        condition: !venueImage,
        setError: setVenueImageError,
        errorMessage: "You should add an image.",
      },
      {
        condition: !venuePhone,
        setError: setVenuePhoneError,
        errorMessage: "You should add a phone number.",
      },
      {
        condition: !venueStreet,
        setError: setVenueStreetError,
        errorMessage: "You should add a street.",
      },
      {
        condition: !venueStreetNumber,
        setError: setVenueStreetNumberError,
        errorMessage: "You should add a street number.",
      },
      {
        condition: !venueCity,
        setError: setVenueCityError,
        errorMessage: "You should add a city.",
      },
    ];

    validationRules.forEach(({ condition, setError, errorMessage }) => {
      if (condition) {
        setError(errorMessage);
        isValid = false;
      } else {
        setError("");
      }
    });

    return isValid;
  };

  const resetFields = () => {
    setMovieName("");
    setPgRating("");
    setLanguage("");
    setMovieDuration("");
    setDirector("");
    setTrailerLink("");
    setSynopsis("");
    setGenre([]);
    setStartDate(null);
    setEndDate(null);

    setMovieNameError("");
    setPgRatingError("");
    setLanguageError("");
    setMovieDurationError("");
    setGenreError("");
    setDirectorError("");
    setTrailerLinkError("");
    setSynopsisError("");
    setDateError("");
    setWritersError("");
    setCastError("");
    setImageError("");
    setSelectedCoverPhotoError("");
    setCityError({});
    setVenueError({});
    setProjectionTimeError({});

    setWritersData(null);
    setCastData(null);
    setMovieImages([]);
    setSelectedImageIndex(-1);
    setProjections([{ id: 0, city: "", venue: "", time: "", venues: [] }]);
    setMovieId(0);
  };

  const handleContinue = async () => {
    if (validateMovieCreationStepOne() && movieCreationStep === 1) {
      setMovieCreationStep(2);
    }

    if (validateMovieCreationStepTwo() && movieCreationStep === 2) {
      setMovieCreationStep(3);

      const response = await projectionService.getProjectionsByMovieId(movieId);

      const mappedProjections = response.map((data) => ({
        id: data.id,
        city: data.venueId.city,
        venue: data.venueId.name,
        time: data.projectionTime,
        venues: [{ name: data.venueId.name, city: data.venueId.city }],
      }));

      setProjections(mappedProjections);
    }
    if (validateMovieCreationStepThree() && movieCreationStep === 3) {
      const currentDate = new Date();
      const projectionStartDateTime = new Date(startDate);

      const status =
        projectionStartDateTime <= currentDate
          ? "published"
          : "published_upcoming";

      const id = await movieService.create({
        ...(movieId && { id: movieId }),
        name: movieName,
        pgRating,
        language,
        movieDuration,
        projectionEndDate: endDate,
        projectionStartDate: startDate,
        director,
        trailerLink,
        synopsis,
        status,
        genres: genre,
        actors: castData.map((cast) => cast.realName).join(","),
        writers: writersData.join(","),
      });

      const projectionsToSend = projections.map((projection) => ({
        venue: Array.isArray(projection.venue)
          ? projection.venue[0]
          : projection.venue,
        projectionTime: new Date(projection.time).toLocaleTimeString("en-GB"),
        movieId: id,
      }));

      const formData = new FormData();

      movieImages.forEach((image) => {
        if (image.file) {
          formData.append("files", image.file);
        }
      });

      if (formData.has("files")) {
        formData.append("entityId", movieId);
        formData.append("entityType", "movie");
        formData.append(
          "role",
          selectedImageIndex !== null ? "poster" : "showcase"
        );

        await photoService.create(formData, "multipart/form-data");
      }

      const response = await projectionService.create(projectionsToSend);

      if (id && response) {
        setCurrentFlow("default");
        setMovieCreationStep(1);
        resetFields();
        window.location.reload();
      }
    }
  };

  const handleDraft = async () => {
    const update = await movieService.create({
      ...(movieId && { id: movieId }),
      name: movieName,
      pgRating,
      language,
      movieDuration,
      projectionEndDate: endDate,
      projectionStartDate: startDate,
      director,
      trailerLink,
      synopsis,
      status: "draft" + movieCreationStep,
      genres: genre,
      ...(castData &&
        writersData && {
          actors: castData.map((cast) => cast.realName).join(","),
          writers: writersData.join(","),
        }),
    });

    const projectionsToSend = projections.map((projection) => {
      return {
        venue: Array.isArray(projection.venue)
          ? projection.venue[0]
          : projection.venue,
        projectionTime: projection.time.toString().includes("T")
          ? new Date(projection.time).toLocaleTimeString("en-GB")
          : projection.time,
        movieId: movieId,
      };
    });

    if (movieCreationStep === 2 || movieCreationStep === 3) {
      const formData = new FormData();

      movieImages.forEach((image) => {
        if (image.file) {
          formData.append("files", image.file);
        }
      });

      if (formData.has("files")) {
        formData.append("entityId", movieId);
        formData.append("entityType", "movie");
        formData.append(
          "role",
          selectedImageIndex !== null ? "poster" : "showcase"
        );

        await photoService.create(formData, "multipart/form-data");
      }
    }

    if (movieCreationStep === 3) {
      await projectionService.create(projectionsToSend);
    }

    setCurrentFlow("default");
    setMovieCreationStep(1);
    resetFields();
    window.location.reload();
  };

  const handleAddVenue = async () => {
    if (!validateVenueCreation()) return;

    setVenueLoading(true);

    const venue = await venueService.create({
      name: venueName,
      phoneNo: venuePhone,
      street: venueStreet,
      streetNo: venueStreetNumber,
      city: venueCity,
    });

    const formData = new FormData();
    formData.append("files", venueImageFile);
    formData.append("entityId", venue.id);
    formData.append("entityType", "venue");
    formData.append("role", "poster");

    const photoImageId = await photoService.create(
      formData,
      "multipart/form-data"
    );

    if (photoImageId && venue.id)
      await venueService.updateVenueImage(venue.id, photoImageId);

    window.location.reload();
  };

  const handleGenreChange = (selectedGenres) => {
    const genresData = selectedGenres
      .map((genreName) => {
        const genreObj = genres.find((genre) => genre.name === genreName);

        if (genreObj) {
          return { id: genreObj.id, name: genreObj.name };
        } else {
          ToastService.warning("Genre not found:", genreName);
          return null;
        }
      })
      .filter(Boolean);

    setGenre(genresData);
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleCheckboxChange = (movieId, isChecked) => {
    setCheckedMovies((prev) =>
      isChecked ? [...prev, movieId] : prev.filter((id) => id !== movieId)
    );
  };

  const handleProjectionChange = async (index, field, value) => {
    if (field === "city") {
      const fetchedVenues = await getVenuesByCity(value);
      setProjections((prevProjections) => {
        const updatedProjections = [...prevProjections];
        updatedProjections[index] = {
          ...updatedProjections[index],
          city: value,
          venue: "",
          venues: fetchedVenues,
        };
        return updatedProjections;
      });
    } else {
      setProjections((prevProjections) => {
        const updatedProjections = prevProjections.map((projection, i) =>
          i === index ? { ...projection, [field]: value } : projection
        );
        return updatedProjections;
      });
    }
  };

  const archiveMovies = async () => {
    await movieService.updateMovies(checkedMovies, "archived");
  };

  const publishMovies = async () => {
    await movieService.updateMovies(checkedMovies, "published");
  };

  const hasMorePages = venues.totalSize > (venuePage + 1) * venuePageSize;

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
            <span
              className={`mx-2 pt-1 pointer ${
                selectedOption === "movie" &&
                "fw-bold text-decoration-underline"
              }`}
              onClick={() => {
                setSelectedOption("movie");
                setCurrentFlow("default");
              }}
            >
              Movies
            </span>
          </p>
          <p className="text-white mt-4">
            <FaBuilding />
            <span
              className={`mx-2 pt-1 pointer ${
                selectedOption === "venue" &&
                "fw-bold text-decoration-underline"
              }`}
              onClick={() => {
                setSelectedOption("venue");
                setCurrentFlow("default_venue");
              }}
            >
              Venues
            </span>
          </p>
        </div>
        {selectedOption === "movie" && (
          <div className="col-10 primary-background p-4">
            {currentFlow === "default" && (
              <>
                <div className="d-flex justify-content-between">
                  <h5>Movies</h5>
                  {activeTab === "drafts" && movies.length > 0 && (
                    <Button
                      className="btn button-primary"
                      variant="danger"
                      onClick={() => {
                        setMovieId(0);
                        setSelectedMovie([]);
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
                    onClick={() => {
                      setActiveTab("drafts");
                      setCheckedMovies([]);
                    }}
                  />
                  <TabButton
                    label={`Currently Showing (${currentlyShowingMovies.totalSize})`}
                    isActive={activeTab === "currently-showing"}
                    onClick={() => {
                      setActiveTab("currently-showing");
                      setCheckedMovies([]);
                    }}
                  />
                  <TabButton
                    label={`Upcoming (${upcomingMovies.totalSize})`}
                    isActive={activeTab === "upcoming"}
                    onClick={() => {
                      setActiveTab("upcoming");
                      setCheckedMovies([]);
                    }}
                  />
                  <TabButton
                    label={`Archived (${archivedMovies.length})`}
                    isActive={activeTab === "archived"}
                    onClick={() => {
                      setActiveTab("archived");
                      setCheckedMovies([]);
                    }}
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
                            <Button
                              variant="outline-danger"
                              onClick={archiveMovies}
                            >
                              Archive
                            </Button>
                            <Button
                              variant="outline-success"
                              onClick={publishMovies}
                            >
                              Publish
                            </Button>
                          </>
                        )}
                      </div>
                      <MovieTable
                        movies={movies}
                        onCheckboxChange={handleCheckboxChange}
                        movieId={movieId}
                        setMovieId={setMovieId}
                        showAction={true}
                        setMovieCreationStep={setMovieCreationStep}
                        setCurrentFlow={setCurrentFlow}
                      />
                    </>
                  )}
                  {activeTab === "currently-showing" && (
                    <>
                      <MovieTable movies={currentlyShowingMovies.movies} />
                    </>
                  )}
                  {activeTab === "upcoming" && (
                    <>
                      <MovieTable
                        movies={upcomingMovies.movies}
                        movieId={movieId}
                        setMovieId={setMovieId}
                        onCheckboxChange={handleCheckboxChange}
                        showAction={true}
                      />
                    </>
                  )}
                  {activeTab === "archived" && (
                    <>
                      <MovieTable
                        movies={archivedMovies}
                        onCheckboxChange={handleCheckboxChange}
                        movieId={movieId}
                        setMovieId={setMovieId}
                        showAction={true}
                      />
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
                      onClick={() => {
                        setCurrentFlow("default");
                        setMovieCreationStep(1);
                        setMovieId(0);
                      }}
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
                      dark={true}
                    />
                    <Input
                      label="PG Rating"
                      placeholder="Type PG rating"
                      leadingIcon={<Md18UpRating size={18} />}
                      onChange={(e) => setPgRating(e.target.value)}
                      invalid={!!pgRatingError}
                      invalidMessage={pgRatingError}
                      value={pgRating}
                      dark={true}
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
                      value={language}
                      dark={true}
                    />
                    <Input
                      label="Movie Duration"
                      placeholder="Type movie duration"
                      leadingIcon={<CiClock2 size={18} />}
                      onChange={(e) => setMovieDuration(e.target.value)}
                      invalid={!!movieDurationError}
                      invalidMessage={movieDurationError}
                      value={movieDuration}
                      dark={true}
                    />
                  </div>
                  <div className="d-flex gap-5">
                    <DatePickerDropdown
                      title={
                        startDate && endDate
                          ? `${
                              typeof startDate === "string"
                                ? startDate
                                : startDate.toDateString().slice(0, 15)
                            } - ${
                              typeof endDate === "string"
                                ? endDate
                                : endDate.toDateString().slice(0, 15)
                            }`
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
                      title={
                        genre
                          ? genre.map((g) => g.name).join(", ")
                          : "Choose genre"
                      }
                      options={genres.map((genre) => genre.name)}
                      fullWidth={true}
                      label="Genre"
                      invalid={!!genreError}
                      invalidMessage={genreError}
                      onChange={(selectedGenres) =>
                        handleGenreChange(selectedGenres)
                      }
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
                      value={director}
                      dark={true}
                    />
                    <Input
                      label="Trailer"
                      placeholder="Insert trailer link"
                      leadingIcon={<IoIosLink size={18} />}
                      onChange={(e) => setTrailerLink(e.target.value)}
                      invalid={!!trailerLinkError}
                      invalidMessage="You should enter a trailer link."
                      value={trailerLink}
                      dark={true}
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
                    <button
                      className="btn flex-grow-1 button-secondary"
                      onClick={handleDraft}
                    >
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
                            <p key={index} className="mt-1 mx-3">
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
                              <p className="mx-2">
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
                {writersError && (
                  <p className="text-danger text-center mt-2">{writersError}</p>
                )}
                {castError && (
                  <p className="text-danger text-center">{castError}</p>
                )}
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
                                  image?.url
                                    ? image.url
                                    : image?.file
                                    ? URL.createObjectURL(image.file)
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
                  {imageError && (
                    <p className="text-danger text-center mt-2">{imageError}</p>
                  )}
                  {selectedCoverPhotoError && (
                    <p className="text-danger text-center">
                      {selectedCoverPhotoError}
                    </p>
                  )}
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
                    <button
                      className="btn flex-grow-1 button-secondary"
                      onClick={handleDraft}
                    >
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
                  <>
                    <div
                      key={projection.id}
                      className="d-flex w-100 gap-4 align-items-center"
                    >
                      <div className="w-100">
                        <Dropdown
                          icon={CiLocationOn}
                          title={
                            projection?.city ? projection.city : "Choose City"
                          }
                          options={cities}
                          value={projection?.city || ""}
                          onChange={(city) =>
                            handleProjectionChange(index, "city", city)
                          }
                          invalid={!!cityError[index]}
                          invalidMessage={cityError[index]}
                        />
                      </div>
                      <div className="w-100">
                        <Dropdown
                          icon={CiLocationOn}
                          title={
                            projection?.venue
                              ? projection.venue
                              : "Choose Venue"
                          }
                          options={projection.venues.map((venue) => venue.name)}
                          value={projection?.venue || ""}
                          onChange={(venue) =>
                            handleProjectionChange(index, "venue", venue)
                          }
                          invalid={!!venueError[index]}
                          invalidMessage={venueError[index]}
                        />
                      </div>
                      <div className="w-100">
                        <TimePicker
                          value={projection?.time || ""}
                          onChange={(time) =>
                            handleProjectionChange(index, "time", time)
                          }
                          placeholder={
                            projection?.time
                              ? projection.time.toString().slice(0, 5)
                              : "Choose Time"
                          }
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
                    <div>
                      {!!duplicateError && (
                        <p className="text-danger text-center mt-2">
                          {duplicateError[index]}
                        </p>
                      )}
                    </div>
                  </>
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
                    <button
                      className="btn flex-grow-1 button-secondary"
                      onClick={handleDraft}
                    >
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
        )}
        {selectedOption === "venue" && (
          <div className="col-10 primary-background p-4">
            {currentFlow === "default_venue" && (
              <>
                <div className="d-flex justify-content-between border-bottom pb-4">
                  <h5>Venues ({venues.totalSize})</h5>

                  <Button
                    className="btn button-primary"
                    variant="danger"
                    onClick={() => {
                      setVenueLoading(false);
                      setCurrentFlow("addVenue");
                    }}
                  >
                    Add Venue
                  </Button>
                </div>
                <div className="mt-4 grid-container">
                  {venues.venues.map((venue) => (
                    <Card
                      key={venue.id}
                      title={venue.name}
                      subtitle={`${venue.street} ${venue.streetNo}, ${venue.city}`}
                      imageUrl={venue.photoImageId.url}
                      onClick={() => {
                        setSelectedVenue(venue);
                        setCurrentFlow("seeVenue");
                      }}
                    />
                  ))}
                </div>
                {hasMorePages && (
                  <p
                    className="text-center primary-red my-4 fw-bold text-decoration-underline fs-6"
                    onClick={() => setVenuePage((prev) => prev + 1)}
                  >
                    Load more
                  </p>
                )}
              </>
            )}
            {currentFlow === "addVenue" && (
              <>
                {venueLoading ? (
                  <div className="d-flex justify-content-center align-items-middle">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    <div className="d-flex border-bottom pb-4">
                      <h5>New Venue</h5>
                    </div>
                    <div className="text-center mt-4 pb-4 border-bottom">
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <label
                          htmlFor="image-upload"
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={venueImage || placeholderImage}
                            alt="Uploaded Preview"
                            style={{
                              width: "300px",
                              height: "300px",
                              objectFit: "cover",
                              marginBottom: "10px",
                              cursor: "pointer",
                              borderRadius: "24px",
                            }}
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
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleVenueImage}
                        />
                      </div>
                      {!!venueImageError && (
                        <p className="text-center text-danger">
                          You should upload an image.
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <div className="d-flex gap-4">
                        <Input
                          label="Venue Name"
                          value={venueName}
                          placeholder="Venue"
                          leadingIcon={<FaRegBuilding size={18} />}
                          dark={true}
                          invalid={!!venueNameError}
                          invalidMessage={venueNameError}
                          onChange={(e) => setVenueName(e.target.value)}
                        />
                        <Input
                          label="Phone"
                          value={venuePhone}
                          placeholder="Phone"
                          leadingIcon={<FiPhone size={18} />}
                          dark={true}
                          invalid={!!venuePhoneError}
                          invalidMessage={venuePhoneError}
                          onChange={(e) => setVenuePhone(e.target.value)}
                        />
                      </div>
                      <div className="d-flex gap-4">
                        <Input
                          label="Street"
                          value={venueStreet}
                          placeholder="Street"
                          leadingIcon={<CiLocationOn size={18} />}
                          dark={true}
                          invalid={!!venueStreetError}
                          invalidMessage={venueStreetError}
                          onChange={(e) => setVenueStreet(e.target.value)}
                        />
                        <Input
                          label="Street Number"
                          value={venueStreetNumber}
                          placeholder="Street Number"
                          leadingIcon={<GoHash size={18} />}
                          dark={true}
                          invalid={!!venueStreetNumberError}
                          invalidMessage={venueStreetNumberError}
                          onChange={(e) => setVenueStreetNumber(e.target.value)}
                        />
                      </div>
                      <Input
                        label="City"
                        value={venueCity}
                        placeholder="City"
                        leadingIcon={<CiLocationOn size={18} />}
                        dark={true}
                        invalid={!!venueCityError}
                        invalidMessage={venueCityError}
                        onChange={(e) => setVenueCity(e.target.value)}
                      />
                      <div className="d-flex justify-content-end gap-3">
                        <button
                          className="btn button-secondary"
                          onClick={() => setCurrentFlow("default_venue")}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn button-primary"
                          onClick={() => handleAddVenue()}
                        >
                          Add Venue
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            {currentFlow === "seeVenue" && (
              <>
                <div className="d-flex justify-content-between border-bottom pb-4">
                  <h5>{selectedVenue.name}</h5>

                  {currentFlow === "seeVenue" && (
                    <Button
                      className="btn button-primary"
                      variant="danger"
                      onClick={() => setCurrentFlow("editVenue")}
                    >
                      Edit Venue
                    </Button>
                  )}
                </div>
                <div className="text-center mt-4 pb-4 border-bottom">
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <img
                      src={selectedVenue.photoImageId.url}
                      style={{
                        width: "300px",
                        height: "300px",
                        objectFit: "cover",
                        marginBottom: "10px",
                        cursor: "pointer",
                        borderRadius: "24px",
                      }}
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
                </div>
                <div className="mt-4">
                  <div className="d-flex gap-4">
                    <Input
                      label="Venue Name"
                      placeholder="Venue"
                      leadingIcon={<FaRegBuilding size={18} />}
                      dark={true}
                      value={selectedVenue.name}
                    />
                    <Input
                      label="Phone"
                      placeholder="Phone"
                      leadingIcon={<FiPhone size={18} />}
                      dark={true}
                      value={selectedVenue.phoneNo}
                    />
                  </div>
                  <div className="d-flex gap-4">
                    <Input
                      label="Street"
                      placeholder="Street"
                      leadingIcon={<CiLocationOn size={18} />}
                      dark={true}
                      value={selectedVenue.street}
                    />
                    <Input
                      label="Street Number"
                      placeholder="Street Number"
                      leadingIcon={<GoHash size={18} />}
                      dark={true}
                      value={selectedVenue.streetNo}
                    />
                  </div>
                  <Input
                    label="City"
                    placeholder="City"
                    leadingIcon={<CiLocationOn size={18} />}
                    dark={true}
                    value={selectedVenue.city}
                  />
                </div>
              </>
            )}
            {currentFlow === "editVenue" && (
              <>
                <div className="d-flex justify-content-between border-bottom pb-4">
                  <h5>{selectedVenue.name}</h5>

                  <p
                    className="primary-red fs-6 text-decoration-underline pointer"
                    onClick={() => setCurrentFlow("editVenue")}
                  >
                    Delete Venue
                  </p>
                </div>
                <div className="text-center mt-4 pb-4 border-bottom">
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <img
                      src={selectedVenue.photoImageId.url}
                      style={{
                        width: "300px",
                        height: "300px",
                        objectFit: "cover",
                        marginBottom: "10px",
                        cursor: "pointer",
                        borderRadius: "24px",
                      }}
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
                </div>
                <div className="mt-4">
                  <div className="d-flex gap-4">
                    <Input
                      label="Venue Name"
                      placeholder="Venue"
                      leadingIcon={<FaRegBuilding size={18} />}
                      dark={true}
                      value={selectedVenue.name}
                    />
                    <Input
                      label="Phone"
                      placeholder="Phone"
                      leadingIcon={<FiPhone size={18} />}
                      dark={true}
                      value={selectedVenue.phoneNo}
                    />
                  </div>
                  <div className="d-flex gap-4">
                    <Input
                      label="Street"
                      placeholder="Street"
                      leadingIcon={<CiLocationOn size={18} />}
                      dark={true}
                      value={selectedVenue.street}
                    />
                    <Input
                      label="Street Number"
                      placeholder="Street Number"
                      leadingIcon={<GoHash size={18} />}
                      dark={true}
                      value={selectedVenue.streetNo}
                    />
                  </div>
                  <Input
                    label="City"
                    placeholder="City"
                    leadingIcon={<CiLocationOn size={18} />}
                    dark={true}
                    value={selectedVenue.city}
                  />
                  <div className="d-flex justify-content-end gap-3">
                    <button
                      className="btn button-secondary"
                      onClick={() => setCurrentFlow("default_venue")}
                    >
                      Cancel
                    </button>
                    <button className="btn button-primary">Save Changes</button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
