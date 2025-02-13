import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { grains } from "../../../assets";
import { useEffect, useState } from "react";
import { productProps } from "../../../utils/interface";
import { useAuthContext } from "../../../utils/authContext";
import LoadingScreen from "../../../components/loadingScreen";

const STORAGE_KEY = "custom_order_products";

// Separate interface for custom products
interface CustomProduct {
  id: number;
  name: string;
  quantity: number;
  size: string;
  hidden: boolean;
  isCustom: boolean;
}

// Union type for all product types in our list
type ProductListItem = productProps | CustomProduct;

function CustomOrder() {
  const { user } = useAuthContext();
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customProduct, setCustomProduct] = useState({
    name: "",
    quantity: "",
  });
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
        const savedProducts = localStorage.getItem(STORAGE_KEY);
        if (savedProducts) {
          const parsedProducts = JSON.parse(savedProducts);
          setProducts(() => [
            ...res.data.map((data: productProps) => {
              const savedProduct = parsedProducts.find((p: ProductListItem) => 
                'id' in p && p.id === data.id
              );
              return {
                ...data,
                quantity: savedProduct ? savedProduct.quantity : 1,
                hidden: savedProduct ? savedProduct.hidden : true,
              };
            }),
            ...parsedProducts.filter((p: ProductListItem) => 
              'isCustom' in p && p.isCustom
            ),
          ]);
        } else {
          setProducts(() =>
            res.data.map((data: productProps) => ({
              ...data,
              quantity: 1,
              hidden: true,
            }))
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, [user]);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products]);

  const changeQuantity = (currentValue: string, id: number) => {
    const valueConstruct = parseInt(currentValue) <= 1 ? 1 : parseInt(currentValue);

    setProducts((prev) =>
      prev.map((value, index) =>
        index === id ? { ...value, quantity: valueConstruct } : value
      )
    );
  };
  const handleCustomQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string or valid numbers
    if (value === "" || /^\d+$/.test(value)) {
      setCustomProduct(prev => ({
        ...prev,
        quantity: value
      }));
    }
  };

  const addProduct = (id: number) => {
    setProducts((prev) =>
      prev.map((value, index) =>
        index === id ? { ...value, hidden: false, quantity: 1 } : value
      )
    );
  };

  const removeProduct = (id: number) => {
    setProducts((prev) =>
      prev.map((value, index) =>
        index === id ? { ...value, hidden: true, quantity: 1 } : value
      )
    );
  };

  const addCustomProduct = () => {
    if (customProduct.name.trim()) {
      const newCustomProduct: CustomProduct = {
        id: Date.now(),
        name: customProduct.name,
        quantity: customProduct.quantity === "" ? 1 : parseInt(customProduct.quantity), // Default to 1 if empty
        size: "kg",
        hidden: false,
        isCustom: true,
      };

      setProducts((prev) => [...prev, newCustomProduct]);
      setCustomProduct({ name: "", quantity: "" }); // Reset to empty string
      setShowCustomForm(false);
    }
  };

  const headToCart = () => {
    const list = products.filter(
      ({ hidden, quantity }) => hidden === false && quantity >= 1
    );
    const queryString = `?product=${encodeURIComponent(
      JSON.stringify(list)
    )}&isMilling=true`;
    navigate(`/account/cart${queryString}`);
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
              Customize your order and build up your mix from the selections below
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Select your mains</h4>
              <p>
                Remove unwanted products and add desired products to your order or{" "}
                <b>add an additional product if and when needed.</b>
              </p>
              <button
                onClick={() => setShowCustomForm(!showCustomForm)}
                className="bg-default-500 text-white px-4 py-2 rounded"
              >
                {showCustomForm ? "Cancel" : "Add Custom Product"}
              </button>
            </div>

            {showCustomForm && (
              <div className="flex gap-4 items-end border-b pb-4">
                <div className="flex-1">
                  <label className="block mb-2">Product Name</label>
                  <input
                    type="text"
                    value={customProduct.name}
                    onChange={(e) =>
                      setCustomProduct((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="border border-default-700 px-3 py-2 rounded w-full"
                    placeholder="Enter product name"
                  />
                </div>
                <div className="w-24">
                  <label className="block mb-2">Quantity (KG)</label>
                  <input
                    type="text" // Changed from "number" to "text" for better control
                    value={customProduct.quantity}
                    onChange={handleCustomQuantityChange}
                    className="border border-default-700 px-3 py-2 rounded w-full"
                    placeholder="0"
                  />
                </div>
                <button
                  onClick={addCustomProduct}
                  className="bg-default-500 text-white px-4 py-2 rounded"
                  disabled={!customProduct.name.trim() || customProduct.quantity === "0" || customProduct.quantity === ""}
                >
                  Add
                </button>
              </div>
            )}

            {products.length >= 1 ? (
              <div className="flex flex-col gap-4">
                {products
                  .slice(page * pageMax - pageMax, page * pageMax)
                  .map((product, id) => (
                    <div
                      key={id}
                      className="flex items-center justify-between md:min-w-[400px]"
                    >
                      <span className="flex gap-3 items-center">
                        <span className="capitalize truncate">{product.name}</span>
                        {!('isCustom' in product) && (
                          <span>
                            +₦ {product.price.toLocaleString("en-gb")}/{product.size}
                          </span>
                        )}
                      </span>
                      <div className="flex items-center gap-4">
                        {product.hidden ? (
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
                              value={product.quantity}
                              onChange={(e) => changeQuantity(e.target.value, id)}
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
                  ))}
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