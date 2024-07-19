import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowRoundForward } from "react-icons/io";

import SectionHead from "../../../components/sectionHead";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { broilers, chicks } from "../../../assets";

function AboutSection() {
  const slides = [
    {
      title: "starter feed",
      name: "awenix starter mix",
      id: 1,
      color: "#000000",
    },
    {
      title: "Grower/Broiler Mesh Feed",
      name: "Build up your custom mix",
      id: 2,
      color: "#B0B0B0",
    },
    {
      title: "Broiler Finisher Feed",
      name: "Finish strong with Awenix feed",
      id: 3,
      color: "#0092DF",
    },
  ];
  return (
    <div className="py-16 space-y-4">
      <SectionHead name="about us" position="left" />
      <div className="md:flex gap-8">
        <h2 className="font-semibold flex-1">
          Creating sustainable produce for the future
        </h2>
        <Link
          to="/about"
          className="md:hidden text-default-500 hover:underline"
        >
          Learn more
        </Link>
        <p className="w-7/12 text-sm flex flex-col max-md:hidden">
          Experience the difference that Awenix feed can make in your poultry
          operation. Join countless farmers who trust Awenix to deliver results,
          from improved growth rates to higher egg production and healthier
          chickens. Contact us today to learn more about our products and how we
          can support your success in poultry farming.
          <Link to="/about" className="text-default-500 hover:underline">
            Learn more
          </Link>
        </p>
      </div>

      <div className="overflow-hidden max-w-[1200px] mx-auto">
        <Swiper
          // install Swiper modules
          modules={[Pagination, Autoplay]}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="rounded-md w-full relative"
        >
          {slides.map((slide) => (
            <SwiperSlide
              style={{ background: slide.color }}
              key={slide.title + slide.id}
              className="relative rounded-md min-h-[300px] md:min-h-[400px] !flex items-stretch text-white"
            >
              <div className="flex flex-col p-6 md:p-12 w-full capitalize relative z-10 max-sm:mb-10">
                <p
                  className={
                    slide.title === "Grower/Broiler Mesh Feed"
                      ? "text-black"
                      : "text-white"
                  }
                >
                  {slide.title}
                </p>
                <span className="text-5xl my-auto">{slide.name}</span>
                <Link
                  to="/account/register"
                  className="py-3 border-b-2 border-white w-fit flex items-center gap-2"
                >
                  Shop now <IoIosArrowRoundForward size="1.2rem" />
                </Link>
              </div>
              <div className="max-sm:hidden relative w-full flex items-end">
                <img
                  className="my-0"
                  src={
                    slide.title === "Grower/Broiler Mesh Feed"
                      ? broilers
                      : chicks
                  }
                  alt={slide.title}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default AboutSection;
