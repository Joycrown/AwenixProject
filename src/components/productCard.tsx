import { MdStar } from "react-icons/md";

interface productCardProps {
  name: string;
  image: string;
  stock: number;
  price: number;
  discount: number;
  rating: number;
}
function ProductCard({ name, image, stock, price, rating }: productCardProps) {
  return (
    <div className="space-y-4">
      <div className="bg-default-700 bg-opacity-50 rounded overflow-hidden">
        <img src={image} alt={name} />
      </div>
      <div className="space-y-1">
        <h4>{name}</h4>
        <div className="flex flex-wrap gap-1 items-start text-sm">
          <span className="text-default-400">N {price}</span>
          <div className="flex">
            {new Array(5).fill("").map((_, id) => (
              <MdStar
                size="1rem"
                className={
                  id + 1 <= rating ? "text-orange-500" : "text-default-700"
                }
              />
            ))}
          </div>
          <span className="text-default-700 text-xs">({stock})</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
