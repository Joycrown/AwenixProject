import { useLocation } from "react-router-dom";
import BlogSection from "./blog";
import CategoriesSection from "./categories";
import HeroSection from "./hero";
import ProductSection from "./products";
import { useEffect } from "react";

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the section when the page mounts
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Scroll to the top of the page if no hash is provided
      window.scrollTo(0, 0);
    }
  }, [location]);
  return (
    <section className="max-w-[1200px] w-[95%] mx-auto space-y-16 pt-8 pb-16">
      <HeroSection />
      <ProductSection />
      <CategoriesSection />
      <BlogSection />
    </section>
  );
}

export default HomePage;
