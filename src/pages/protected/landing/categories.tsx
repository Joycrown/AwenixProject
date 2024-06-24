import { VscGame } from "react-icons/vsc";
import SectionHead from "../../../components/sectionHead";
import { Link } from "react-router-dom";

function CategoriesSection() {
  return (
    <div className="space-y-4">
      <SectionHead name="Customize your feed" position="left" />

      <h3 className="font-medium">
        Tailor your feeds to your bird's needs and to your preference
      </h3>

      <div className="flex gap-3 pb-2 items-start">
        <Link
          to="/account/products/custom-order"
          className="border min-w-[160px] md:min-w-[200px] px-4 md:px-6 py-8 text-center flex flex-col gap-4 items-center justify-center capitalize cursor-pointer shadow-sm"
        >
          <VscGame size="1.5rem" />
          <p className="truncate">Custom Order</p>
        </Link>
      </div>
    </div>
  );
}

export default CategoriesSection;
