import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import ProductItem from "../Products/ProductItem";
import ShopList from "./ShopList";
import ShopPagination from "./ShopPagination";

const ShopPage = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages , setTotalPages] = useState(0);
    const [currentPage , setCurrentPage] = useState(1);

  useEffect(() => {
    faceProducts()
  }, [currentPage]);

  const faceProducts = async() => {
    try {
      const response = await apiClient.get(`/products/?page=${currentPage}`)
      console.log(response.data.results)
      setProduct(response.data.results)
      setTotalPages(Math.ceil(response.data.count / response.data.results.length))
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    } 
    
  }


  return (
    <div>
      <ShopList products={products} loading={loading}/>
      <ShopPagination totalPages={totalPages} currentPage={currentPage} handlePageChange={setCurrentPage}/>
    </div>
  );
};

export default ShopPage;
