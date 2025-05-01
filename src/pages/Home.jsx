import HeroCaroucel from "../componenets/Home/Carousel/HeroCarousel";
import Features from "../componenets/Home/Features";
import Categoris from "../componenets/Home/Categories/Categoris";
import Products from "../componenets/Products/Products";
import DiscountSection from "../componenets/Home/Discount/DiscountSection";

const Home = () => {
  return (
    <div>
      <HeroCaroucel />
      <Features />
      <Categoris />
      <Products />
      <DiscountSection />
    </div>
  );
};

export default Home;
