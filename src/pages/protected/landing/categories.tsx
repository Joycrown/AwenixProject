import { BiPhone } from "react-icons/bi";
import SectionHead from "../../../components/sectionHead";

function CategoriesSection() {
  const categories = [
    { name: "starter feed", icon: <BiPhone /> },
    { name: "grower mesh feed", icon: <BiPhone /> },
    { name: "broiler mesh feed", icon: <BiPhone /> },
    { name: "layer feed", icon: <BiPhone /> },
    { name: "custom order", icon: <BiPhone /> },
  ];
  return (
    <div className="space-y-4">
      <SectionHead name="categories" position="left" />

      <h3 className="font-medium">Browse By Category</h3>

      <div className="flex gap-3 mx-auto w-fit">
        {categories.map((category, id) => (
          <div
            key={category.name + id}
            className="border px-6 py-8 text-center flex flex-col gap-4 items-center justify-center capitalize"
          >
            {category.icon}
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesSection;
