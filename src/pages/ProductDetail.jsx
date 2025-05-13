import React from "react";
import ProductImagesGallery from "../componenets/ProductDetails/ProductImagesGallery";
import AddToCart from "../componenets/ProductDetails/AddToCart";

const ProductDetail = () => {
  const Product = {
    id: 11,
    name: "Man",
    description: "T-shirt",
    price: 120.0,
    stock: 10,
    category: 1,
    price_with_tax: 132.0,
    images: [
      {
        id: 11,
        image:
          "https://res.cloudinary.com/dep4demuv/image/upload/v1745991761/ra3dulkmnwy0oabrixdp.jpg",
      },
      {
        id: 12,
        image:
          "https://res.cloudinary.com/dep4demuv/image/upload/v1745991761/ra3dulkmnwy0oabrixdp.jpg",
      },
    ],
  };
  return (
    <div className="w-3/4 mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <ProductImagesGallery
          images={Product.images}
          ProductName={Product.name}
        />
        <div className="mt-auto">
          <AddToCart product={Product}/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
