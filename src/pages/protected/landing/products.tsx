import axios from "axios";
import { useEffect, useState } from "react";
import SectionHead from "../../../components/sectionHead";
import ProductCard from "../../../components/productCard";
import { useAuthContext } from "../../../utils/authContext";

function ProductSection() {
  const { user } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [sliced, setSliced] = useState(true);

  useEffect(() => {
    const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;

    axios
      .get(`${endpoint}/products?search=`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <section id="products" className="space-y-4">
      <SectionHead name="our products" position="left" />
      <h3 className="font-medium">Explore Our Products</h3>
      {products.length >= 1 ? (
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products
            .slice(0, sliced ? 8 : products.length)
            .map((product, id) => (
              <ProductCard key={id} product={product} />
            ))}
        </div>
      ) : (
        <p className="text-center">No products available</p>
      )}

      <div
        onClick={() =>
          products.length > 8 ? setSliced((prev) => !prev) : null
        }
        className="py-3 px-6 bg-default-500 text-white mx-auto w-fit rounded block capitalize cursor-pointer"
      >
        {sliced ? "View all products" : "View less products"}
      </div>
    </section>
  );
}

export default ProductSection;
