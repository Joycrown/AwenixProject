/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/authContext";
import { toast } from "react-toastify";
import { orderProduct, orderProps, orderCustomItem } from "../../../utils/interface";
import { months } from "../../../utils/data";
import ReceiptDownload from "../../../utils/receiptDownload";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import LoadingScreen from "../../../components/loadingScreen";
import OrderPopup from "../../../components/orderPopup";

const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  hasNext,
  hasPrevious
}: any) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className="flex items-center px-3 py-1 text-sm bg-default-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaArrowLeft className="w-4 h-4" />
        Previous
      </button>
      
      <span className="px-4 py-1 text-sm bg-slate-100 rounded">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="flex items-center px-3 py-1 text-sm bg-default-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <FaArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

function Orders() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<orderProps[]>([]);
  // Separate state variables for the two lists
  const [orderItems, setOrderItems] = useState<orderProduct[]>([]);
  const [customOrderItems, setCustomOrderItems] = useState<orderCustomItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const itemsPerPage = 5;

  const fetchOrders = (page: number) => {
    const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;
    setLoading(true);
    axios
      .get(`${endpoint}/orders/me?page=${page}&size=${itemsPerPage}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        const responseData = res.data;
        setOrders(responseData.items);
        // Adjust based on how your backend returns pagination data:
        setTotalPages(responseData.pages);
        setHasNext(responseData.has_next);
        setHasPrevious(responseData.has_previous);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 400) {
          toast.error(err?.response?.data?.detail);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [user, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header Section - Fixed */}
      <div className="flex-none">
        <h4 className="text-default-400 text-xl mb-4">Orders</h4>
        {loading && <LoadingScreen />}
      </div>

      {/* Table Section - Scrollable */}
      <div className="flex-grow overflow-x-auto min-h-0">
        <div className="w-full">
          <table className="border-separate border-spacing-y-2 text-sm w-full min-w-[900px]">
            <thead className="bg-default-500 text-white rounded sticky top-0">
              <tr>
                <th className="text-start p-4">Order ID</th>
                <th className="text-start px-4">Time</th>
                <th className="text-start px-4">Date</th>
                <th className="text-start px-4">Total Price(₦)</th>
                <th className="text-start px-4">Bank Paid to</th>
                <th className="text-start px-4">Paid by</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="border bg-slate-100 [&>*:nth-child(even)]:bg-slate-300">
              {orders.map(
                ({
                  order_id,
                  created_at,
                  total_price,
                  status,
                  order_items,
                  custom_order_items,
                  user_receipt_url,
                  user_payment_name,
                  user_bank_verification,
                }: orderProps) => (
                  <tr key={order_id}>
                    <td className="td-class p-4 suspended-text">{order_id}</td>
                    <td className="td-class p-4 suspended-text">
                      {new Date(created_at).toLocaleTimeString("en-NG", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </td>
                    <td className="td-class p-4 suspended-text">
                      {new Date(created_at).getUTCDate()}{" "}
                      {months[new Date(created_at).getMonth()]}{" "}
                      {new Date(created_at).getFullYear()}
                    </td>
                    <td className="td-class p-4 suspended-text">
                      {total_price.toLocaleString("en-gb")}
                    </td>
                    <td className="td-class p-4 suspended-text">
                      {user_bank_verification}
                    </td>
                    <td className="td-class p-4 suspended-text">
                      {user_payment_name}
                    </td>
                    <td
                      // Set the two lists separately when clicking the status
                      onClick={() => {
                        setOrderItems(order_items);
                        setCustomOrderItems(custom_order_items);
                      }}
                      className="td-class p-4 flex cursor-pointer"
                    >
                      <span
                        className={`rounded-md ${
                          status.toLowerCase() === "confirmed"
                            ? "bg-green-600/50 text-green-100"
                            : "bg-orange-600/50 text-orange-100"
                        } px-4 py-3 text-xs font-semibold uppercase antialiased block mx-auto w-fit`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="m-1">
                      <ReceiptDownload
                        receiptUrl={user_receipt_url}
                        orderId={order_id}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Section - Fixed */}
      <div className="flex-none mt-4">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      </div>

      {/* Render the popup if there are any items */}
      {(orderItems.length > 0 || customOrderItems.length > 0) && (
        <OrderPopup
          orderItems={orderItems}
          customOrderItems={customOrderItems}
          closeFn={() => {
            setOrderItems([]);
            setCustomOrderItems([]);
          }}
        />
      )}
    </div>
  );
}

export default Orders;
