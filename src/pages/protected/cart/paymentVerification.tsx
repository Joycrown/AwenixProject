/* eslint-disable @typescript-eslint/no-explicit-any */
// PaymentVerification.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../utils/errorTypeHandler";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import axios from "axios";
import { useAuthContext } from "../../../utils/authContext";

function PaymentVerification() {
  const [order, setOrder] = useState({ id: "", status: "" });
  const [selectedBank, setSelectedBank] = useState("");
  const [payeeName, setPayeeName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const bankAccounts = [
    { bank: "Stanbic Bank", accountNumber: "9201591101" },
    { bank: "FCMB Bank", accountNumber: "3300994010" },
    { bank: "First Bank", accountNumber: "2029027152" },
  ];

  useEffect(() => {
    const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;

    const getOrder = async () => {
      try {
        const params = new URLSearchParams(location.search).get("orderId");

        if (!params) {
          throw new Error("No order found");
          navigate("/account/dashboard/orders");
        }

        const res = await axios.get(`${endpoint}/orders/${params}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        
        setOrder({ id: params, status: "Pending Verification" });
        
        // If payment is already verified, prefill and disable the form
        if (res.data.payment_verification) {
          setSelectedBank(res.data.payment_verification.bank);
          setPayeeName(res.data.payment_verification.payee_name);
          setIsVerified(true);
        }
      } catch (error) {
        toast.error(getErrorMessage(error) || "Failed to get order");
        navigate("/account/dashboard/orders");
      }
    };

    getOrder();
  }, [location, navigate, user]);

  const handleBankChange = (e:any) => {
    setSelectedBank(e.target.value);
  };

  const handlePayeeNameChange = (e:any) => {
    setPayeeName(e.target.value);
  };

  const handleSubmitVerification = async () => {
    if (!selectedBank || !payeeName) {
      toast.error("Please fill in all required fields");
      return;
    }
  
    setIsSubmitting(true);
    const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;
  
    try {
      await axios.put(
        `${endpoint}/orders/${order.id}/verify-payment`,
        {
          bank: selectedBank,
          payee_name: payeeName
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
  
      setIsVerified(true);
      toast.success("Payment verification submitted successfully");
      
      // Redirect to track order page after successful verification
      setTimeout(() => {
        navigate(`/account/dashboard/orders`);
      }, 2000);
    } catch (error) {
      const errorMessage = (error as any).response?.data?.detail || "Failed to submit payment verification";
      toast.error(getErrorMessage(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1200px] w-[95%] mx-auto py-16 flex items-center justify-center">
      <div className="flex flex-col gap-6 text-sm w-full max-w-screen-sm text-center items-center">
        <div className="w-full mx-auto">
          <div className="space-y-6 max-w-[500px] w-full mx-auto px-4">
            <div className="text-center space-y-2">
              <h4 className="text-xl font-medium text-gray-900">Payment Verification</h4>
              <p className="text-sm text-gray-600">
                Complete your payment verification for Order #{order.id}
              </p>
            </div>

            <div className="space-y-4">
              {/* Bank Selection */}
              <div className="space-y-2">
                <label 
                  htmlFor="bank-select" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Bank Account Used for Payment *
                </label>
                <select
                  id="bank-select"
                  value={selectedBank}
                  onChange={handleBankChange}
                  disabled={isVerified}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-default-500 focus:outline-none focus:ring-1 focus:ring-default-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select the bank you paid to</option>
                  {bankAccounts.map((account) => (
                    <option key={account.accountNumber} value={account.bank}>
                      {account.bank} - {account.accountNumber}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payee Name Input */}
              <div className="space-y-2">
                <label 
                  htmlFor="payee-name" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Name Used for Payment *
                </label>
                <input
                  type="text"
                  id="payee-name"
                  value={payeeName}
                  onChange={handlePayeeNameChange}
                  disabled={isVerified}
                  placeholder="Enter the name you used for the transfer"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-default-500 focus:outline-none focus:ring-1 focus:ring-default-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {!isVerified && (
                <button
                  onClick={handleSubmitVerification}
                  disabled={isSubmitting || !selectedBank || !payeeName}
                  className="w-full mt-4 bg-default-500 text-white py-2 px-4 rounded-md hover:ring-default-500 focus:outline-none focus:ring-2 focus:ring-default-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Submit Details for Verification"}
                </button>
              )}

              {isVerified && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 py-2 px-4 bg-green-50 text-green-700 rounded-md">
                    <MdCheckCircleOutline className="w-5 h-5" />
                    <span className="text-sm">Payment verification submitted successfully</span>
                  </div>
                  <p className="text-sm text-gray-600">Redirecting to track order page...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Link 
          to="/account/dashboard/orders" 
          className="text-default-500 hover:text-default-600"
        >
          View All Orders
        </Link>
      </div>
    </div>
  );
}

export default PaymentVerification;