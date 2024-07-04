/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { calendarIcon, chicksSlide } from "../../../assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import SectionHead from "../../../components/sectionHead";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { months } from "../../../utils/data";

function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${endpoint}/api/random_poultry_news`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, [endpoint]);

  return (
    <div className="space-y-4">
      <SectionHead name="blogs" position="left" />
      <h3 className="font-medium">Latest News Headlines</h3>
      {blogs.length >= 1 ? (
        <div className="article relative max-w-[1200px] mx-auto select-none">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Scrollbar]}
            navigation={true}
            scrollbar={true}
            spaceBetween="15"
            pagination={{ clickable: true }}
            slidesPerView={1.15}
            breakpoints={{
              1024: {
                slidesPerView: 1.5,
              },
              548: {
                slidesPerView: 1.3,
              },
            }}
            className="rounded-md w-full"
          >
            {blogs.map(({ title, description, date, image, url }, id) => (
              <SwiperSlide
                key={title + id}
                className="relative !h-auto max-lg:max-w-[450px]"
              >
                <article className="flex gap-4 max-lg:flex-col">
                  <div className="max-h-[200px] sm:max-w-[450px] overflow-hidden relative cursor-pointer group">
                    <a
                      href={url}
                      target="_blank"
                      className="absolute bg-black bg-opacity-0 w-full h-full text-white flex items-center justify-center text-xs invisible duration-300 group-hover:bg-opacity-80 group-hover:visible"
                    >
                      Read more
                    </a>
                    <img
                      className="w-full h-full aspect-auto"
                      src={image === null ? chicksSlide : image}
                      alt={title}
                    />
                  </div>
                  <div className="flex gap-4 h-full">
                    <div className="text-center">
                      <img className="w-10" src={calendarIcon} alt={title} />
                      <p className="font-semibold text-lg mt-2">
                        {new Date(date).getFullYear()}
                      </p>
                      <p className="text-xs">
                        {months[new Date(date).getMonth()]}
                      </p>
                    </div>
                    <div className="pl-4 border-l space-y-4">
                      <h4 className="text-lg font-medium line-clamp-3">
                        {title}
                      </h4>
                      <p
                        className="text-xs line-clamp-6"
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                      <a
                        href={url}
                        target="_blank"
                        className="text-default-400 text-xs py-4 block w-fit"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="">No blogs available yet</p>
      )}
    </div>
  );
}

export default BlogSection;
