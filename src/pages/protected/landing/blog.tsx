import { calendarIcon } from "../../../assets";
import SectionHead from "../../../components/sectionHead";
import { blogs } from "../../../utils/data";

function BlogSection() {
  return (
    <div className="space-y-4">
      <SectionHead name="blogs" position="left" />
      <h3 className="font-medium">Latest News Headlines</h3>
      <div className="overflow-x-auto flex gap-4">
        {blogs.map(({ image, heading, body, date }, id) => (
          <article
            className={`flex gap-4 ${
              id === 0 ? "max-w-[75%]" : "scale-75"
            } flex-1`}
            key={id}
          >
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
        ))}
      </div>
    </div>
  );
}

export default BlogSection;
