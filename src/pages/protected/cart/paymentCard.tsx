/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PaymentCard({ amount }: { amount: number }) {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    pin: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [autoComplete, setAutoComplete] = useState("off");
  const navigate = useNavigate();

  const configureDigits = (value: string) => {
    if (value.trim() === " ") {
      return "";
    }

    const digit = value
      .replace(/\D/g, "")
      .replace(/(.{1,4})/g, "$1 ")
      .trim();

    return `${digit}`;
  };

  const configureExpiration = (value: string) => {
    let digits = value.replace(/\D/g, "");

    if (digits.length > 2) {
      digits = `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }

    setCardDetails((prev) => ({
      ...prev,
      expirationDate: digits,
    }));

    confirmExpiration(digits);
  };

  const confirmExpiration = (value: string) => {
    const month = value.slice(0, 2);
    const year = value.slice(3, 5);

    const currentMonth = (new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const currentYear = new Date().getFullYear().toString().substr(-2);

    if (parseInt(month) > 12) {
      setErrorMessage("Invalid expiration month");
      return;
    }

    if (
      year.length === 2 &&
      (currentYear > year || (currentYear === year && currentMonth > month))
    ) {
      // Card has expired
      setErrorMessage("Card has expired");
      return;
    }

    setErrorMessage("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (errorMessage.length >= 1) {
      toast.error(errorMessage);
      return;
    }

    // Make an API call if the payment gateway will have something like that
    // Navigate to where user inputs their pin
    navigate("/account/payment/payment-pin");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-3">
        <label htmlFor="cardNumber">
          <sup className="text-default-400">*</sup> Card Number
        </label>
        <input
          required
          type="tel"
          maxLength={19}
          id="cardNumber"
          value={cardDetails.cardNumber}
          placeholder="8344 9854 8549 4545"
          onChange={(e) =>
            setCardDetails((prev) => ({
              ...prev,
              cardNumber: configureDigits(e.target.value),
            }))
          }
          className="border outline-none p-3 rounded text-xs font-normal focus:border-default-100"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="expirationDate">Expiration Date</label>
          <input
            required
            type="tel"
            maxLength={5}
            id="expirationDate"
            placeholder="MM/YY"
            autoComplete={autoComplete}
            value={cardDetails.expirationDate}
            onChange={(e) => configureExpiration(e.target.value)}
            onBlur={() => confirmExpiration(cardDetails.expirationDate)}
            className="border outline-none p-3 rounded text-xs font-normal focus:border-default-100"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            required
            type="tel"
            maxLength={3}
            placeholder="699"
            value={cardDetails.cvv}
            autoComplete={autoComplete}
            onChange={(e) =>
              setCardDetails((prev) => ({
                ...prev,
                cvv: configureDigits(e.target.value),
              }))
            }
            className="border outline-none p-3 rounded text-xs font-normal focus:border-default-100"
          />
        </div>
      </div>

      {errorMessage && (
        <p className="text-default-400 text-xs">{errorMessage}</p>
      )}

      <div className="flex gap-2 items-center pb-6">
        <input
          type="checkbox"
          id="autoComplete"
          checked={autoComplete === "on"}
          onChange={() =>
            setAutoComplete((prev) => (prev === "on" ? "off" : "on"))
          }
        />
        <label
          htmlFor="autoComplete"
          className="text-default-700 text-xs font-normal"
        >
          Save card details
        </label>
      </div>

      <button
        type="submit"
        className="bg-default-500 text-white py-3 px-4 cursor-pointer rounded text-center outline-none border-0 w-full"
      >
        Pay ₦ {amount.toLocaleString("en-gb")}
      </button>
    </form>
  );
}

export default PaymentCard;
