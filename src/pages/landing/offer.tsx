import SectionHead from "../../components/sectionHead";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineHeadphones } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";

function OfferSection() {
  const offers = [
    {
      icon: TbTruckDelivery,
      title: "FREE AND FAST DELIVERY",
      text: "Free delivery for all orders over $140",
    },
    {
      icon: MdOutlineHeadphones,
      title: "24/7 CUSTOMER SERVICE",
      text: "Friendly 24/7 customer support",
    },
    {
      icon: GoShieldCheck,
      title: "MONEY BACK GUARANTEE",
      text: "We return money within 30 days",
    },
  ];
  return (
    <div className="max-w-[1200px] w-[95%] mx-auto py-16">
      <SectionHead name="we offer" position="right" />

      <div className="flex max-sm:flex-col gap-8 mx-auto w-fit mt-16">
        {offers.map((offer) => (
          <div
            key={offer.title}
            className="text-center flex flex-col gap-3 items-center justify-center"
          >
            <div className="bg-default-700 w-16 h-16 rounded-full flex items-center justify-center">
              <div className="bg-default-300 w-10 h-10 rounded-full flex items-center justify-center text-white">
                <offer.icon />
              </div>
            </div>
            <span className="font-semibold text-sm">{offer.title}</span>
            <span className="text-xs">{offer.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferSection;
