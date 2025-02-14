// Cart.tsx
import { useEffect, useState } from "react";
import { productProps } from "../../../utils/interface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../utils/authContext";
import LoadingScreen from "../../../components/loadingScreen";

interface CustomProduct {
  id: number;
  name: string;
  quantity: number;
  size: string;
  hidden: boolean;
  isCustom: boolean;
}

interface Service {
  id: number;
  name: string;
  price: number;
  selected: boolean;
}

type CartItem = productProps | CustomProduct;

// Intersection type to allow a CartItem to optionally have services.
type ProductWithServices = CartItem & {
  services?: Service[];
};

function Cart() {
  const { user } = useAuthContext();
  const [cartItems, setCartItems] = useState<ProductWithServices[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productParam = params.get("product");

    if (productParam) {
      const products = JSON.parse(decodeURIComponent(productParam));
      setCartItems(products);
    } else {
      navigate("/account/home");
    }
  }, [location, navigate]);

  // Allow user to update quantity freely (without forcing a minimum of 1)
  const changeQuantity = (currentValue: string, id: number) => {
    if (currentValue === "") return;
    const parsedValue = parseFloat(currentValue);
    if (isNaN(parsedValue)) return;
    setCartItems((prev) =>
      prev.map((item, key) =>
        key === id ? { ...item, quantity: parsedValue } : item
      )
    );
  };

  const updateCart = () => {
    navigate(`/account/products/custom-order`, { replace: true });
  };

  // Sum product subtotals (only for products with a price)
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      if ("price" in item) {
        return acc + item.price * item.quantity;
      }
      return acc;
    }, 0);
  };

  // Calculate the total quantity in KG.
  // If an item has size "bag", it contributes 25 KG per unit.
  const calculateTotalQuantityInKg = () => {
    return cartItems.reduce((acc, item) => {
      if ("size" in item && item.size.toLowerCase() === "bag") {
        return acc + item.quantity * 25;
      }
      return acc + item.quantity;
    }, 0);
  };

  // Retrieve the milling service from the products' services, if available.
  const getMillingService = (): Service | null => {
    for (const item of cartItems) {
      if (item.services) {
        const ms = item.services.find(
          (s) => s.name.toLowerCase().includes("milling") && s.selected
        );
        if (ms) return ms;
      }
    }
    return null;
  };

  // Calculate milling cost based on total quantity in KG.
  const calculateMillingCost = () => {
    const millingService = getMillingService();
    if (!millingService) return 0;
    const totalKg = calculateTotalQuantityInKg();
    return millingService.price * totalKg;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateMillingCost();
  };

  const totalMilling = calculateMillingCost();

  // Render each product row (without rendering service info inline)
  const renderCartItem = (item: ProductWithServices, id: number) => (
    <ul
      key={id}
      className="flex whitespace-nowrap items-center justify-between py-4 px-6 text-sm shadow rounded"
    >
      <li className="capitalize flex-1">{item.name}</li>
      <li className="flex-1">
        {"price" in item ? `₦ ${item.price.toLocaleString("en-gb")}` : "Custom Item"}
      </li>
      <li className="flex-1">
        <input
          className="border border-default-700 px-3 py-2 rounded max-w-20"
          value={item.quantity}
          onChange={(e) => changeQuantity(e.target.value, id)}
          type="number"
          step="any"
        />
      </li>
      <li className="flex-1 max-w-24">
        {"price" in item
          ? `₦ ${(item.price * item.quantity).toLocaleString("en-gb")}`
          : "N/A"}
      </li>
    </ul>
  );

  // Handler for checkout (unchanged)
  const checkout = () => {
    setLoading(true);
    const postData = cartItems.map((cart) => {
      if ("isCustom" in cart) {
        return {
          product_name: cart.name,
          quantity: cart.quantity,
          is_custom: true,
          size: cart.size,
        };
      }
      return {
        product_name: cart.name,
        quantity: cart.quantity,
      };
    });

    axios
      .post(
        `${endpoint}/orders`,
        { items: [...postData], miscellaneous: totalMilling },
        {
          data: { items: [...postData], miscellaneous: totalMilling },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        localStorage.removeItem("custom_order_products");
        localStorage.removeItem("custom_order_services");
        navigate(
          `/account/payment/payment-verification?orderId=${res.data.order_id}`
        );
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Failed to process order");
      });
  };

  return (
    <section className="max-w-[1200px] w-[95%] mx-auto space-y-12 pt-12 text-sm pb-16">
      {loading && <LoadingScreen />}
      <h4>
        <Link to="/account/home" className="text-default-700">
          Home
        </Link>{" "}
        / Cart
      </h4>

      <div className="space-y-4">
        {/* Table Header */}
        <ul className="flex whitespace-nowrap items-center justify-between py-4 px-6 text-sm shadow rounded">
          <li className="capitalize flex-1">Product</li>
          <li className="flex-1">Price</li>
          <li className="flex-1">Quantity</li>
          <li className="flex-1 max-w-24">Subtotal</li>
        </ul>

        <div className="space-y-3">
          {/* Render product rows */}
          {cartItems.map((item, id) => renderCartItem(item, id))}

          {/* Render Milling Service row once, if available */}
          {getMillingService() && (
            <ul className="flex whitespace-nowrap items-center justify-between py-4 px-6 text-sm shadow rounded">
              <li className="capitalize flex-1">
                {getMillingService()?.name || "Milling Service"}
              </li>
              <li className="flex-1">
                {`₦ ${getMillingService()!.price.toLocaleString("en-gb")}/kg`}
              </li>
              <li className="flex-1">
                {`${calculateTotalQuantityInKg().toFixed(2)} KG`}
              </li>
              <li className="flex-1 max-w-24">
                {`₦ ${calculateMillingCost().toLocaleString("en-gb", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
              </li>
            </ul>
          )}
        </div>

        <div className="flex justify-between">
          <Link
            className="border border-default-100 py-4 px-8 rounded"
            to="/account/home#products"
          >
            Return to shop
          </Link>
          <div
            onClick={updateCart}
            className="border border-default-100 py-4 px-8 rounded cursor-pointer"
          >
            Update cart
          </div>
        </div>

        {/* Total Breakdown */}
        <div className="ml-auto border-2 border-default-100 rounded px-4 py-6 max-w-sm space-y-2">
          <h5 className="font-medium">Cart Total</h5>
          <div className="flex justify-between border-b border-default-100 py-3">
            <span>Subtotal:</span>
            <span>₦ {calculateSubtotal().toLocaleString("en-gb")}</span>
          </div>
          <div className="flex justify-between border-b border-default-100 py-3">
            <span>Quantity (in KG):</span>
            <span>{calculateTotalQuantityInKg().toFixed(2)} KG</span>
          </div>
          <div className="flex justify-between border-b border-default-100 py-3">
            <span>Milling Cost:</span>
            <span>
              ₦{" "}
              {calculateMillingCost().toLocaleString("en-gb", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between py-3 font-medium">
            <span>Total:</span>
            <span>₦ {calculateTotal().toLocaleString("en-gb")}</span>
          </div>
          <div
            onClick={checkout}
            className="bg-default-500 text-white py-3 px-4 cursor-pointer rounded text-center mt-4"
          >
            Proceed to checkout
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
