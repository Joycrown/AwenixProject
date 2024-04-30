import { IoPhonePortraitOutline } from "react-icons/io5";
import { SlScreenDesktop } from "react-icons/sl";
import { TbDeviceWatch } from "react-icons/tb";
import { CiCamera } from "react-icons/ci";
import { VscGame } from "react-icons/vsc";

import SectionHead from "../../../components/sectionHead";

function CategoriesSection() {
  const categories = [
    { name: "starter feed", icon: IoPhonePortraitOutline },
    { name: "grower mesh feed", icon: SlScreenDesktop },
    { name: "broiler mesh feed", icon: TbDeviceWatch },
    { name: "layer feed", icon: CiCamera },
    { name: "custom order", icon: VscGame },
  ];
  return (
    <div className="space-y-4">
      <SectionHead name="categories" position="left" />

      <h3 className="font-medium">Browse By Category</h3>

      <div className="flex overflow-x-auto gap-3 mx-auto w-full md:w-fit pb-2">
        {categories.map((category, id) => (
          <div
            key={category.name + id}
            className="border min-w-[160px] px-4 md:px-6 py-8 text-center flex flex-col gap-4 items-center justify-center capitalize"
          >
            <category.icon size="1.5rem" />
            <p className="truncate">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesSection;
