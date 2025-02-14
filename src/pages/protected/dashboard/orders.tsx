/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/authContext";
import { toast } from "react-toastify";
import { orderProps } from "../../../utils/interface";
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
  hasPrevious,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<orderProps | null>(null);
  const [cancelModal, setCancelModal] = useState<{ open: boolean; orderId: string | null }>({
    open: false,
    orderId: null,
  });
  const itemsPerPage = 5;
  const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;

  const fetchOrders = (page: number) => {
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
        setTotalPages(responseData.pages);
        setHasNext(responseData.has_next);
        setHasPrevious(responseData.has_previous);
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          toast.error(err?.response?.data?.detail);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [user, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Open the cancel modal
  const openCancelModal = (orderId: string) => {
    setCancelModal({ open: true, orderId });
  };

  // Cancel order after user confirms via modal
  const handleConfirmCancel = async () => {
    if (!cancelModal.orderId) return;
    const orderId = cancelModal.orderId;
    setLoading(true);
    try {
      await axios.delete(`${endpoint}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      toast.success("Order canceled successfully");
      // Remove canceled order from state
      setOrders((prev) => prev.filter((o) => o.order_id !== orderId));
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || "Unable to cancel order. Please try again.");
    } finally {
      setLoading(false);
      setCancelModal({ open: false, orderId: null });
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header Section */}
      <div className="flex-none">
        <h4 className="text-default-400 text-xl mb-4">Orders</h4>
        {loading && <LoadingScreen />}
      </div>

      {/* Table Section - Wrapped in a container with vertical scrolling */}
      <div className="flex-grow overflow-x-auto min-h-0">
        <div className="w-full">
          <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
            <table className="border-separate border-spacing-y-2 text-sm w-full min-w-[900px]">
              <thead className="bg-default-500 text-white rounded sticky top-0">
                <tr>
                  <th className="text-start p-4">Order ID</th>
                  <th className="text-start px-4">Time</th>
                  <th className="text-start px-4">Date</th>
                  <th className="text-start px-4">Total Price(₦)</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="border bg-slate-100 [&>*:nth-child(even)]:bg-slate-300">
                {orders.map((order: orderProps) => {
                  const { order_id, created_at, total_price, status, user_receipt_url } = order;
                  return (
                    <tr
                      key={order_id}
                      className="cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
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
                      <td className="td-class p-4 text-center">
                        <span
                          className={`rounded-md px-4 py-3 text-xs font-semibold uppercase ${
                            status.toLowerCase() === "confirmed"
                              ? "bg-green-600/50 text-green-100"
                              : status.toLowerCase() === "received"
                              ? "bg-blue-600/50 text-blue-100"
                              : "bg-orange-600/50 text-orange-100"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td
                        className="td-class p-4 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex flex-row items-center gap-2 justify-center">
                          <ReceiptDownload receiptUrl={user_receipt_url} orderId={order_id} />
                          <button
                            onClick={() => openCancelModal(order_id)}
                            disabled={status.toLowerCase() !== "ordered"}
                            className="text-xs px-3 py-2 bg-red-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex-none mt-4">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      </div>

      {/* Order Popup */}
      {selectedOrder && (
        <OrderPopup
          order={selectedOrder}
          closeFn={() => setSelectedOrder(null)}
        />
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-70"
            onClick={() => setCancelModal({ open: false, orderId: null })}
          />
          {/* Modal Box */}
          <div className="relative bg-white p-6 rounded shadow-md w-[90%] max-w-sm">
            <h2 className="text-lg font-bold mb-4">Cancel Order</h2>
            <p className="text-sm mb-6">
              Are you sure you want to cancel this order?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCancelModal({ open: false, orderId: null })}
                className="px-4 py-2 text-sm rounded bg-gray-300"
              >
                No
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 text-sm rounded bg-red-600 text-white"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
