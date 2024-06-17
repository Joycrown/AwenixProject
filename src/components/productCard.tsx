import { productProps } from "../utils/interface";

interface productCardProps
  extends Omit<productProps, "quantity" | "size" | "description" | "closeFn"> {}

function ProductCard({ name, image, price }: productCardProps) {
  return (
    <div className="space-y-4 relative">
      <div className="bg-default-700 bg-opacity-50 rounded overflow-hidden">
        <img src={image} alt={name} />
      </div>
      <div className="space-y-1">
        <h4>{name}</h4>
        <div className="flex flex-wrap gap-1 items-center text-sm">
          <span className="text-default-400">N {price}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
