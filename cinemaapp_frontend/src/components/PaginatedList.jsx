import React, { useState } from "react";
import colors from "../utils/colors";
import Card from "./Card";
import { Pagination } from "react-bootstrap"; // Import Bootstrap Pagination
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"; // Import arrow icons
import SmallButton from "./SmallButton";

const PaginatedList = () => {
  const cardsData = [
    { id: 1, title: "Movie 1" },
    { id: 2, title: "Movie 2" },
    { id: 3, title: "Movie 3" },
    { id: 4, title: "Movie 4" },
    { id: 5, title: "Movie 5" },
    { id: 6, title: "Movie 6" },
    { id: 7, title: "Movie 7" },
    { id: 8, title: "Movie 8" },
    { id: 9, title: "Movie 9" },
    { id: 10, title: "Movie 10" },
    // Add more cards as needed
  ];

  const itemsPerPage = 4; // Number of cards per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last card for the current page
  const indexOfLastCard = currentPage * itemsPerPage;
  const indexOfFirstCard = indexOfLastCard - itemsPerPage;
  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

  // Total number of pages
  const totalPages = Math.ceil(cardsData.length / itemsPerPage);

  // Function to handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ padding: "4rem 8rem" }}>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4">Currently Showing</h3>
        <h6 style={{ color: colors.primary_red }} className="fw-bold">
          See all
        </h6>
      </div>

      <div className="d-flex justify-content-center gap-5">
        {currentCards.map((card) => (
          <Card key={card.id} title={card.title} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-end align-items-center mt-4 pl-4">
        <div className="text-center mb-3 my-auto mx-4">
          <h6>
            Showing{" "}
            <span className="fw-bold">
              {Math.min(indexOfLastCard, cardsData.length)}
            </span>{" "}
            out of<span className="fw-bold"> </span>
            {cardsData.length}
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
    </div>
  );
};

export default PaginatedList;
