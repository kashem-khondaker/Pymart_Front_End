
import DiscountSection from "../componenets/Discount/DiscountSection";
import Features from "../componenets/Features";
import HeroCarousel from "../componenets/HeroCarousel";
import Products from "../componenets/Products/Products";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <Features />
      <Products />
      <DiscountSection />
    </div>
  );
};

export default Home;
