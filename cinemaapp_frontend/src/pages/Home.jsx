import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import VenuesCarousel from "../components/VenuesCarousel";
import PaginatedList from "../components/PaginatedList";
import Footer from "../components/Footer";
import { movieService } from "../services/movieService";
import { venueService } from "../services/venueService";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [venues, setVenues] = useState([]);
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
  const [heroMoviesSet, setHeroMoviesSet] = useState(false);

  useEffect(() => {
    const fetchVenues = async () => {
      const venues = await venueService.getAll();
      setVenues(venues);
    };

    const fetchCurrentlyShowingMovies = async () => {
      const currentlyShowing = await movieService.getCurrentlyShowingMovies(
        currentlyShowingPage
      );

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
      const upcoming = await movieService.getUpcomingMovies(upcomingPage);
      setUpcomingMovies({
        movies: upcoming.movies,
        totalSize: upcoming.totalSize,
      });
    };

    fetchCurrentlyShowingMovies();
    fetchUpcomingMovies();
    fetchVenues();
  }, [currentlyShowingPage, upcomingPage, heroMoviesSet]);

  useEffect(() => {
    const fetchCurrentlyShowingAndUpcomingMovies = async () => {
      if (selectedVenueId) {
        const currentlyShowing =
          await movieService.getCurrentlyShowingMoviesByVenueId(
            selectedVenueId,
            currentlyShowingPage
          );

        const upcomingMovies = await movieService.getUpcomingMoviesByVenueId(
          selectedVenueId,
          upcomingPage
        );

        setCurrentlyShowingMovies({
          movies: currentlyShowing.movies,
          totalSize: currentlyShowing.totalSize,
        });
        setUpcomingMovies({
          movies: upcomingMovies.movies,
          totalSize: upcomingMovies.totalSize,
        });
      }
    };

    fetchCurrentlyShowingAndUpcomingMovies();
  }, [selectedVenueId, currentlyShowingPage, upcomingPage]);

  const handleCurrentlyShowingPageChange = (newPage) => {
    setCurrentlyShowingPage(newPage);
  };

  const handleUpcomingPageChange = (newPage) => {
    setUpcomingPage(newPage);
  };

  return (
    <div>
      <NavBar />
      <Hero data={heroMovies} />
      <VenuesCarousel
        data={venues}
        setMovies={setMovies}
        setSelectedVenueId={setSelectedVenueId}
      />
      <PaginatedList
        title="Currently Showing"
        data={currentlyShowingMovies.movies}
        totalSize={currentlyShowingMovies.totalSize}
        page={currentlyShowingPage}
        onPageChange={handleCurrentlyShowingPageChange}
      />
      <PaginatedList
        title="Upcoming Movies"
        data={upcomingMovies.movies}
        totalSize={upcomingMovies.totalSize}
        page={upcomingPage}
        onPageChange={handleUpcomingPageChange}
      />
      <PaginatedList title="Venues" data={venues} totalSize={venues.length} />
      <Footer />
    </div>
  );
};

export default Home;
