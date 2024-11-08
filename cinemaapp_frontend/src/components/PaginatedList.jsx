import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import SmallCard from "./SmallCard";
import { Pagination } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SmallButton from "./SmallButton";
import screenSizes from "../utils/screenSizes";

const PaginatedList = ({
  title,
  data,
  totalSize,
  page,
  onPageChange,
  route,
  perPage = 4,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(perPage);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCard = currentPage * itemsPerPage;
  const indexOfFirstCard = indexOfLastCard - itemsPerPage;

  const totalPages =
    perPage === totalSize ? 1 : Math.ceil(totalSize / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(page - 1);
    }
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= screenSizes.large) {
        setItemsPerPage(1);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  return (
    <div style={{ padding: "3rem 4rem" }}>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 fw-bold">{title}</h3>
        {route && (
          <Link to={route} className="text-decoration-none">
            <h6 className="fw-bold primary-red">See all</h6>
          </Link>
        )}
      </div>

      {data.length === 0 ? (
        <div className="text-center">
          <h6>No movies available</h6>
        </div>
      ) : (
        <>
          <div className="row">
            {data.map((card) => (
              <div
                className={`col-12 col-sm-6 col-md-4 col-lg-${
                  route ? "3" : "2"
                }`}
                key={card.id}
              >
                {route ? (
                  <Link
                    to={`/movie-details/${card.id}`}
                    className="text-decoration-none"
                  >
                    {card.street ? (
                      <Card
                        title={card.name}
                        subtitle={`${card.street} ${
                          card.streetNo === 0 ? "bb" : card.streetNo
                        }, ${card.city}`}
                        imageUrl={card.photoImageId.url}
                      />
                    ) : (
                      <Card
                        title={card.name}
                        subtitle={`${card.movieDuration} mins`}
                        genre={card.genres
                          .map((genre) => genre.name)
                          .join(", ")}
                        imageUrl={
                          card.photos.find(
                            (photo) => photo.entityType === "movie"
                          )?.url
                        }
                      />
                    )}
                  </Link>
                ) : (
                  <Link
                    to={`/movie-details/${card.id}`}
                    className="text-decoration-none"
                  >
                    <SmallCard
                      imgUrl={
                        card.photos.find(
                          (photo) => photo.entityType === "movie"
                        )?.url
                      }
                      title={card.name}
                    />
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-end align-items-center mt-4 pl-4">
            <div className="text-center mb-3 my-auto mx-4">
              <h6>
                Showing{" "}
                <span className="fw-bold">
                  {Math.min(
                    perPage === totalSize
                      ? totalSize
                      : currentPage * itemsPerPage,
                    totalSize
                  )}
                </span>{" "}
                out of <span className="fw-bold">{totalSize}</span>
              </h6>
            </div>
            <Pagination className="gap-4 mt-2">
              <SmallButton
                onClick={handlePreviousPage}
                icon={<FaArrowLeft />}
                disabled={currentPage === 1}
              />
              <SmallButton
                onClick={handleNextPage}
                icon={<FaArrowRight />}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginatedList;
