import React from "react";

const ShopPagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="container mx-auto flex justify-center items-center py-10">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className={`btn ${
            currentPage === i + 1 ? "btn-secondary text-white" : "bg-gray-100"
          } mx-2`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default ShopPagination;
