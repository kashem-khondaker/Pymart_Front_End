
import Categoris from "../componenets/Categories/Categoris";
import DiscountSection from "../componenets/Discount/DiscountSection";
import Features from "../componenets/Features";
import HeroCarousel from "../componenets/HeroCarousel";
import Products from "../componenets/Products/Products";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <Features />
      <Categoris />
      <Products />
      <DiscountSection />
    </div>
  );
};

export default Home;
