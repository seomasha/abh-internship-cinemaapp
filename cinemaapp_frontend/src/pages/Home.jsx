import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import VenuesCarousel from "../components/VenuesCarousel";
import PaginatedList from "../components/PaginatedList";
import Footer from "../components/Footer";
import { movieService } from "../services/movieService";
import { venueService } from "../services/venueService";
import { Spinner } from "react-bootstrap";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [venueCarousel, setVenueCarousel] = useState([]);
  const [venues, setVenues] = useState({ venues: [], totalSize: 0 });
  const [heroMovies, setHeroMovies] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [currentlyShowingMovies, setCurrentlyShowingMovies] = useState({
    movies: [],
    totalSize: 0,
  });
  const [upcomingMovies, setUpcomingMovies] = useState({
    movies: [],
    totalSize: 0,
  });

  const [currentlyShowingPage, setCurrentlyShowingPage] = useState(0);
  const [upcomingPage, setUpcomingPage] = useState(0);
  const [venuesPage, setVenuesPage] = useState(0);
  const [heroMoviesSet, setHeroMoviesSet] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      const venueList = await venueService.getAll(venuesPage, 4);
      setVenues({ venues: venueList.venues, totalSize: venueList.totalSize });
    };

    const fetchVenueCarousel = async () => {
      const carousel = await venueService.getAll(venuesPage, 0);
      setVenueCarousel(carousel.venues);
    };

    fetchVenues();
    fetchVenueCarousel();
  }, [venuesPage]);

  useEffect(() => {
    const fetchCurrentlyShowingMovies = async () => {
      const currentlyShowing = await movieService.getMovies({
        page: currentlyShowingPage,
        venueId: selectedVenueId,
      });

      if (!heroMoviesSet) {
        setHeroMovies(currentlyShowing.movies);
        setHeroMoviesSet(true);
      }

      setCurrentlyShowingMovies({
        movies: currentlyShowing.movies,
        totalSize: currentlyShowing.totalSize,
      });
    };

    const fetchUpcomingMovies = async () => {
      const upcoming = await movieService.getMovies({
        type: "upcoming",
        page: upcomingPage,
        venueId: selectedVenueId,
      });
      setUpcomingMovies({
        movies: upcoming.movies,
        totalSize: upcoming.totalSize,
      });
    };

    fetchCurrentlyShowingMovies();
    fetchUpcomingMovies();
    setLoading(false);
  }, [currentlyShowingPage, upcomingPage, heroMoviesSet, selectedVenueId]);

  useEffect(() => {
    const fetchAndProcessCurrentlyShowing = async () => {
      if (!selectedVenueId) return;
      const currentlyShowing = await movieService.getMovies({
        page: currentlyShowingPage,
        venueId: selectedVenueId,
      });
      setCurrentlyShowingMovies({
        movies: currentlyShowing.movies,
        totalSize: currentlyShowing.totalSize,
      });
    };

    const fetchAndProcessUpcomingMovies = async () => {
      if (!selectedVenueId) return;
      const upcomingMovies = await movieService.getMovies({
        type: "upcoming",
        page: upcomingPage,
        venueId: selectedVenueId,
      });
      setUpcomingMovies({
        movies: upcomingMovies.movies,
        totalSize: upcomingMovies.totalSize,
      });
    };

    fetchAndProcessCurrentlyShowing();
    fetchAndProcessUpcomingMovies();
  }, [selectedVenueId, currentlyShowingPage, upcomingPage]);

  const handleCurrentlyShowingPageChange = (newPage) => {
    setCurrentlyShowingPage(newPage);
  };

  const handleUpcomingPageChange = (newPage) => {
    setUpcomingPage(newPage);
  };

  const handleVenuesPageChange = (newPage) => {
    setVenuesPage(newPage);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <Hero data={heroMovies} />
      <VenuesCarousel
        data={venueCarousel}
        setMovies={setMovies}
        setSelectedVenueId={setSelectedVenueId}
        selectedVenueId={selectedVenueId}
      />
      <PaginatedList
        title="Currently Showing"
        data={currentlyShowingMovies.movies}
        totalSize={currentlyShowingMovies.totalSize}
        page={currentlyShowingPage}
        onPageChange={handleCurrentlyShowingPageChange}
        route="/currently-showing"
      />
      <PaginatedList
        title="Upcoming Movies"
        data={upcomingMovies.movies}
        totalSize={upcomingMovies.totalSize}
        page={upcomingPage}
        onPageChange={handleUpcomingPageChange}
        route="/upcoming"
      />
      <PaginatedList
        title="Venues"
        data={venues.venues}
        totalSize={venues.totalSize}
        page={venuesPage}
        onPageChange={handleVenuesPageChange}
        route="/venues"
      />
      <Footer />
    </div>
  );
};

export default Home;
