import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface PaginatorProps {
  onPageChange: (newPage: number) => void;
  currentPage: number;
  totalPages: number;
}

const Paginator: React.FC<PaginatorProps> = ({
  onPageChange,
  currentPage,
  totalPages,
}) => {
  const displayRange = 5;

  const startPage = Math.max(1, currentPage - Math.floor(displayRange / 2));
  const endPage = Math.min(totalPages, startPage + displayRange - 1);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const handleClick = (
    newPage: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    onPageChange(newPage);
  };

  return (
    <div className="paginator">
      <button
        className="transparent-button"
        type="button"
        onClick={(e) => handleClick(currentPage - 1, e)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          onClick={(e) => handleClick(pageNumber, e)}
          className={
            pageNumber === currentPage
              ? "paginator-button active"
              : "paginator-button"
          }
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="transparent-button"
        type="button"
        onClick={(e) => handleClick(currentPage + 1, e)}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Paginator;
