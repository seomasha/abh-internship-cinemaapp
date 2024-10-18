import React, { useState } from "react";
import colors from "../utils/colors";
import Card from "./Card";
import { Pagination } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SmallButton from "./SmallButton";
import { duration } from "@mui/material";

const PaginatedList = ({ title }) => {
  const cardsData = [
    { id: 1, title: "Movie 1", duration: "100", genre: "Adventure" },
    { id: 2, title: "Movie 2", duration: "101", genre: "Comedy" },
    { id: 3, title: "Movie 3", duration: "102", genre: "SF" },
    { id: 4, title: "Movie 4", duration: "103", genre: "Adventure" },
    { id: 5, title: "Movie 5", duration: "104", genre: "Comedy" },
    { id: 6, title: "Movie 6", duration: "105", genre: "SF" },
    { id: 7, title: "Movie 7", duration: "106", genre: "Comedy" },
    { id: 8, title: "Movie 8", duration: "107", genre: "Adventure" },
    { id: 9, title: "Movie 9", duration: "108", genre: "SF" },
    { id: 10, title: "Movie 10", duration: "109", genre: "Adventure" },
  ];

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCard = currentPage * itemsPerPage;
  const indexOfFirstCard = indexOfLastCard - itemsPerPage;
  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cardsData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ padding: "3rem 8rem" }}>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 fw-bold">
          {title}
        </h3>
        <h6 className="fw-bold primary-red">
          See all
        </h6>
      </div>

      <div className="d-flex justify-content-start gap-5">
        {currentCards.map((card) => (
          <Card key={card.id} title={card.title} duration={card.duration} genre={card.genre}/>
        ))}
      </div>

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
