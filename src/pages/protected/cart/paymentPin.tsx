import React, { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function PaymentPin() {
  const [pins, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
  });

  const pin1Ref = useRef<HTMLInputElement>(null);
  const pin2Ref = useRef<HTMLInputElement>(null);
  const pin3Ref = useRef<HTMLInputElement>(null);
  const pin4Ref = useRef<HTMLInputElement>(null);

  const pinReferences = [pin1Ref, pin2Ref, pin3Ref, pin4Ref];

  const navigate = useNavigate();

  // Function to handle input change and move focus
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement> | null
  ) => {
    const { value, maxLength, id } = event.target;
    if (value.trim() === " ") {
      return;
    }

    const digit = value.replace(/\D/g, "").trim();

    // Update state for the current input
    setPin((prevPins) => ({ ...prevPins, [id]: digit }));

    // Move focus to the next input if there's a value
    if (value.length === maxLength && nextRef && nextRef.current) {
      nextRef.current.focus();
    }
  };

  const handleBackspace = (
    event: React.KeyboardEvent<HTMLInputElement>,
    prevRef: React.RefObject<HTMLInputElement> | null,
    currentRef: React.RefObject<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && currentRef.current?.value === "") {
      event.preventDefault(); // Prevent browser back navigation

      // Move focus to the previous input field
      if (prevRef && prevRef.current) {
        prevRef.current.focus();
      }
    }
  };

  const handleSubmit = () => {
    // Make API call to pay for order
    // Go to the confirmation page
    navigate("/account/payment-status");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-4 sm:gap-6 items-center text-center">
        <span>Enter your 4-digit card pin to confirm this payment</span>
        <div className="mx-auto flex gap-4 h-[100px] sm:h-[170px]">
          {Object.keys(pins)
            .map((id: string, index) => ({
              id,
              ref: pinReferences[index],
              next: index + 1 >= 4 ? null : pinReferences[index + 1],
              prev: index - 1 < 0 ? null : pinReferences[index - 1],
            }))
            .map((element) => (
              <input
                required
                type="text"
                maxLength={1}
                pattern="[0-9]"
                inputMode="numeric"
                value={pins[element.id as keyof typeof pins]}
                key={element.id}
                ref={element.ref}
                id={element.id}
                onChange={(e) => handleInputChange(e, element.next)}
                onKeyDown={(e) => handleBackspace(e, element.prev, element.ref)}
                className="w-10 h-10 sm:w-12 sm:h-12 border rounded outline-none text-center"
              />
            ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-default-500 text-white py-3 px-4 cursor-pointer rounded text-center outline-none border-0 w-full"
      >
        Confirm Payment
      </button>
    </form>
  );
}

export default PaymentPin;
