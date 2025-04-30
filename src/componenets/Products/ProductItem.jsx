// ProductItem.jsx - Single Product Card Component
import React from "react";
import defaultImage from "../../assets/default/9430580_4151017.jpg";

const ProductItem = ({ product }) => {
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].image
      : defaultImage;

  return (
    <section >
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col h-full">
        {/* Image Section */}
        <div className="h-60 w-full overflow-hidden flex items-center justify-center bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="pt-4 pb-8 px-4 flex flex-col flex-grow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
            {product.name}
          </h2>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <p className="text-red-400 font-bold text-lg">${product.price}</p>
          <button className="btn btn-secondary px-4 py-2 text-sm font-medium rounded-lg ">
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductItem;
