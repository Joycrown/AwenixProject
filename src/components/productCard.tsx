// ProductCard.tsx
import { useState } from "react";
import ProductPopup from "./productPopup";
import { productProps } from "../utils/interface";

interface productExtendProps extends Omit<productProps, "quantity"> {}
interface productCardProps {
  product: productExtendProps;
}

function ProductCard({ product }: productCardProps) {
  const [hidden, setHidden] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <div
        className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
        onClick={() => setHidden(true)}
      >
        <div className="aspect-square bg-gray-50 relative overflow-hidden">
          {product.product_image && !imageError ? (
            <img 
              src={product.product_image}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
              loading="lazy"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm">No image available</span>
            </div>
          )}
        </div>
        
        <div className="p-4 space-y-2">
          <h4 className="font-medium text-lg capitalize truncate">
            {product.name}
          </h4>
          <div className="flex items-center justify-between">
            <span className="text-default-600 text-sm">
              per {product.size}
            </span>
            <span className="font-semibold text-default-900">
              ₦{product.price.toLocaleString("en-gb")}
            </span>
          </div>
        </div>
      </div>

      {hidden && <ProductPopup {...product} closeFn={() => setHidden(false)} />}
    </>
  );
}

export default ProductCard;