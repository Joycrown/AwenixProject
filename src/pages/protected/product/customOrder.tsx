// CustomOrder.tsx
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { grains } from "../../../assets";
import { useEffect, useState } from "react";
import { productProps } from "../../../utils/interface";
import { useAuthContext } from "../../../utils/authContext";
import LoadingScreen from "../../../components/loadingScreen";

const STORAGE_KEY = "custom_order_products";
const SERVICES_STORAGE_KEY = "custom_order_services";

interface CustomProduct {
  id: number;
  name: string;
  quantity: number;
  displayValue?: string;  // Add this
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

type ProductListItem = (productProps & {
  quantity: number;
  displayValue?: string;  // Add this for handling intermediate input states
  hidden: boolean;
}) | CustomProduct;

// Interface for custom product form state
interface CustomProductForm {
  name: string;
  quantity: string;  // Keep as string for form input
}


function CustomOrder() {
  const { user } = useAuthContext();
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [showMillingDialog, setShowMillingDialog] = useState(false);
  const [customProduct, setCustomProduct] = useState<CustomProductForm>({
      name: "",
      quantity: "",
    });
  const pageMax = 8;
  const navigate = useNavigate();
  const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;

  useEffect(() => {
    setLoading(true);

    // Fetch milling service
    axios
      .get<Service>(`${endpoint}/services/name/milling`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        const savedServices = localStorage.getItem(SERVICES_STORAGE_KEY);
        if (savedServices) {
          const parsedServices = JSON.parse(savedServices);
          setServices([
            {
              ...res.data,
              selected: parsedServices.some(
                (s: Service) => s.id === res.data.id && s.selected === true
              ),
            },
          ]);
        } else {
          setServices([{ ...res.data, selected: false }]);
        }
      })
      .catch(console.error);

    // Then fetch products
    axios
      .get<productProps[]>(`${endpoint}/products?search=`, {
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
                "id" in p && p.id === data.id
              );
              return {
                ...data,
                quantity: savedProduct ? savedProduct.quantity : 1,
                hidden: savedProduct ? savedProduct.hidden : true,
              };
            }),
            ...parsedProducts.filter(
              (p: ProductListItem) => "isCustom" in p && p.isCustom
            ),
          ]);
        } else {
          setProducts(() =>
            res.data.map((data: productProps) => ({
              ...data,
              quantity: 0,
              displayValue: "",
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
  }, [user, endpoint]);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (services.length > 0) {
      localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
    }
  }, [services]);

  const addService = (serviceId: number) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === serviceId ? { ...service, selected: true } : service
      )
    );
    // Local storage will be updated by the useEffect.
  };

  const removeService = (serviceId: number) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === serviceId ? { ...service, selected: false } : service
      )
    );
  };

  // Helper function to validate and parse quantity
  const parseQuantity = (value: string): number | null => {
    if (!value) return null;
    if (!/^\d*\.?\d*$/.test(value)) return null;
    const parsed = parseFloat(value);
    if (isNaN(parsed) || parsed < 0) return null;
    return Math.round(parsed * 100) / 100;
  };


  const changeQuantity = (currentValue: string, id: number) => {
    // Calculate the actual index in the full products array
    const actualIndex = (page - 1) * pageMax + id;
    
    setProducts((prev) =>
      prev.map((value, index) => {
        if (index !== actualIndex) return value;
  
        // Always update the display value while typing
        const updatedProduct = { ...value, displayValue: currentValue };
  
        // If empty, set quantity to 0 but keep display value empty
        if (currentValue === "") {
          return { ...updatedProduct, quantity: 0 };
        }
  
        // Validate the input format
        if (!/^\d*\.?\d*$/.test(currentValue)) {
          return value;
        }
  
        // If it's just a decimal point after a number, keep the current quantity
        if (currentValue.endsWith('.')) {
          return updatedProduct;
        }
  
        const parsedValue = parseFloat(currentValue);
        if (!isNaN(parsedValue) && parsedValue >= 0) {
          return { ...updatedProduct, quantity: parsedValue };
        }
  
        return value;
      })
    );
  };

  const handleCustomQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  
  // More permissive validation that allows typing decimal points
  if (value === "" || /^\d*\.?\d*$/.test(value)) {
    setCustomProduct((prev) => ({
      ...prev,
      quantity: value,
    }));
  }
};

const addProduct = (id: number) => {
  // Calculate the actual index in the full products array
  const actualIndex = (page - 1) * pageMax + id;
  
  setProducts((prev) =>
    prev.map((value, index) =>
      index === actualIndex ? { ...value, hidden: false, quantity: 0, displayValue: "" } : value
    )
  );
};

