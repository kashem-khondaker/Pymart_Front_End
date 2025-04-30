// Products.jsx - Product List with Swiper Carousel
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ErrorAlart from "./ErrorAlart";
import apiClient from "../../services/api-client";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get("/products/")
      .then((res) => {
        setProducts(res.data.results);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="mx-auto py-16 bg-gray-100 min-h-[820px]">
      <div className="container mx-auto px-4">
        {/* Top Title + Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center md:text-left">
            Trending Products
          </h2>
          <a
            href="#"
            className="btn btn-secondary px-6 py-6 rounded-full text-lg"
          >
            View All
          </a>
        </div>

        {/* Spinner  */}
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <span className="loading loading-spinner loading-xl text-secondary"></span>
          </div>
        )}

        {/* Error */}
        {error && (
          <ErrorAlart error={error} /> 
        )}

        {/* If No Products */}
        {products.length === 0 ? (
          <div className="text-center text-gray-600">No products found.</div>
        ) : (
          // Swiper Carousel
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
              1280: { slidesPerView: 4, spaceBetween: 50 },
            }}
            navigation
            className="mt-4 px-4 container"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="flex justify-center">
                <ProductItem key={product.id} product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Products;
