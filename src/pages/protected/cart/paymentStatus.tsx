// PaymentStatus.jsx
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
  const [paymentMadeBy, setPaymentMadeBy] = useState("");
  const [bank, setBank] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  // const bankAccounts = [
  //   { bank: "Stanbic Bank", accountNumber: "9201591101" },
  //   { bank: "FCMB Bank", accountNumber: "3300994010" },
  //   { bank: "First Bank", accountNumber: "2029027152" },
  // ];

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
        setOrder({ id: params, status: "Confirmed" })
        setPaymentMadeBy(res.data.user_payment_name)
        setBank(res.data.user_bank_verification)
        setAmountPaid(res.data.amount_paid)
        
        ;
      } catch (error) {
        toast.error(getErrorMessage(error) || "Failed to get order");
        setTimeout(() => navigate(-1), 1500);
      }
    };

    getOrder();
  }, [location, navigate, user]);

  return (
    <div className="max-w-[1200px] w-[95%] mx-auto py-16 flex items-center justify-center">
      <div className="flex flex-col gap-6 text-sm w-full max-w-screen-sm text-center items-center">
        <p className="text-[20px]">Thank you for your order</p>
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
              <span className="font-medium text-lg">Total Amount:</span>
            </div>
            <div className="flex flex-row-reverse items-center justify-between gap-1">
              <span className="text-base">{paymentMadeBy}</span>
              <span className="font-medium text-lg">Payment Made By:</span>
            </div>
            <div className="flex flex-row-reverse items-center justify-between gap-1">
              <span className="text-base">{bank}</span>
              <span className="font-medium text-lg">Account Paid to:</span>
            </div>
            <div className="flex flex-row-reverse items-center justify-between gap-1">
              <span className="text-base">  ₦ {amountPaid.toLocaleString("en-gb")}</span>
              <span className="font-medium text-lg">Amount Paid:</span>
            </div>
          </div>

          <h4 className="mt-6 mb-2 font-medium text-lg">Your order and payment details have been successfully received. Our team is currently reviewing and verifying your order. Please check back in a few minutes to track your order status. Once your order is marked as "Confirmed," it means that your order has been received and your payment validated.</h4>
          {/* <div className="space-y-3 py-4 px-4 max-w-[500px] w-full mx-auto">
            {bankAccounts.map((account) => (
              <div
                key={account.accountNumber}
                className="flex flex-row-reverse items-center justify-between gap-1"
              >
                <span className="text-base">{account.accountNumber}</span>
                <span className="font-medium text-lg">{account.bank}</span>
              </div>
            ))}
          </div> */}
        </div>
        <div className="bg-default-500 text-white py-3 px-4 cursor-pointer rounded text-center w-fit mt-auto">
          <Link 
            to="/account/dashboard/orders" 
           
          >
            Track Orders
          </Link>
        </div>
        <div className="bg-default-500 text-white py-3 px-4 cursor-pointer rounded text-center w-fit mt-auto">
        <Link to="/account/home" >
          Continue Shopping
        </Link>
          
        </div>
        
      </div>
    </div>
  );
}

export default PaymentStatus;