/* eslint-disable @typescript-eslint/no-explicit-any */
// PaymentVerification.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../utils/errorTypeHandler";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import axios from "axios";
import { useAuthContext } from "../../../utils/authContext";

function PaymentVerification() {
  const [order, setOrder] = useState({ id: "", status: "", amount: "" });
  const [selectedBank, setSelectedBank] = useState("");
  const [payeeName, setPayeeName] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);
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
          navigate("/account/dashboard/orders");
          throw new Error("No order found");
        }

        const res = await axios.get(`${endpoint}/orders/${params}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        
        setOrder({ id: params, status: "Pending Verification", amount: res.data.total_price });
        
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

  const handleAmountPaidChange = (e:any) => {
    setAmountPaid(e.target.value);
  };

  const handleSubmitVerification = async () => {
    if (!selectedBank || !payeeName || !amountPaid) {
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
          payee_name: payeeName,
          amount_paid: (amountPaid) // ensure numeric value
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
  
      setIsVerified(true);
      toast.success("Payment verification submitted successfully");
      
      // Redirect to payment status page after successful verification
      setTimeout(() => {
        navigate(`/account/payment/payment-status?orderId=${order.id}`);
      }, 2000);
    } catch (error) {
      const errorMessage = (error as any)?.response?.data?.detail || "Failed to submit payment verification";
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
              <h4 className="text-xl font-medium text-gray-900">
                Complete Your Order #{order.id} By Making Payment
              </h4>
            </div>
            <div className="w-full mx-auto">
              <div className="space-y-3 pb-4 px-4 max-w-[500px] w-full mx-auto">
                <div className="flex flex-row-reverse items-center justify-between gap-1">
                  <span className="text-base">₦ {order.amount}</span>
                  <span className="font-medium text-lg">Total Amount</span>
                </div>
                <div className="flex flex-row-reverse items-center justify-between gap-1">
                  <span className="text-base">Awenix Nig LTD</span>
                  <span className="font-medium text-lg">Account Name</span>
                </div>
              </div>

              <h4 className="mt-6 mb-2 font-medium text-lg">
                Available Channels For Payment are as follow:
              </h4>
              <div className="space-y-3 py-4 px-4 max-w-[500px] w-full mx-auto">
                {bankAccounts.map((account) => (
                  <div
                    key={account.accountNumber}
                    className="flex flex-row-reverse items-center justify-between gap-1"
                  >
                    <span className="text-base">{account.accountNumber}</span>
                    <span className="font-medium text-lg">{account.bank}</span>
                  </div>
                ))}
              </div>
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

              {/* Amount Paid Input */}
              <div className="space-y-2">
                <label 
                  htmlFor="amount-paid" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Amount Paid *
                </label>
                <input
                  type="number"
                  id="amount-paid"
                  value={amountPaid}
                  onChange={handleAmountPaidChange}
                  disabled={isVerified}
                  placeholder="Enter the total amount paid"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-default-500 focus:outline-none focus:ring-1 focus:ring-default-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {!isVerified && (
                <button
                  onClick={handleSubmitVerification}
                  disabled={isSubmitting || !selectedBank || !payeeName || !amountPaid}
                  className="w-full mt-4 bg-default-500 text-white py-2 px-4 rounded-md hover:ring-default-500 focus:outline-none focus:ring-2 focus:ring-default-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Submit Details for Verification"}
                </button>
              )}

              {isVerified && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 py-2 px-4 bg-green-50 text-green-700 rounded-md">
                    <MdCheckCircleOutline className="w-5 h-5" />
                    <span className="text-sm">
                      Payment verification submitted successfully
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Redirecting to payment status page...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default PaymentVerification;
