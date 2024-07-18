import { useState } from "react";
import ProductPopup from "./productPopup";
import { productProps } from "../utils/interface";

interface productExtendProps extends Omit<productProps, "quantity"> {}
interface productCardProps {
  product: productExtendProps;
}

function ProductCard({ product }: productCardProps) {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      <div
        className="space-y-4 relative cursor-pointer"
        onClick={() => setHidden(true)}
      >
        <div className="bg-default-700 bg-opacity-50 rounded overflow-hidden">
          <img src={product.product_image} alt={product.name} />
        </div>
        <div className="space-y-1">
          <h4 className="capitalize">{product.name}</h4>
          <div className="flex flex-wrap gap-1 items-center text-sm">
            <span className="text-default-400">
              ₦ {product.price.toLocaleString("en-gb")}/{product.size}
            </span>
          </div>
        </div>
      </div>

      {hidden && <ProductPopup {...product} closeFn={() => setHidden(false)} />}
    </>
  );
}

export default ProductCard;
