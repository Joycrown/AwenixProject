import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/authContext";
import { toast } from "react-toastify";
import { orderProduct, orderProps } from "../../../utils/interface";
import { months } from "../../../utils/data";
import OrderPopup from "../../../components/orderPopup";

function Orders() {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState<orderProps[]>([]);
  const [orderItems, setOrderItems] = useState<orderProduct[]>([]);

  useEffect(() => {
    const endpoint = import.meta.env.VITE_AWENIX_BACKEND_URL;

    axios
      .get(`${endpoint}/orders/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        const responseData = res.data;
        setOrders(responseData);
      })
      .catch((err) => {
        console.log(err.response);

        if (err.response.status == 400) {
          toast.error(err?.response?.data?.detail);
        }
      });
  }, [user]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h4 className="text-default-400 text-xl">Orders</h4>
      <div className="flex items-center xs:justify-center w-full max-xs:overflow-x-auto">
        <table className="border-separate border-spacing-y-2 text-sm w-full max-xs:min-w-[600px]">
          <thead className="bg-default-500 text-white rounded">
            <tr>
              <th className="text-start p-4">Order ID</th>
              <th className="text-start px-4">Time</th>
              <th className="text-start px-4">Date</th>
              <th className="text-start px-4">Total Price</th>
              <th className="text-center">Status</th>
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
              }: orderProps) => (
                <tr key={order_id} className="">
                  <td className="td-class p-4 suspended-text">{order_id}</td>
                  <td className="td-class p-4 suspended-text">
                    {new Date(created_at).toLocaleTimeString("en-NG", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true, // Use 12-hour clock with AM/PM
                    })}
                  </td>
                  <td className="td-class p-4 suspended-text">
                    {new Date(created_at).getDay()}{" "}
                    {months[new Date(created_at).getMonth()]}{" "}
                    {new Date(created_at).getFullYear()}
                  </td>
                  <td className="td-class p-4 suspended-text">
                    ₦ {total_price.toLocaleString("en-gb")}
                  </td>
                  <td
                    onClick={() => setOrderItems(order_items)}
                    className="td-class p-4"
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
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {orderItems.length >= 1 && (
        <OrderPopup items={orderItems} closeFn={() => setOrderItems([])} />
      )}
    </div>
  );
}

export default Orders;
