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

  const faceProducts = () => {
    apiClient.get(`/products/?page=${currentPage}`)
    .then((res) => {
        setProduct(res.data.results)
        setTotalPages(Math.ceil(res.data.count / res.data.results.length))
    })
    .catch((error) => console.error(error.message))
    .finally(() => setLoading(false));
  }


  return (
    <div>
      <ShopList products={products} loading={loading}/>
      <ShopPagination totalPages={totalPages} currentPage={currentPage} handlePageChange={setCurrentPage}/>
    </div>
  );
};

export default ShopPage;
