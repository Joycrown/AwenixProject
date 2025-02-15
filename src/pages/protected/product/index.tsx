// Product.tsx
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
      <div className="relative bg-default-500 rounded-xl min-h-[300px] md:min-h-[400px] flex items-stretch text-white overflow-hidden">
        <div className="flex flex-col max-md:gap-8 p-6 md:p-12 w-full capitalize relative z-10">
          <p className="text-sm font-medium">Awenix Nigeria Ltd</p>
          <h1 className="text-4xl md:text-5xl my-auto font-semibold">
            Customize your feed percentage
          </h1>
          <Link
            to="/account/home#categories"
            className="py-3 px-6 border-2 border-white w-fit flex items-center gap-2 rounded-lg hover:bg-white hover:text-default-500 transition-colors duration-200"
          >
            Explore Products
          </Link>
        </div>
        <div className="relative w-full flex items-end max-md:hidden">
          <img 
            src={chicks} 
            alt="Customize your feed percentage" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      <div className="space-y-8" id="products">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold">
            {query ? `Results for "${query}"` : "Our Products"}
          </h2>
          {query && (
            <button
              onClick={() => navigate('/products')}
              className="text-default-500 hover:text-default-700 font-medium"
            >
              Clear search
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-default-500 border-t-transparent" />
          </div>
        ) : products.length >= 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, id) => (
              <ProductCard key={id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <div className="text-6xl">😕</div>
            <p className="text-xl text-default-500">
              No products found{query && ` for "${query}"`}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Product;