import { useState } from "react";
import { map } from "../../../assets";
import ContactInfo from "./contactInfo";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingScreen from "../../../components/loadingScreen";

function ContactPage() {
  const [contact, setContact] = useState({
    name: "",
    mail: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;

    const { name, mail, subject, message } = contact;

    if (name === "" || mail === "" || subject === "" || message === "") {
      return toast.error("Please fill all the fields");
    }

    setLoading(true);

    axios
      .post(`${endpoint}/contact_us/awenix`, {
        name: name,
        email: mail,
        subject: subject,
        message: message,
      })
      .then(() => {
        setLoading(false);
        toast.success(
          "Mail has been recieved... You will be contacted shortly"
        );
      })
      .catch(() => {
        setLoading(false);
        toast.error("Encountered an error... Try again");
      });
  };

  return (
    <div className="min-h-screen relative py-16">
      {loading && <LoadingScreen />}
      <div className="flex max-md:flex-col gap-24 max-w-screen-lg w-[95%] mx-auto items-end">
        <div className="space-y-10">
          <h1 className="font-bold">
            Get in <span className="text-default-400">Touch</span>
          </h1>

          <div className="md:hidden">
            <ContactInfo />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="px-5 py-3 border outline-none w-full rounded text-sm"
              placeholder="Name*"
              value={contact.name}
              onChange={(e) =>
                setContact((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
            <input
              className="px-5 py-3 border outline-none w-full rounded text-sm"
              placeholder="Email*"
              type="email"
              value={contact.mail}
              onChange={(e) =>
                setContact((prev) => ({ ...prev, mail: e.target.value }))
              }
            />

            <input
              className="px-5 py-3 border outline-none w-full rounded text-sm"
              placeholder="Subject*"
              value={contact.subject}
              onChange={(e) =>
                setContact((prev) => ({ ...prev, subject: e.target.value }))
              }
              required
            />

            <textarea
              className="px-5 py-3 border outline-none w-full rounded text-sm"
              placeholder="Message*"
              value={contact.message}
              onChange={(e) =>
                setContact((prev) => ({ ...prev, message: e.target.value }))
              }
              required
            />

            <button
              type="submit"
              className="py-3 px-6 border-0 outline-none bg-default-500 text-white w-full rounded"
            >
              Send
            </button>
          </form>
          <div className="max-md:hidden">
            <ContactInfo />
          </div>
        </div>

        <div className="w-full md:w-9/12">
          <img src={map} alt="Find us at" />
        </div>
      </div>

      <div className="bg-default-500 max-md:hidden absolute top-0 right-0 -z-10 w-1/3 h-full" />
    </div>
  );
}

export default ContactPage;
