import { Link } from "react-router-dom";
import { grains, groupfeed, groupmail } from "../../../assets";
import SectionHead from "../../../components/sectionHead";

function VisionSection() {
  const standards = [
    {
      img: groupfeed,
      title: "Organic Feed Only",
      text: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum",
    },
    {
      img: groupmail,
      title: "Quality Standards",
      text: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum",
    },
  ];
  return (
    <div className="bg-default-800 py-16">
      <div className="max-w-[1200px] w-[95%] mx-auto space-y-4">
        <SectionHead position="left" name="our vision" />
        <div className="flex gap-8 lg:gap-24">
          <div className="w-5/12 max-sm:hidden">
            <img src={grains} alt="Our vision - Awenix mill" />
          </div>
          <div className="flex-1 space-y-3">
            <h2 className="font-semibold">
              We Believe in Healthy Practices For Growth
            </h2>
            <p className="text-default-300 text-sm">
              Simply dummy text of the printing and typesetting industry. Lorem
              had ceased to been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley.
            </p>

            <div className="space-y-4 py-6">
              {standards.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center">
                    <img className="w-8" src={item.img} alt={item.title} />
                  </div>
                  <div className="space-y-3 text-sm max-w-sm">
                    <span className="font-semibold block">{item.title}</span>
                    <span>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="sm:hidden pb-10">
              <img src={grains} alt="Our vision - Awenix mill" />
            </div>

            <Link
              to="/register"
              className="py-3 px-6 bg-default-500 text-white w-fit rounded block max-sm:mx-auto"
            >
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisionSection;
