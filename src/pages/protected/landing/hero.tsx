import { Link } from "react-router-dom";
import { chicks } from "../../../assets";

function HeroSection() {
  return (
    <div className="relative bg-default-500 rounded-md min-h-[300px] md:min-h-[400px] !flex items-stretch text-white">
      <div className="flex flex-col max-md:gap-8 p-6 md:p-12 w-full capitalize relative z-10 max-md:mb-10">
        <p>Awenix Nigeria Ltd</p>
        <span className="text-4xl md:text-5xl my-auto">
          Customize your feed percentage
        </span>
        <Link
          to="#categories"
          className="py-3 px-6 border-2 border-white w-fit flex items-center gap-2"
        >
          Explore
        </Link>
      </div>
      <div className="relative w-full flex items-end">
        <img src={chicks} alt="Customize your feed percentage" />
      </div>
    </div>
  );
}

export default HeroSection;
