import { FaPhoneAlt, FaFax } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";

function ContactInfo() {
  const informations = [
    { icon: FaPhoneAlt, title: "phone", text: "03 5432 1234" },
    { icon: FaFax, title: "fax", text: "03 5432 1234" },
    { icon: HiOutlineMailOpen, title: "email", text: "info@awenix.com" },
  ];
  return (
    <div className="w-full flex gap-4 justify-between">
      {informations.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <item.icon size="1.4rem" />
          <div className="space-y-3 text-sm max-w-sm">
            <span className="font-semibold block uppercase">{item.title}</span>
            <span className="text-default-400">{item.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactInfo;
