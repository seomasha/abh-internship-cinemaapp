import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { Spinner } from "react-bootstrap";

import { CiLocationOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { venueService } from "../services/venueService";
import { projectionService } from "../services/projectionService";

const Venue = () => {
  const { id } = useParams("id");
  const [venue, setVenue] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getVenue = async () => {
      const response = await venueService.get(id);
      setVenue(response);
    };

    const getMovies = async () => {
      const response = await projectionService.getProjectionsByVenueId(
        id,
        page
      );
      setMovies(response);
    };

    getMovies();
    getVenue();
    setLoading(false);
  }, []);

  const loadMoreMovies = async () => {
    const nextPage = page + 1;
    const response = await projectionService.getProjectionsByVenueId(
      id,
      nextPage
    );
    setMovies((prevState) => ({
      ...prevState,
      content: [...prevState.content, ...response.content],
    }));
    setPage(nextPage);
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <NavBar />

          <h3 className="p-5">Venue Details</h3>

          <div className="px-5">
            <div className="d-flex py-3 gap-2 border rounded-4">
              <img
                src={venue.photoImageId?.url}
                width={700}
                height={400}
                className="rounded-3 mx-3"
                style={{ objectFit: "cover" }}
              />
              <div className="p-5">
                <h5>{venue.name}</h5>
                <div className="d-flex gap-3 my-3">
                  <CiLocationOn size={18} className="primary-red" />
                  <p>
                    {venue.street} {venue.streetNo}, {venue.city}
                  </p>
                </div>
                <div className="d-flex gap-3 my-3">
                  <FiPhone size={18} className="primary-red" />
                  <p>{venue.phoneNo}</p>
                </div>
              </div>
            </div>

            <h2 className="pt-5">
              Movies playing in {venue.name} ({movies.totalElements})
            </h2>

            {movies.totalElements === 0 && (
              <h5 className="py-3 text-danger">No movies in this cinema.</h5>
            )}

            <div className="row g-3 mt-3">
              {movies?.content?.map((movie) => (
                <div key={movie.movieId.id} className="col-3">
                  <Card
                    title={movie.movieId.name}
                    imageUrl={
                      movie.movieId.photos.find(
                        (photo) => photo.entityType === "movie"
                      )?.url
                    }
                    subtitle={`${movie.movieId.movieDuration} MIN`}
                    genre={movie.movieId.genres
                      .map((genre) => genre.name)
                      .join(", ")}
                  />
                </div>
              ))}
            </div>
          </div>

          {movies.totalElements > movies.content?.length && (
            <p
              className="text-center primary-red my-4 fw-bold text-decoration-underline fs-6 pointer"
              onClick={loadMoreMovies}
            >
              Load more
            </p>
          )}

          <Footer />
        </>
      )}
    </div>
  );
};

export default Venue;
