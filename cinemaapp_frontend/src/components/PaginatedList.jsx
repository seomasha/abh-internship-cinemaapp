import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Pagination } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SmallButton from "./SmallButton";

const PaginatedList = ({ title, data }) => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCard = currentPage * itemsPerPage;
  const indexOfFirstCard = indexOfLastCard - itemsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(data.length / itemsPerPage);

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

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 991) {
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
        <h6 className="fw-bold primary-red">See all</h6>
      </div>

      <div className="row">
        {currentCards.map((card) => (
          <div className="col-12 col-lg-3 col-lg-3" key={card.id}>
            <Card
              title={card.title}
              duration={card.duration}
              genre={card.genre.join(", ")}
              imageUrl={card.image}
            />
          </div>
        ))}
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-end align-items-center mt-4 pl-4">
        <div className="text-center mb-3 my-auto mx-4">
          <h6>
            Showing{" "}
            <span className="fw-bold">
              {Math.min(indexOfLastCard, data.length)}
            </span>{" "}
            out of <span className="fw-bold">{data.length}</span>
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
