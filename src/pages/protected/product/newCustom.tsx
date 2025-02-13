import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { grains } from "../../../assets";
import { useEffect, useState } from "react";
import { productProps } from "../../../utils/interface";
import { useAuthContext } from "../../../utils/authContext";
import LoadingScreen from "../../../components/loadingScreen";

const STORAGE_KEY = "custom_order_products";

interface CustomProduct {
  id: string;
  name: string;
  quantity: number;
  description?: string;
  isCustom: true;
}

interface StorageData {
  products: productProps[];
  customProducts: CustomProduct[];
}

function CustomOrder() {
  const { user } = useAuthContext();
  const [products, setProducts] = useState<productProps[]>([]);
  const [customProducts, setCustomProducts] = useState<CustomProduct[]>([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [newCustomProduct, setNewCustomProduct] = useState({
    name: "",
    quantity: 1,
    description: "kg"
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageMax = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;
    setLoading(true);

    // Load and validate storage data
    const savedData = localStorage.getItem(STORAGE_KEY);
    let savedStorageData: StorageData | null = null;
    
    try {
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Validate the structure of the parsed data
        if (parsedData && Array.isArray(parsedData.products) && Array.isArray(parsedData.customProducts)) {
          savedStorageData = parsedData;
        }
      }
    } catch (error) {
      console.error('Error parsing storage data:', error);
    }

    axios
      .get(`${endpoint}/products?search=`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        // Set regular products with proper fallback
        setProducts(() =>
          res.data.map((data: productProps) => {
            const savedProduct = savedStorageData?.products?.find(
              (p: productProps) => p.id === data.id
            );
            
            return {
              ...data,
              quantity: savedProduct?.quantity ?? 1,
              hidden: savedProduct?.hidden ?? true,
            };
          })
        );

        // Set custom products with proper fallback
        setCustomProducts(savedStorageData?.customProducts ?? []);
        
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, [user]);

  // Save to localStorage with validation
  useEffect(() => {
    if (products.length > 0 || customProducts.length > 0) {
      try {
        const storageData: StorageData = {
          products: products.map(product => ({
            ...product,
            quantity: product.quantity || 1,
            hidden: product.hidden ?? true,
          })),
          customProducts
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
      } catch (error) {
        console.error('Error saving to storage:', error);
      }
    }
  }, [products, customProducts]);

  const changeQuantity = (currentValue: string, id: number) => {
    const valueConstruct = parseInt(currentValue) <= 1 ? 1 : parseInt(currentValue);
    setProducts((prev) =>
      prev.map((value, key) =>
        key === id ? { ...value, quantity: valueConstruct } : value
      )
    );
  };

  const changeCustomQuantity = (currentValue: string, id: string) => {
    const valueConstruct = parseInt(currentValue) <= 1 ? 1 : parseInt(currentValue);
    setCustomProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, quantity: valueConstruct } : product
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

  const addCustomProduct = () => {
    if (newCustomProduct.name.trim()) {
      setCustomProducts((prev) => [
        ...prev,
        {
          ...newCustomProduct,
          id: `custom-${Date.now()}`,
          isCustom: true
        },
      ]);
      setNewCustomProduct({ name: "", quantity: 1, description: "" });
      setShowCustomForm(false);
    }
  };

  const removeCustomProduct = (id: string) => {
    setCustomProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const headToCart = () => {
    const regularProducts = products.filter(
      ({ hidden, quantity }) => hidden === false && quantity >= 1
    );
    
    const allProducts = {
      regular: regularProducts,
      custom: customProducts
    };
  
    const queryString = `?product=${encodeURIComponent(JSON.stringify(allProducts))}&isMilling=true`;
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
              Customize your order and build up your mix from the selections
              below
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-4 border-b-2 pb-3">
              <h4 className="font-medium">Select your mains</h4>
              <p>
                Remove unwanted products and add desired products to your order or <b>add an additional product if and when needed.</b>
              </p>
                {/* Custom Products Section */}
              <div className="mt-8 space-y-6 border-t-2 pt-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Additional Products</h4>
                  {!showCustomForm && (
                    <button
                      onClick={() => setShowCustomForm(true)}
                      className="font-medium px-3 py-2 bg-default-500 text-white rounded"
                    >
                      Add New Product
                    </button>
                  )}
                </div>

                {showCustomForm && (
                  <div className="p-4 rounded space-y-4">
                    <div className="space-y-2">
                      <label className="block">Product Name</label>
                      <input
                        type="text"
                        value={newCustomProduct.name}
                        onChange={(e) =>
                          setNewCustomProduct((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full border border-default-700 px-3 py-2 rounded"
                        placeholder="Enter product name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block">Quantity (kg)</label>
                      <input
                        type="number"
                        value={newCustomProduct.quantity}
                        onChange={(e) =>
                          setNewCustomProduct((prev) => ({
                            ...prev,
                            quantity: parseInt(e.target.value) || 1,
                          }))
                        }
                        className="w-full border border-default-700 px-3 py-2 rounded"
                        min="1"
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setShowCustomForm(false)}
                        className="px-3 py-2 border border-default-500 text-default-500 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={addCustomProduct}
                        className="px-3 py-2 bg-default-500 text-white rounded"
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                )}

                {customProducts.length > 0 && (
                  <div className="space-y-4">
                    {customProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between md:min-w-[400px] p-4 rounded"
                      >
                        <div className="space-y-1">
                          <span className="font-medium">{product.name}</span>
                          {product.description && (
                            <p className="text-default-600 text-xs">
                              {product.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <input
                              className="border border-default-700 px-3 py-2 rounded max-w-20"
                              value={product.quantity}
                              onChange={(e) =>
                                changeCustomQuantity(e.target.value, product.id)
                              }
                              type="number"
                              min="1"
                            />
                            <span>kg</span>
                          </div>
                          <button
                            onClick={() => removeCustomProduct(product.id)}
                            className="font-medium px-3 py-2 bg-default-500 text-white rounded"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
                              <div className="flex items-center gap-2">
                                <input
                                  className="border border-default-700 px-3 py-2 rounded max-w-20"
                                  value={quantity}
                                  onChange={(e) =>
                                    changeQuantity(e.target.value, id)
                                  }
                                  maxLength={4}
                                  type="number"
                                />
                                <span>kg</span>
                              </div>
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