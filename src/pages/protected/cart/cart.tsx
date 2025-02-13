/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { productProps } from "../../../utils/interface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../utils/authContext";
import LoadingScreen from "../../../components/loadingScreen";

// Interface for custom products
interface CustomProduct {
  id: number;
  name: string;
  quantity: number;
  size: string;
  hidden: boolean;
  isCustom: boolean;
}

// Union type for cart items
type CartItem = productProps | CustomProduct;

function Cart() {
  const { user } = useAuthContext();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [millingPrice, setMillingPrice] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  

  const searchParams = new URLSearchParams(location.search);  
  const isMilling = searchParams.get('isMilling') === 'true';
  const tags = ["product", "price", "quantity", "subtotal"];

const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;

  useEffect(() => {
    const fetchMillingPrice = async () => {
      if (isMilling) {
        try {
          const response = await axios.get(`${endpoint}/services/name/milling`, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          });
          setMillingPrice(response.data.price);
        } catch (error: any) {
          console.error('Error fetching milling price:', error);
          toast.error('Error fetching milling price');
          setMillingPrice(0);
        }
      }
    };

    fetchMillingPrice();
  }, [isMilling, user]);

  useEffect(() => {
    const params = new URLSearchParams(location.search).get("product");
    
    if (params) {
      const product = JSON.parse(decodeURIComponent(params));
      setCartItems(product);
    } else {
      navigate("/account/home");
    }
  }, [location, navigate]);

  const changeQuantity = (currentValue: string, id: number) => {
    if (currentValue === "") {
      return;
    }

    const valueConstruct = parseInt(currentValue) <= 1 ? 1 : parseInt(currentValue);
    setCartItems((prev) =>
      prev.map((value, key) =>
        key === id ? { ...value, quantity: valueConstruct } : value
      )
    );
  };

  const updateCart = () => {
    navigate(`/account/products/custom-order`, { replace: true });
  };
  const millingCost = isMilling ? millingPrice : 0;
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      if ('price' in item) {
        return acc + item.price * item.quantity;
      }
      return acc;
    }, 0);
  };

  const calculateTotalQuantityInKg = () => {
    return cartItems.reduce((acc, item) => {
      const quantity = item.quantity;
      if ('size' in item && item.size.toLowerCase() === "bag") {
        return acc + (25 * quantity);
      }
      return acc + quantity;
    }, 0);
  };

  const calculateMillingCost = () => {
    const totalKg = calculateTotalQuantityInKg();
    return millingCost * Math.ceil(totalKg / 10);
  };

  const calculateTotal = () => {
    return calculateMillingCost() + calculateSubtotal();
  };

  

  const checkout = () => {
    setLoading(true);
    const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;
    const postData = cartItems.map((cart) => {
      if ('isCustom' in cart) {
        return {
          product_name: cart.name,
          quantity: cart.quantity,
          is_custom: true,
          size: cart.size
        };
      }
      return {
        product_name: cart.name,
        quantity: cart.quantity
      };
    });

    const totalMilling = calculateMillingCost();

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
        localStorage.removeItem('custom_order_products');
        localStorage.removeItem('isMilling');
        navigate(
          `/account/payment/payment-verification?orderId=${res.data.order_id}`
        );
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
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
        <ul className="flex whitespace-nowrap items-center justify-between py-4 px-6 text-sm shadow rounded">
          {tags.map((tag) => (
            <li
              key={tag}
              className={`capitalize flex-1 ${
                tag === "subtotal" ? "max-w-24" : null
              }`}
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="space-y-3">
          {cartItems.map((item, id) => (
            <ul
              key={id}
              className="flex whitespace-nowrap items-center justify-between py-4 px-6 text-sm shadow rounded"
            >
              <li className="capitalize flex-1">{item.name}</li>
              <li className="flex-1">
                {'price' in item ? `₦ ${item.price.toLocaleString("en-gb")}` : 'Custom Item'}
              </li>
              <li className="flex-1">
                <input
                  className="border border-default-700 px-3 py-2 rounded max-w-20"
                  value={item.quantity}
                  onChange={(e) => changeQuantity(e.target.value, id)}
                  maxLength={4}
                  type="number"
                />
              </li>
              <li className="flex-1 max-w-24">
                {'price' in item ? 
                  `₦ ${(item.price * item.quantity).toLocaleString("en-gb")}` : 
                  'N/A'
                }
              </li>
            </ul>
          ))}
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

        <div className="ml-auto border-2 border-default-100 rounded px-4 py-6 max-w-sm space-y-2">
          <h5 className="font-medium">Cart Total</h5>
          <div>
            <div className="flex justify-between border-b border-default-100 py-3">
              <span>Subtotal:</span>
              <span>
                ₦ {calculateSubtotal().toLocaleString("en-gb")}
              </span>
            </div>
            <div className="flex justify-between border-b border-default-100 py-3">
              <span>Quantity (in KG): </span>
              <span>
                {calculateTotalQuantityInKg()} KG
              </span>
            </div>
            <div className="flex justify-between border-b border-default-100 py-3">
              <span>Milling:</span>
              <span>
                ₦ {calculateMillingCost().toLocaleString("en-gb")}
              </span>
            </div>

            <div className="flex justify-between py-3">
              <span>Total:</span>
              <span>
                ₦ {calculateTotal().toLocaleString("en-gb")}
              </span>
            </div>

            <div
              onClick={checkout}
              className="bg-default-500 text-white py-3 px-4 cursor-pointer rounded text-center"
            >
              Proceed to checkout
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;