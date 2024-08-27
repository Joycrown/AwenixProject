import { Link, useLocation, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../utils/errorTypeHandler";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import axios from "axios";

function PaymentStatus() {
  const [order, setOrder] = useState({ id: "", status: "" });
  const [amount, setAmount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search).get("orderId");
      const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;

      if (!params) {
        throw new Error("No order found");
      }

      axios
        .get(`${endpoint}/orders/${params}`)
        .then((res) => {
          setAmount(res.data.total_price);
          setOrder({ id: params, status: "Confirmed" });
        })
        .catch((err) => {
          console.log(err);
          throw new Error("Failed to get order");
        });
    } catch (error) {
      toast.error(getErrorMessage(error));
      setTimeout(() => navigate(-1), 1500); // Navigate after error message toast
    }
  }, [location, navigate]);

  return (
    <div className="max-w-[1200px] w-[95%] mx-auto py-16 flex items-center justify-center">
      <div className="flex flex-col gap-6 text-sm w-full max-w-screen-sm text-center items-center">
        {/* <p>Thank you for your order</p> */}
        <MdCheckCircleOutline size="8rem" className="text-default-500" />
        <h4 className="text-2xl font-medium">
          Order #{order.id} successfully created
        </h4>

        <div className="w-full mx-auto">
          <h4>Send ₦ {amount.toLocaleString("en-gb")} to awenix account</h4>

          <div className="space-y-3 py-4">
            <div className="flex flex-row-reverse items-center justify-between max-w-[300px] w-full mx-auto gap-1">
              <span className="font-medium text-base">9201591101</span>
              <span className="font-semibold text-lg">Stanbic Bank</span>
            </div>
            <div className="flex flex-row-reverse items-center justify-between max-w-[300px] w-full mx-auto gap-1">
              <span className="font-medium text-base">3300994010</span>
              <span className="font-semibold text-lg">FCMB Bank</span>
            </div>
            <div className="flex flex-row-reverse items-center justify-between max-w-[300px] w-full mx-auto gap-1">
              <span className="font-medium text-base">2029027152</span>
              <span className="font-semibold text-lg">First Bank</span>
            </div>

            <span className="font-semibold text-lg">Awenix nig ltd</span>
          </div>
        </div>

        <Link
          to="/account/dashboard/orders"
          className="bg-default-500 text-white py-3 px-4 cursor-pointer rounded text-center w-full max-w-sm"
        >
          Track Order
        </Link>
        <Link to="/account/home">Continue Shopping</Link>
      </div>
    </div>
  );
}

export default PaymentStatus;
