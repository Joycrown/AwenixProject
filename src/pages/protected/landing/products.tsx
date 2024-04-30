import { Link } from "react-router-dom";
import SectionHead from "../../../components/sectionHead";
import { products } from "../../../utils/data";
import ProductCard from "../../../components/productCard";

function ProductSection() {
  return (
    <div className="space-y-4">
      <SectionHead name="our products" position="left" />
      <h3 className="font-medium">Explore Our Products</h3>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product, id) => (
          <ProductCard key={id} {...product} />
        ))}
      </div>

      <Link
        to="/protected/products/"
        className="py-3 px-6 bg-default-500 text-white mx-auto w-fit rounded block capitalize"
      >
        View all products
      </Link>
    </div>
  );
}

export default ProductSection;
