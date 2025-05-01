import React, { useState } from "react";

import ShopList from "./ShopList";
import ShopPagination from "./ShopPagination";
import useFetchProducts from "../../hooks/useFetchProducts";
import FilterSection from "./FilterSection";
import useFetchCategory from "../../hooks/useFetchCategory";

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderingQuery, setOrderingQuery] = useState("");

  const { products, loading, totalPages } = useFetchProducts(
    currentPage,
    priceRange,
    selectedCategory,
    searchQuery,
    orderingQuery
  );

  const categories = useFetchCategory();

  const handlePriceChange = (index, value) => {
    setPriceRange((prev) => {
      const newPriceRange = [...prev];
      newPriceRange[index] = value;
      return newPriceRange;
    });
    setCurrentPage(1);
  };

  return (
    <div>
      <FilterSection
        priceRange={priceRange}
        handlePriceChange={handlePriceChange}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        orderingQuery={orderingQuery}
        setOrderingQuery={setOrderingQuery}
      />
      <ShopList products={products} loading={loading} />
      <ShopPagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={setCurrentPage}
      />
    </div>
  );
};

export default ShopPage;
