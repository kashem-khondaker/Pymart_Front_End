import React, { useState } from "react";
import { FaShoppingCart, FaMinus, FaPlus, FaCheck } from "react-icons/fa";
import useCartContext from "../../hooks/useCartContext";

const AddToCart = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { AddCartItems } = useCartContext();

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    try {
      setIsAdding(true);
      const response =  await AddCartItems(product.id, quantity);
      console.log(response);
      setIsAdding(false);
      setIsAdded(true)
      setTimeout(() => {
        setIsAdded(false)
      },500)

    } catch (error) {
      console.log(error);
      setIsAdding(false);
      setIsAdded(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="join">
        <button
          className="btn btn-outline join-item"
          onClick={decreaseQuantity}
          disabled={quantity == 1}
        >
          {" "}
          <FaMinus className="h-4 w-4" />{" "}
        </button>
        <input
          type="number"
          value={quantity}
          min={1}
          max={product.stock}
          className="input input-bordered join-item w-16 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          className="btn btn-outline join-item"
          onClick={increaseQuantity}
          disabled={quantity >= product.stock}
        >
          <FaPlus className="h-4 w-4" />
        </button>
      </div>
      <button
        className="btn btn-primary w-full"
        onClick={addToCart}
        disabled={product.stock === 0 || isAdding || isAdded}
      >
        {isAdding ? (
          <span className="flex items-center justify-center">
            <span className="loading loading-spinner loading-sm mr-2"></span>
            Adding ...
          </span>
        ) : isAdded ? (
          <span className="flex items-center">
            <FaCheck className="mr-2 h-4 w-4 text-green-500" />
            Added to Cart
          </span>
        ) : (
          <span className="flex items-center">
            <FaShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </span>
        )}
      </button>
    </div>
  );
};

export default AddToCart;
