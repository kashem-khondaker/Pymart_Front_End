import React from "react";
import ProductImagesGallery from "../componenets/ProductDetails/ProductImagesGallery";

const ProductDetail = () => {
  const Product = {
    id: 11,
    name: "Man",
    description: "T-shirt",
    price: 120.0,
    stock: 300,
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
    <div>
      <ProductImagesGallery
        images={Product.images}
        ProductName={Product.name}
      />
    </div>
  );
};

export default ProductDetail;
