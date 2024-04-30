import { calendarIcon } from "../../../assets";
import SectionHead from "../../../components/sectionHead";
import { blogs } from "../../../utils/data";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

function BlogSection() {
  return (
    <div className="space-y-4">
      <SectionHead name="blogs" position="left" />
      <h3 className="font-medium">Latest News Headlines</h3>
      <div className="article relative max-w-[1200px] mx-auto select-none">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Scrollbar]}
          navigation={true}
          scrollbar={true}
          slidesPerView={1.35}
          spaceBetween="35"
          pagination={{ clickable: true }}
          slidePrevClass="resizeable-slide"
          slideNextClass="resizeable-slide"
          className="rounded-md w-full"
        >
          {blogs.map(({ image, heading, body, date }, id) => (
            <SwiperSlide key={heading + id} className="relative">
              <article className="flex gap-4">
                <div className="max-h-[200px] max-w-[450px] overflow-hidden relative cursor-pointer group">
                  <div className="absolute bg-black bg-opacity-0 w-full h-full text-white flex items-center justify-center text-xs invisible duration-300 group-hover:bg-opacity-80 group-hover:visible">
                    Read more
                  </div>
                  <img src={image} alt={heading} />
                </div>
                <div className="text-center">
                  <img className="w-10" src={calendarIcon} alt={date} />
                  <p className="font-semibold text-lg mt-2">
                    {new Date(date).getFullYear()}
                  </p>
                  <p className="text-xs">March</p>
                </div>
                <div className="pl-4 border-l space-y-4">
                  <h4 className="text-lg font-medium">{heading}</h4>
                  <p
                    className="text-xs line-clamp-6"
                    dangerouslySetInnerHTML={{ __html: body }}
                  />
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default BlogSection;
