import React from "react";
import banner_background from "../../assets/images/banner-image-bg.jpg";

const CarouselSlide = ({ title, subtitle, image }) => {
  return (
    <section
      className="w-full h-auto min-h-[500px] md:h-[650px] bg-cover bg-center flex justify-center items-center px-4 md:px-8 py-12"
      style={{ backgroundImage: `url(${banner_background})` }}
    >
      <div className="max-w-6xl w-full flex flex-col-reverse md:flex-row justify-between items-center gap-8 md:gap-16">
        {/* Left */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            {title}
          </h1>
          <p className="text-sm md:text-base text-gray-600 my-4">
            {subtitle}
          </p>
          <button className="btn btn-secondary px-6 py-3 rounded-full shadow-md mt-2 md:mt-4">
            Shop Product
          </button>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img className="max-w-xs md:max-w-md drop-shadow-lg" src={image} alt="product" />
        </div>
      </div>
    </section>
  );
};

export default CarouselSlide;
