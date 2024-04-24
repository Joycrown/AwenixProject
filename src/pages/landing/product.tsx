import { concentrate, limestone, maize, mashD, mashM } from "../../assets";
import SectionHead from "../../components/sectionHead";

function ProductSection() {
  return (
    <div className="space-y-4">
      <SectionHead name="our products" position="right" />
      <h3 className="font-medium">Explore your options</h3>
      <div className="grid md:grid-cols-4 md:grid-rows-2 gap-4">
        <picture className="max-md:row-start-1 md:row-span-2 col-span-2">
          <source media="(min-width:650px)" srcSet={mashD} />
          <img src={mashM} alt="Mash" />
        </picture>
        <img
          className="col-span-2 max-md:row-start-3"
          src={limestone}
          alt="Limestone"
        />
        <img className="max-md:row-start-2" src={maize} alt="Maize" />
        <img
          className="max-md:row-start-2"
          src={concentrate}
          alt="Concentrate"
        />
      </div>
    </div>
  );
}

export default ProductSection;
