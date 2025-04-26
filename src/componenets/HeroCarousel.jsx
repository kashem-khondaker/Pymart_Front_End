import { Swiper, SwiperSlide } from "swiper/react";
import CarouselSlide from "./Carousel/CarouselSlide";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import book from "../assets/images/book.png";
import fashion from "../assets/images/fashion.png";
import technology from "../assets/images/technology.png";

const HeroCarousel = () => {
  const slides = [
    {
      title: "This Fine Print Book Collections",
      subtitle: "This is a fine print book collections",
      image: book,
    },
    {
      title: "Exlusive Fashion Collections",
      subtitle:
        "A specialists label creating luxurious and stylish apparel for men and women",
      image: fashion,
    },
    {
      title: "Your Degital World , Connected with Technology",
      subtitle: "Explore a range of devices for seamless living",
      image: technology,
    },
  ];
  return (
    <>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <CarouselSlide
              title={slide.title}
              subtitle={slide.subtitle}
              image={slide.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeroCarousel;
