import { Link } from "react-router-dom";
import Ingredient from "../../../components/ingredient";
import SectionHead from "../../../components/sectionHead";
import { ingredientsItems } from "../../../utils/data";

function ProductSection() {
  return (
    <div className="space-y-4">
      <SectionHead name="our products" position="right" />
      <h3 className="font-medium">See your ingredients</h3>
      <div className="">
        {ingredientsItems.slice(0, 3).map((ingredients, id) => (
          <Ingredient key={id} ingredients={{ ...ingredients, position: id }} />
        ))}
      </div>

      <Link
        to="/products/ingredients"
        className="py-3 px-6 border-2 border-default-500 text-default-500 mx-auto w-fit rounded block"
      >
        View all
      </Link>
    </div>
  );
}

export default ProductSection;
