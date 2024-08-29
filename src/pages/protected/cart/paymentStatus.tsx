import { Link, useLocation, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../utils/errorTypeHandler";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import axios from "axios";
import { useAuthContext } from "../../../utils/authContext";

function PaymentStatus() {
  const [order, setOrder] = useState({ id: "", status: "" });
  const [amount, setAmount] = useState(0);
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;

    const getOrder = async () => {
      try {
        const params = new URLSearchParams(location.search).get("orderId");

        if (!params) {
          throw new Error("No order found");
        }

        const res = await axios.get(`${endpoint}/orders/${params}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setAmount(res.data.total_price);
        setOrder({ id: params, status: "Confirmed" });
      } catch (error) {
        toast.error(getErrorMessage(error) || "Failed to get order");
        setTimeout(() => navigate(-1), 1500); // Navigate after error message toast
      }
    };

    getOrder();
  }, [location, navigate, user]);

  return (
    <div className="max-w-[1200px] w-[95%] mx-auto py-16 flex items-center justify-center">
      <div className="flex flex-col gap-6 text-sm w-full max-w-screen-sm text-center items-center">
        <p>Thank you for your order</p>
        <MdCheckCircleOutline size="8rem" className="text-default-500" />
        <h4 className="text-2xl font-medium">
          Order #{order.id} successfully created
        </h4>

        <div className="w-full mx-auto">
          <div className="space-y-3 pb-4 px-4 max-w-[500px] w-full mx-auto">
            <div className="flex flex-row-reverse items-center justify-between gap-1">
              <span className="text-base">
                ₦ {amount.toLocaleString("en-gb")}
              </span>
              <span className="font-medium text-lg">Total Amount</span>
            </div>
            <div className="flex flex-row-reverse items-center justify-between gap-1">
              <span className="text-base">Awenix Nig LTD</span>
              <span className="font-medium text-lg">Account Name</span>
            </div>
          </div>

          <h4>Make payment to any of the listed Awenix accounts</h4>

          <div className="space-y-3 py-4 px-4 max-w-[500px]  w-full mx-auto">
            <div className="flex flex-row-reverse items-center justify-between gap-1">
              <span className="text-base">9201591101</span>
              <span className="font-medium text-lg">Stanbic Bank</span>
            </div>
            <div className="flex flex-row-reverse items-center justify-between gap-1">
              <span className="text-base">3300994010</span>
              <span className="font-medium text-lg">FCMB Bank</span>
            </div>
            <div className="flex flex-row-reverse items-center justify-between gap-1">
              <span className="text-base">2029027152</span>
              <span className="font-medium text-lg">First Bank</span>
            </div>
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
