import { Link } from "react-router-dom";
import { hero } from "../../../assets";

function HeroSection() {
  return (
    <div className="bg-default-500 text-white min-h-[75vh] flex items-center py-12">
      <div className="flex max-w-[1200px] w-[95%] mx-auto items-center h-full">
        <div className="flex-1 space-y-6 md:space-y-3">
          <h1>Your partner in Poultry Nutrition</h1>

          <img className="md:hidden" src={hero} alt="awenix-combo" />

          <p>
            At Awenix, we believe that healthy birds are the foundation of a
            thriving poultry operation. That's why we're dedicated to providing
            the highest quality feed tailored to the specific needs of laying
            birds, broilers, and starters.
          </p>
          <Link
            to="/register"
            className="py-3 px-6 border-2 border-white w-fit rounded block"
          >
            Shop now
          </Link>
        </div>
        <div className="flex-1 max-w-[724px] max-md:hidden">
          <img src={hero} alt="awenix-combo" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
