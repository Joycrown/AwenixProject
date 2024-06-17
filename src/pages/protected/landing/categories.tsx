import { IoPhonePortraitOutline } from "react-icons/io5";
import { SlScreenDesktop } from "react-icons/sl";
import { TbDeviceWatch } from "react-icons/tb";
import { CiCamera } from "react-icons/ci";
import { VscGame } from "react-icons/vsc";

import SectionHead from "../../../components/sectionHead";
import { useState } from "react";
import ProductPopup from "../../../components/productPopup";

function CategoriesSection() {
  const categories = [
    {
      name: "starter feed",
      icon: IoPhonePortraitOutline,
      description:
        "Special awenix mix is being used to facilitate healthy feed for chicks",
      size: "bag",
      price: 5700,
    },
    {
      name: "grower mesh feed",
      icon: SlScreenDesktop,
      description:
        "Special awenix mix is being used to facilitate healthy feed for chicks",
      size: "bag",
      price: 5700,
    },
    {
      name: "broiler mesh feed",
      icon: TbDeviceWatch,
      description:
        "Special awenix mix is being used to facilitate healthy feed for chicks",
      size: "bag",
      price: 5700,
    },
    {
      name: "layer feed",
      icon: CiCamera,
      description:
        "Special awenix mix is being used to facilitate healthy feed for chicks",
      size: "bag",
      price: 5700,
    },
    {
      name: "custom order",
      icon: VscGame,
      description:
        "Special awenix mix is being used to facilitate healthy feed for chicks",
      size: "bag",
      price: 5700,
    },
  ];
  const [categoryItem, setCategoryItem] = useState({
    name: "",
    description: "",
    size: "",
    price: 0,
    hidden: true,
  });

  return (
    <div className="space-y-4">
      <SectionHead name="categories" position="left" />

      <h3 className="font-medium">Browse By Category</h3>

      <div className="flex overflow-x-auto gap-3 mx-auto w-full md:w-fit pb-2">
        {categories.map((category, id) => (
          <div
            onClick={() =>
              setCategoryItem((prev) => ({
                ...prev,
                ...category,
                hidden: !prev.hidden,
              }))
            }
            key={category.name + id}
            className="border min-w-[160px] px-4 md:px-6 py-8 text-center flex flex-col gap-4 items-center justify-center capitalize cursor-pointer"
          >
            <category.icon size="1.5rem" />
            <p className="truncate">{category.name}</p>
          </div>
        ))}

        {!categoryItem.hidden && (
          <ProductPopup
            {...categoryItem}
            closeFn={() =>
              setCategoryItem({
                name: "",
                description: "",
                size: "",
                price: 0,
                hidden: true,
              })
            }
          />
        )}
      </div>
    </div>
  );
}

export default CategoriesSection;
