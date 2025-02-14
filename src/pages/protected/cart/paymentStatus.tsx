/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../utils/errorTypeHandler";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import axios from "axios";
import { useAuthContext } from "../../../utils/authContext";
import { orderProps } from "../../../utils/interface"; // Ensure this interface is defined

function PaymentStatus() {
  // Define state with proper type
  const [order, setOrder] = useState<orderProps | null>(null);
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
        // Set the complete order object including payment details
        setOrder(res.data);
      } catch (error: any) {
        toast.error(getErrorMessage(error) || "Failed to get order");
        setTimeout(() => navigate(-1), 1500);
      }
    };

    getOrder();
  }, [location, navigate, user]);


  const getPaymentMethodLabel = (option: string): string => {
    switch (option) {
      case "full":
        return "Full Payment";
      case "installment":
        return "Installmental Payment";
      case "delivery":
        return "Cash on Delivery/Carriage";
      default:
        return option; // Fallback, if needed.
    }
  };

  if (!order) return <div>Loading...</div>;

  // Destructure required fields from order
  const { order_id, total_price, payment } = order;

  return (
    <div className="max-w-[1200px] w-[95%] mx-auto py-16 flex items-center justify-center">
      <div className="flex flex-col gap-6 text-sm w-full max-w-screen-sm text-center items-center">
        <p className="text-[20px]">Thank you for your order</p>
        <MdCheckCircleOutline size="8rem" className="text-default-500" />
        <h4 className="text-2xl font-medium">
          Order #{order_id} successfully created
        </h4>

        <div className="w-full mx-auto">
          <div className="space-y-3 pb-4 px-4 max-w-[500px] w-full mx-auto">
            <div className="flex flex-row-reverse items-center justify-between gap-1">
              <span className="text-base">
                ₦ {total_price.toLocaleString("en-gb")}
              </span>
              <span className="font-medium text-lg">Total Amount:</span>
            </div>

            {payment && (
              <>
                <div className="flex flex-row-reverse items-center justify-between gap-1">
                  <span className="text-base">{getPaymentMethodLabel(payment.payment_option)}</span>
                  <span className="font-medium text-lg">Payment Method:</span>
                </div>

                {(payment.payment_option === "full" ||
                  payment.payment_option === "installment") && (
                  <>
                    <div className="flex flex-row-reverse items-center justify-between gap-1">
                      <span className="text-base">{payment.payee_name}</span>
                      <span className="font-medium text-lg">
                        Payment Made By:
                      </span>
                    </div>
                    <div className="flex flex-row-reverse items-center justify-between gap-1">
                      <span className="text-base">{payment.bank}</span>
                      <span className="font-medium text-lg">
                        Account Paid to:
                      </span>
                    </div>
                    <div className="flex flex-row-reverse items-center justify-between gap-1">
                      <span className="text-base">
                        ₦{" "}
                        {payment.amount_paid
                          ? payment.amount_paid.toLocaleString("en-gb")
                          : "N/A"}
                      </span>
                      <span className="font-medium text-lg">
                        Amount Paid:
                      </span>
                    </div>
                  </>
                )}

                {payment.payment_option === "delivery" && (
                  <div className="flex flex-row-reverse items-center justify-between gap-1">
                    <span className="text-base">
                      {payment.delivery_person}
                    </span>
                    <span className="font-medium text-lg">
                      Delivery Person:
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          <h4 className="mt-6 mb-2 font-medium text-lg">
            Your order and payment details have been successfully received. Our
            team is currently reviewing and verifying your order. Please check
            back in a few minutes to track your order status.
          </h4>
        </div>

        <div className="bg-default-500 text-white py-3 px-4 cursor-pointer rounded text-center w-fit mt-auto">
          <Link to="/account/dashboard/orders">Track Orders</Link>
        </div>
        <div className="bg-default-500 text-white py-3 px-4 cursor-pointer rounded text-center w-fit mt-auto">
          <Link to="/account/home">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentStatus;
