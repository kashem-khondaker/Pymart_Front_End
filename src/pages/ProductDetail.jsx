import ProductImagesGallery from "../componenets/ProductDetails/ProductImagesGallery";
import AddToCart from "../componenets/ProductDetails/AddToCart";
import { Link, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { Suspense, useEffect, useState } from "react";
import apiClient from "../services/api-client";
import ReviewSection from "../componenets/Reviews/ReviewSection";

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    apiClient.get(`/products/${productId}/`).then((response) => {
      console.log(response.data);
      setProduct(response.data);
      setIsLoading(false);
    });
  }, [productId]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center gap-4">
        <span className="loading loading-spinner text-secondary loading-sm mr-2" />{" "}
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div>Loading ... </div>
    );
  }
  return (
    <div className="w-3/4 mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/shop"
          className="flex items-center text-sm text-base-content/70 hover:text-base-content transition-colors"
        >
          {" "}
          <FaArrowLeft className="mr-2 h-4 w-4" /> Back to products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <Suspense
          fallback={
            <div className="aspect-square bg-base-200 animate-pulse rounded-lg"></div>
          }
        >
          <ProductImagesGallery
            images={product.images}
            ProductName={product.name}
          />
        </Suspense>

        <div className="flex flex-col">
          <div className="mb-4">
            <div className="badge badge-outline tracking-tight">
              Category {product.category}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              {" "}
              {product.name}{" "}
            </h1>
          </div>

          <div className="mt-2 mb-6 ">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold"> $ {product.price} </span>
              <span className="text-sm text-base-content/70">
                {" "}
                ( ${product.price_with_tax} incl. tax){" "}
              </span>
            </div>
          </div>

          <div className="prose prose-sm mb-6">
            <p> {product.description} </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              <div className="mr-2 text-sm font-medium"> Availability:</div>
              {product.stock > 0 ? (
                <div className="badge badge-outline bg-success/10 text-success border-success/20">
                  In Stock ( {product.stock} Available )
                </div>
              ) : (
                <div className="badge badge-outline bg-error/10 text-error border-error/20">
                  Out of Stock
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
      <ReviewSection />
    </div>
  );
};

export default ProductDetail;
