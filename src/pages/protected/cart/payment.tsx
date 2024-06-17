import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PaymentCard from "./paymentCard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../../utils/errorTypeHandler";
import PaymentPin from "./paymentPin";

function PaymentCredentials() {
  const [amount, setAmount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // const params = new URLSearchParams(location.search).get("orderID");
      // if (!params) {
      //   throw new Error("No order found");
      // }

      // axios
      //   .get(`/orders/${params}`)
      //   .then((res) => {
      //     console.log(res);
      //     setAmount(res.data.total_price);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     throw new Error("Failed to get order");
      //   });
      setAmount(10000);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setTimeout(() => navigate(-1), 1500); // Navigate after error message toast
    }
  }, [location, navigate]);

  return (
    <div className="max-w-[1200px] w-[95%] mx-auto py-16 flex items-center justify-center">
      <div className="flex flex-col gap-6 text-sm font-medium w-full max-w-screen-sm">
        <h4 className="pb-4 border-b border-default-100 text-xl">Payment</h4>
        <div className="flex flex-col gap-2">
          <span>Pay With:</span>
          <div className="flex items-center gap-2 font-normal">
            <input type="radio" className="w-fit" checked readOnly />
            <span>Card</span>
          </div>
        </div>

        <Routes>
          <Route
            path="/payment-credentials"
            element={<PaymentCard amount={amount} />}
          />
          <Route path="/payment-pin" element={<PaymentPin />} />
        </Routes>

        <p className="font-normal text-xs">
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </p>
      </div>
    </div>
  );
}

export default PaymentCredentials;
