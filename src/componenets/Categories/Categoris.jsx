import React from "react";
import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import CategoriesItems from "./CategoriesItems";

const Categoris = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiClient.get("/categories").then((res) => setCategories(res.data));
  }, []);
  return (
    <section className="container mx-auto items-center px-4 py-20">
      {/* Category Heading  */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center md:text-left">Browse Categories</h2>
        <a
          href="#"
          className="btn btn-secondary px-6 py-6 rounded-full text-lg"
        >
          View All
        </a>
      </div>

      {/* Category Grid  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <CategoriesItems
            key={category.id || index}
            index={index}
            category={category}
          />
        ))}
      </div>
    </section>
  );
};

export default Categoris;
