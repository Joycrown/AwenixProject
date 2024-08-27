import { useEffect, useState } from "react";
import { productProps } from "../../../utils/interface";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../../utils/authContext";
import LoadingScreen from "../../../components/loadingScreen";

function Cart() {
  const { user } = useAuthContext();
  const [cartItems, setCartItems] = useState<productProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMilling, setIsMilling] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const tags = ["product", "price", "quantity", "subtotal"];

  useEffect(() => {
    const params = new URLSearchParams(location.search).get("product");
    setIsMilling(location.state?.isMilling ? 1000 : 0);
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

    const valueConstruct =
      parseInt(currentValue) <= 1 ? 1 : parseInt(currentValue);
    setCartItems((prev) =>
      prev.map((value, key) =>
        key === id ? { ...value, quantity: valueConstruct } : value
      )
    );
  };

  const updateCart = () => {
    const queryString = `?product=${encodeURIComponent(
      JSON.stringify(cartItems)
    )}`;

    navigate(`/account/cart${queryString}`, { replace: true });
  };

  const checkout = () => {
    setLoading(true);
    const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;
    const postData = cartItems.map((cart) => ({
      product_name: cart.name,
      quantity: cart.quantity,
    }));

    const totalMilling =
      isMilling *
      Math.ceil(
        cartItems.reduce(
          (acc, cart) =>
            acc +
            (cart.size.toLowerCase() === "bag"
              ? 25 * cart.quantity
              : cart.quantity),
          0
        ) / 10
      );

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
        navigate(
          `/account/payment/payment-status?orderId=${res.data.order_id}`
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
          {cartItems.map(
            ({ price, quantity, name }: productProps, id: number) => (
              <ul
                key={name}
                className="flex whitespace-nowrap items-center justify-between py-4 px-6 text-sm shadow rounded"
              >
                <li className="capitalize flex-1">{name}</li>
                <li className="flex-1">₦ {price.toLocaleString("en-gb")}</li>
                <li className="flex-1">
                  <input
                    className="border border-default-700 px-3 py-2 rounded max-w-20"
                    value={quantity}
                    onChange={(e) => changeQuantity(e.target.value, id)}
                    maxLength={4}
                    type="number"
                  />
                </li>
                <li className="flex-1 max-w-24">
                  ₦ {(price * quantity).toLocaleString("en-gb")}
                </li>
              </ul>
            )
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

        <div className="ml-auto border-2 border-default-100 rounded px-4 py-6 max-w-sm space-y-2">
          <h5 className="font-medium">Cart Total</h5>
          <div>
            <div className="flex justify-between border-b border-default-100 py-3">
              <span>Subtotal:</span>
              <span>
                ₦{" "}
                {cartItems
                  .reduce((acc, cart) => acc + cart.price * cart.quantity, 0)
                  .toLocaleString("en-gb")}
              </span>
            </div>
            <div className="flex justify-between border-b border-default-100 py-3">
              <span>Quantity (in KG): </span>
              <span>
                {cartItems.reduce(
                  (acc, cart) =>
                    acc +
                    (cart.size.toLowerCase() === "bag"
                      ? 25 * cart.quantity
                      : cart.quantity),
                  0
                )}{" "}
                KG
              </span>
            </div>
            <div className="flex justify-between border-b border-default-100 py-3">
              <span>Milling:</span>
              <span>
                ₦{" "}
                {(
                  isMilling *
                  Math.ceil(
                    cartItems.reduce(
                      (acc, cart) =>
                        acc +
                        (cart.size.toLowerCase() === "bag"
                          ? 25 * cart.quantity
                          : cart.quantity),
                      0
                    ) / 10
                  )
                ).toLocaleString("en-gb")}
              </span>
            </div>

            <div className="flex justify-between py-3">
              <span>Total:</span>
              <span>
                ₦{" "}
                {(
                  isMilling *
                    Math.ceil(
                      cartItems.reduce(
                        (acc, cart) =>
                          acc +
                          (cart.size.toLowerCase() === "bag"
                            ? 25 * cart.quantity
                            : cart.quantity),
                        0
                      ) / 10
                    ) +
                  cartItems.reduce(
                    (acc, cart) => acc + cart.price * cart.quantity,
                    0
                  )
                ).toLocaleString("en-gb")}
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
