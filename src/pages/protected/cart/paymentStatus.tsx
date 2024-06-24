import { Link, useLocation, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../utils/errorTypeHandler";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { MdCheckCircleOutline } from "react-icons/md";

function PaymentStatus() {
  const [order, setOrder] = useState({ id: "", status: "" });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search).get("orderId");
      if (!params) {
        throw new Error("No order found");
      }

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
      setOrder({ id: params, status: "Confirmed" });
    } catch (error) {
      toast.error(getErrorMessage(error));
      setTimeout(() => navigate(-1), 1500); // Navigate after error message toast
    }
  }, [location, navigate]);

  return (
    <div className="max-w-[1200px] w-[95%] mx-auto py-16 flex items-center justify-center">
      <div className="flex flex-col gap-6 text-sm w-full max-w-screen-sm text-center items-center">
        <p>Thank you for your purchase</p>
        <MdCheckCircleOutline size="8rem" className="text-default-500" />
        <h4 className="text-2xl font-medium">
          Order #{order.id} {order.status}
        </h4>
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
