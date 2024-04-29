import CategoriesSection from "./categories";
import HeroSection from "./hero";
import ProductSection from "./products";

function HomePage() {
  return (
    <section className="max-w-[1200px] w-[95%] mx-auto space-y-16 pt-8 pb-16">
      <HeroSection />
      <CategoriesSection />
      <ProductSection />
    </section>
  );
}

export default HomePage;
