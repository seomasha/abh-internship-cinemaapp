import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Pagination } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SmallButton from "./SmallButton";
import "../styles/PaginatedList.css"; // Assuming the CSS file

const PaginatedList = ({ title, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.matchMedia("(max-width: 576px)").matches) {
        setItemsPerPage(1);
      } else if (window.matchMedia("(max-width: 768px)").matches) {
        setItemsPerPage(2);
      } else if (window.matchMedia("(max-width: 1600px)").matches) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(6);
      }
    };

    updateItemsPerPage();

    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

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

  return (
    <div className="paginated-list-container">
      <div className="paginated-list-header">
        <h3 className="paginated-list-title">{title}</h3>
        <h6 className="paginated-list-see-all">See all</h6>
      </div>

      <div className="paginated-list-cards">
        {currentCards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            duration={card.duration}
            genre={card.genre.join(", ")}
            imageUrl={card.image}
          />
        ))}
      </div>

      <div className="paginated-list-footer">
        <div className="paginated-list-info">
          <h6>
            Showing{" "}
            <span className="fw-bold">
              {Math.min(indexOfLastCard, data.length)}
            </span>{" "}
            out of <span className="fw-bold">{data.length}</span>
          </h6>
        </div>
        <Pagination className="paginated-list-pagination">
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
