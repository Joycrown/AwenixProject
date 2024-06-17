import { useState } from "react";
import { MdClose } from "react-icons/md";
import { productProps } from "../utils/interface";
import { useNavigate } from "react-router-dom";

interface productPopProps extends Omit<productProps, "quantity" | "image"> {}

function ProductPopup(props: productPopProps) {
  const { price, name, description, closeFn } = props;
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const removeQuantity = () => {
    if (quantity <= 0) return;
    setQuantity((prev) => prev - 1);
  };

  const addQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const changeQuantity = (value: string) => {
    if (value === "") {
      setQuantity(0);
      return;
    }
    const digit = parseInt(value.replace(/\D/g, ""));
    const valueConstruct = digit <= 1 ? 1 : digit;

    setQuantity(valueConstruct);
  };

  const headToCart = () => {
    if (quantity === 0) return;
    const queryString = `?product=${encodeURIComponent(
      JSON.stringify([{ price, name, description, quantity }])
    )}`;

    navigate(`/account/cart${queryString}`);
  };

  return (
    <div className="fixed w-full h-screen left-0 top-0 flex items-center justify-center z-50">
      <div
        onClick={closeFn}
        className="absolute w-full h-full bg-black bg-opacity-70 cursor-pointer"
      />
      <div className="relative py-8 px-6 bg-white rounded max-w-sm">
        <MdClose
          size="1.2rem"
          onClick={closeFn}
          className="absolute right-3 top-3 cursor-pointer"
        />
        <div className="pb-3 border-b border-black space-y-2">
          <h4 className="capitalize font-medium">{name}</h4>
          <p className="text-sm">{description}</p>
        </div>
        <p className="py-4 text-sm">+₦ {price}/kg</p>

        <div className="flex gap-3">
          <div className="flex">
            <div
              onClick={removeQuantity}
              className="py-2 px-4 cursor-pointer select-none border rounded-l active:bg-default-500 active:text-white"
            >
              -
            </div>
            <input
              type="tel"
              maxLength={4}
              value={quantity}
              onChange={(e) => changeQuantity(e.target.value)}
              className="border-t border-b outline-none text-center max-w-16"
            />
            <div
              onClick={addQuantity}
              className="py-2 px-4 cursor-pointer select-none border rounded-r active:bg-default-500 active:text-white"
            >
              +
            </div>
          </div>
          <div
            onClick={headToCart}
            className="bg-default-500 text-white py-3 px-4 cursor-pointer rounded text-xs"
          >
            Continue process
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPopup;