// Update the removeProduct function
const removeProduct = (id: number) => {
  // Calculate the actual index in the full products array
  const actualIndex = (page - 1) * pageMax + id;
  
  setProducts((prev) =>
    prev.map((value, index) =>
      index === actualIndex ? { ...value, hidden: true, quantity: 0, displayValue: "" } : value
    )
  );
};

  const addCustomProduct = () => {
    if (customProduct.name.trim()) {
      const parsedQuantity = parseQuantity(customProduct.quantity) ?? 1;

      const newCustomProduct: CustomProduct = {
        id: Date.now(),
        name: customProduct.name,
        quantity: parsedQuantity,
        size: "kg",
        hidden: false,
        isCustom: true,
      };

      setProducts((prev) => [...prev, newCustomProduct]);
      setCustomProduct({ name: "", quantity: "" });
      setShowCustomForm(false);
    }
  };

  // proceedToCart accepts an optional updatedServices array.
  const proceedToCart = (updatedServices?: Service[]) => {
    const list = products.filter(
      ({ hidden, quantity }) => hidden === false && quantity >= 1
    );
    const selectedServices = (updatedServices || services).filter(
      (s) => s.selected
    );

    // Attach the selected services to each product.
    const productsWithServices = list.map((product) => ({
      ...product,
      services: selectedServices,
    }));

    const queryString = `?product=${encodeURIComponent(
      JSON.stringify(productsWithServices)
    )}`;
    navigate(`/account/cart${queryString}`);
  };

  const headToCart = () => {
    const millingService = services.find((s) =>
      s.name.toLowerCase().includes("milling")
    );
    const isMilling = millingService?.selected ?? false;
    const hasProducts = products.some((p) => !p.hidden);

    if (!hasProducts) {
      toast.error("Please select at least one product");
      return;
    }

    // If milling service is not selected, show the modal.
    if (!isMilling) {
      setShowMillingDialog(true);
      return;
    }

    proceedToCart();
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

          {/* Products Section */}
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
                    type="text"
                    value={customProduct.quantity}
                    onChange={handleCustomQuantityChange}
                    className="border border-default-700 px-3 py-2 rounded w-full"
                    placeholder="0"
                  />
                </div>
                <button
                  onClick={addCustomProduct}
                  className="bg-default-500 text-white px-4 py-2 rounded"
                  disabled={
                    !customProduct.name.trim() ||
                    customProduct.quantity === "0" ||
                    customProduct.quantity === ""
                  }
                >
                  Add
                </button>
              </div>
            )}

            {/* Services Section */}
            <div className="space-y-4">
              {services.length >= 1 ? (
                <div className="flex flex-col gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between md:min-w-[400px]"
                    >
                      <span className="flex gap-3 items-center">
                        <span className="capitalize">{service.name}</span>
                        <span>
                          ₦{service.price.toLocaleString("en-gb")}/kg
                        </span>
                      </span>
                      <div className="flex items-center gap-4">
                        {!service.selected ? (
                          <span
                            onClick={() => addService(service.id)}
                            className="font-medium cursor-pointer px-3 py-2 bg-default-500 text-white rounded"
                          >
                            Add Service
                          </span>
                        ) : (
                          <span
                            onClick={() => removeService(service.id)}
                            className="font-medium cursor-pointer px-3 py-2 bg-default-500 text-white rounded"
                          >
                            Remove
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center">No services available</p>
              )}
            </div>

            {/* Products List */}
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
                        <span className="capitalize truncate">
                          {product.name}
                        </span>
                        {!("isCustom" in product) && (
                          <span>
                            +₦ {product.price.toLocaleString("en-gb")}/
                            {product.size}
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
                              value={product.displayValue ?? product.quantity.toString()}
                              onChange={(e) => changeQuantity(e.target.value, id)}
                              type="text"
                              inputMode="decimal"
                              pattern="\d*\.?\d*"
                              placeholder="0"
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
                  onClick={() =>
                    setPage((prev) => (prev !== 1 ? prev - 1 : 1))
                  }
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

      {/* Milling Service Modal */}
      {showMillingDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">
              Add Milling Service?
            </h3>
            <p className="text-gray-600 mb-4">
              We noticed you haven't selected the milling service. Would you
              like to add milling service to your order? This service helps
              process your grains properly.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowMillingDialog(false);
                  proceedToCart();
                }}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                No, proceed without milling
              </button>
              <button
                onClick={() => {
                  // Compute the updated services array with milling selected.
                  const updatedServices = services.map((s) =>
                    s.name.toLowerCase().includes("milling")
                      ? { ...s, selected: true }
                      : s
                  );
                  // Persist updated services immediately.
                  localStorage.setItem(
                    SERVICES_STORAGE_KEY,
                    JSON.stringify(updatedServices)
                  );
                  setServices(updatedServices);
                  setShowMillingDialog(false);
                  proceedToCart(updatedServices);
                }}
                className="px-4 py-2 bg-default-500 text-white rounded hover:bg-default-600"
              >
                Yes, add milling service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CustomOrder;
