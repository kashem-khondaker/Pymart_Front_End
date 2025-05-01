import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

const useFetchProducts = (
  currentPage,
  priceRange,
  selectedCategory,
  searchQuery,
  orderingQuery
) => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = `products/?category_id=${selectedCategory}&price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&page=${currentPage}&search=${searchQuery}&ordering=${orderingQuery}`;
      setLoading(true);
      try {
        const response = await apiClient.get(url);
        console.log(response.data.results);
        setProduct(response.data.results);
        setTotalPages(
          Math.ceil(response.data.count / response.data.results.length)
        );
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, priceRange, selectedCategory, searchQuery,orderingQuery]);

  return { products, loading, totalPages };
};

export default useFetchProducts;
