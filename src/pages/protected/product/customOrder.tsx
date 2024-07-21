import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { grains } from "../../../assets";
import { useEffect, useState } from "react";
import { productProps } from "../../../utils/interface";
import { useAuthContext } from "../../../utils/authContext";
import LoadingScreen from "../../../components/loadingScreen";

function CustomOrder() {
  const { user } = useAuthContext();
  const [products, setProducts] = useState<productProps[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageMax = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;
    setLoading(true);

    axios
      .get(`${endpoint}/products?search=`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setProducts(() =>
          res.data.map((data: productProps) => ({
            ...data,
            quantity: 1,
            hidden: false,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, [user]);

  const changeQuantity = (currentValue: string, id: number) => {
    // if (currentValue === "") {
    //   return;
    // }

    const valueConstruct =
      parseInt(currentValue) <= 1 ? 1 : parseInt(currentValue);

    setProducts((prev) =>
      prev.map((value, key) =>
        key === id ? { ...value, quantity: valueConstruct } : value
      )
    );
  };

  const addProduct = (id: number) => {
    setProducts((prev) =>
      prev.map((value, key) =>
        key === id ? { ...value, hidden: false, quantity: 1 } : value
      )
    );
  };

  const removeProduct = (id: number) => {
    setProducts((prev) =>
      prev.map((value, key) =>
        key === id ? { ...value, hidden: true, quantity: 1 } : value
      )
    );
  };

  const headToCart = () => {
    const list = products.filter(
      ({ hidden, quantity }) => hidden === false && quantity >= 1
    );

    const queryString = `?product=${encodeURIComponent(JSON.stringify(list))}`;

    navigate(`/account/cart${queryString}`, { state: { isMilling: true } });
  };

  return (
    <section className="max-w-[1200px] w-[95%] mx-auto space-y-12 pt-12 text-sm pb-16">
      {loading && <LoadingScreen />}
      <h4>
        <Link to="/account/home" className="text-default-700">
          Home
        </Link>{" "}
        / Custom Order
      </h4>

      <div className="flex gap-8 max-md:flex-col">
        <div className="bg-default-300 bg-opacity-10 py-16">
          <img src={grains} alt="custom order" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-4 border-b-2 pb-8">
            <h4 className="text-2xl font-medium">Custom Order</h4>
            <p>
              Customize your order and build up your mix from the selections
              below
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Select your mains</h4>
              <p>
                Remove unwanted products and add desired products to your order.
              </p>
            </div>
            {products.length >= 1 ? (
              <div className="flex flex-col gap-4">
                {products
                  .slice(page * pageMax - pageMax, page * pageMax)
                  .map(
                    (
                      { name, price, size, quantity, hidden }: productProps,
                      id
                    ) => (
                      <div
                        key={id}
                        className="flex items-center justify-between md:min-w-[400px]"
                      >
                        <span className="flex gap-3 items-center">
                          <span className="capitalize truncate">{name}</span> +₦{" "}
                          {price.toLocaleString("en-gb")}/{size}
                        </span>
                        <div className="flex items-center gap-4">
                          {hidden ? (
                            <span
                              onClick={() => addProduct(id)}
                              className="font-medium cursor-pointer px-3 py-2 bg-default-500 text-white rounded"
                            >
                              Add product
                            </span>
                          ) : (
                            <>
                              <input
                                className="border border-default-700 px-3 py-2 rounded max-w-20"
                                value={quantity}
                                onChange={(e) =>
                                  changeQuantity(e.target.value, id)
                                }
                                // min={1}
                                maxLength={4}
                                type="number"
                              />
                              <span
                                onClick={() => removeProduct(id)}
                                className="font-medium cursor-pointer px-3 py-2 bg-default-500 text-white rounded"
                              >
                                Remove
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  )}
              </div>
            ) : (
              <p className="text-center">No products available</p>
            )}
            <div className="flex justify-between">
              {page > 1 && (
                <span
                  onClick={() => setPage((prev) => (prev !== 1 ? prev - 1 : 1))}
                  className="underline underline-offset-8 cursor-pointer"
                >
                  &lt;&lt; Previous
                </span>
              )}

              {products.length > page * pageMax && (
                <span
                  onClick={() =>
                    setPage((prev) =>
                      products.length > prev * pageMax ? prev + 1 : prev
                    )
                  }
                  className="underline underline-offset-8 cursor-pointer ml-auto"
                >
                  Next &gt;&gt;
                </span>
              )}
            </div>
          </div>

          <div
            onClick={headToCart}
            className="bg-default-500 text-white py-3 px-4 cursor-pointer rounded text-center w-fit ml-auto mt-auto"
          >
            Continue Process
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomOrder;
