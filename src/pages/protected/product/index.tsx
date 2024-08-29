import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../../components/productCard";
import { useAuthContext } from "../../../utils/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { chicks } from "../../../assets";

function Product() {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;
    const params = new URLSearchParams(location.search).get("q");

    if (params) {
      setQuery(params);
    }

    setLoading(true);

    axios
      .get(`${endpoint}/products?search=${params}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [user, location, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 400, behavior: "smooth" });
  }, [query]);

  return (
    <section className="max-w-[1200px] w-[95%] mx-auto space-y-8 pt-8 pb-16">
      <div className="relative bg-default-500 rounded-md min-h-[300px] md:min-h-[400px] !flex items-stretch text-white">
        <div className="flex flex-col max-md:gap-8 p-6 md:p-12 w-full capitalize relative z-10">
          <p>Awenix Nigeria Ltd</p>
          <span className="text-4xl md:text-5xl my-auto">
            Customize your feed percentage
          </span>
          <Link
            to="/account/home#categories"
            className="py-3 px-6 border-2 border-white w-fit flex items-center gap-2"
          >
            Explore
          </Link>
        </div>
        <div className="relative w-full flex items-end">
          <img src={chicks} alt="Customize your feed percentage" />
        </div>
      </div>

      <div className="space-y-4" id="products">
        <h4 className="font-medium text-2xl">
          {query
            ? `Showing all results for ${query}`
            : "Explore all our products"}
        </h4>
        {loading ? (
          <p>Loading... </p>
        ) : products.length >= 1 ? (
          <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {products.map((product, id) => (
              <ProductCard key={id} product={product} />
            ))}
          </div>
        ) : (
          <p>No products available</p>
        )}
      </div>
    </section>
  );
}

export default Product;
