import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import defaultImage from "../../assets/default/9430580_4151017.jpg";

const ProductImagesGallery = ({ images, ProductName }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const displayImages =
    images.length > 0
      ? images
      : [
          {
            id: 0,
            image: defaultImage,
          },
        ];
  console.log(displayImages);
  return (
    <div className="rounded-lg border border-gray-300 overflow-hidden">
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="product-main-slider relative"
      >
        {displayImages.map((imageObj, index) => (
          <SwiperSlide key={index}>
            <div className="aspect-square bg-base-100">
              <img
                src={imageObj.image}
                alt={ProductName}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImagesGallery;
