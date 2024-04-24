import AboutSection from "./about";
import HeroSection from "./hero";
import OfferSection from "./offer";
import ProductSection from "./product";
import VisionSection from "./vision";

function LandingPage() {
  return (
    <section>
      <HeroSection />
      <div className="max-w-[1200px] w-[95%] mx-auto mb-16">
        <AboutSection />
        <ProductSection />
      </div>
      <VisionSection />
      <OfferSection />
    </section>
  );
}

export default LandingPage;
