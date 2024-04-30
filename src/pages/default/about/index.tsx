import { hero } from "../../../assets";

function AboutPage() {
  return (
    <div className="w-full flex max-md:flex-col">
      <div className="w-3/5 max-md:w-full max-md:order-2 max-md:px-10 flex flex-col px-20 text-left gap-5">
        <h1 className="text-4xl underline py-5">
          About <span className="text-default-400">Us</span>
        </h1>
        <p>
          At Awenix, we believe that healthy birds are the foundation of a
          thriving poultry operation. That's why we're dedicated to providing
          the highest quality feed tailored to the specific needs of laying
          birds, broilers, and starters. Our carefully crafted blends are
          designed to optimize productivity, ensuring your birds reach their
          full potential in growth, egg production, and overall health.
        </p>

        <h2 className="text-4xl max-md:text-3xl underline">
          Why Choose Awenix Feed?
        </h2>
        <ol
          className="list-decimal flex flex-col gap-2 max-md:list-none"
          start={1}
        >
          <li>
            Nutrition Excellence: Our feeds are formulated using premium
            ingredients, including maize, soya meal, wheat offal, limestone,
            Animix concentrate, bone meal, and more. Each ingredient is selected
            for its nutritional value, promoting strong bones, vibrant plumage,
            and optimal egg production.
          </li>
          <li>
            Enhanced Productivity: Awenix feed is engineered to enhance
            productivity in your poultry operation. For broilers, our feeds
            support rapid weight gain and uniformity, resulting in market-ready
            birds in record time. For laying hens, our formulations promote
            consistent egg production, with eggs that are rich in nutrients and
            flavor.
          </li>
          <li>
            Healthy, Happy Birds: We prioritize the health and well-being of
            your birds above all else. By providing balanced nutrition and
            essential vitamins and minerals, our feeds contribute to overall
            bird health, reducing the risk of disease and ensuring a robust
            immune system.
          </li>
        </ol>
        <div className="pb-16">
          <h3 className="text-2xl underline py-3">
            Partner with Awenix for Superior Poultry Nutrition
          </h3>
          <p>
            Experience the difference that Awenix feed can make in your poultry
            operation. Join countless farmers who trust Awenix to deliver
            results, from improved growth rates to higher egg production and
            healthier chickens. Contact us today to learn more about our
            products and how we can support your success in poultry farming
          </p>
        </div>
      </div>
      <div className="w-2/5 max-md:order-1 max-md:w-full max-md:bg-default-500 max-md:py-14 flex align-center">
        <img src={hero} alt="4 bags showing a variety of feed" />
      </div>
    </div>
  );
}

export default AboutPage;
