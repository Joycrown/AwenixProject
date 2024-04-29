import Ingredient from "../../../components/ingredient";
import { ingredientsItems } from "../../../utils/data";

function IngredientsPage() {
  return (
    <div className="space-y-4 max-w-[1200px] w-[95%] mx-auto py-16">
      <h3 className="font-medium">All Awenix Ingredients</h3>
      <div>
        {ingredientsItems.slice(0, 3).map((ingredients, id) => (
          <Ingredient key={id} ingredients={{ ...ingredients, position: id }} />
        ))}
      </div>
    </div>
  );
}

export default IngredientsPage;
