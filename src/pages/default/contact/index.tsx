import { useState } from "react";
import { map } from "../../assets";
import ContactInfo from "./contactInfo";

function ContactPage() {
  const [contact, setContact] = useState({
    name: "",
    mail: "",
    phone: "",
    referral: "",
  });

  const selectable = ["Instagram", "Facebook", "Google Search"];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen relative py-16">
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
              onInput={(e) =>
                setContact((prev) => ({ ...prev, name: e.currentTarget.value }))
              }
              required
            />
            <input
              className="px-5 py-3 border outline-none w-full rounded text-sm"
              placeholder="Email"
              type="email"
              value={contact.mail}
              onChange={(e) =>
                setContact((prev) => ({ ...prev, mail: e.target.value }))
              }
              onInput={(e) =>
                setContact((prev) => ({ ...prev, mail: e.currentTarget.value }))
              }
            />

            <input
              className="px-5 py-3 border outline-none w-full rounded text-sm"
              placeholder="Phone number*"
              type="tel"
              value={contact.phone}
              onInput={(e) =>
                setContact((prev) => ({
                  ...prev,
                  phone: e.currentTarget.value,
                }))
              }
              onChange={(e) =>
                setContact((prev) => ({ ...prev, phone: e.target.value }))
              }
              required
            />

            <select
              onChange={(e) =>
                setContact((prev) => ({
                  ...prev,
                  referral: e.target.value,
                }))
              }
              className="w-full border outline-none px-5 py-3"
              value={contact.referral}
            >
              <option value="" disabled hidden>
                How did you find us?
              </option>
              {selectable.map((selector) => (
                <option key={selector}>{selector}</option>
              ))}
            </select>

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
