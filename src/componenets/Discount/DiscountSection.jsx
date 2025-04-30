import React from "react";
import banner_background from "../../assets/images/banner-image-bg-1.jpg";
import book from "../../assets/images/banner-image3.png";
import DiscountTimer from "./DiscountTimer";

const DiscountSection = () => {
  return (
    <section
      className="w-full min-h-[500px] md:min-h-[650px] bg-cover bg-center flex items-center justify-center sm:py-10 "
      style={{ backgroundImage: `url(${banner_background})` }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            src={book}
            alt="Product"
            className="w-80 md:w-80 lg:w-96 xl:w-96 drop-shadow-2xl hover:scale-105 transition duration-300"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            30% Discount On All Products. <br className="hidden md:block" />{" "}
            Hurry Up!
          </h1>

          <DiscountTimer />

          <button className="px-6 py-3 sm:px-8 sm:py-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition duration-300 shadow-lg text-sm sm:text-base">
            Shop Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
