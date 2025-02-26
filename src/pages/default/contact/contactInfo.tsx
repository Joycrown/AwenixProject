import { FaPhoneAlt} from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";

function ContactInfo() {
  const informations = [
    { icon: FaPhoneAlt, title: "phone", text: "+234 903 663 9178" , text2: "+234 805 515 1903"},
    // { icon: FaPhoneAlt, title: "phone", text: "+234 903 663 9178" },
    { icon: HiOutlineMailOpen, title: "email", text: "awenixagroalliedservices@gmail.com" },
  ];
  return (
    <div className="w-full flex gap-4 justify-between">
      {informations.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <item.icon size="1.4rem" />
          <div className="space-y-3 text-sm max-w-sm">
            <span className="font-semibold block uppercase">{item.title}</span>
            <span className="text-default-400">{item.text}</span><br/>
            <span className="text-default-400">{item.text2}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactInfo;
