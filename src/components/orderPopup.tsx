import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { orderProps } from "../utils/interface"; // Ensure this interface includes order_items, custom_order_items, and payment

// Define a type for items to be passed on reorder
interface ReorderItem {
  name: string;
  price: number;
  quantity: number;
  isCustom?: boolean;
  size?: string;
}


interface OrderPopupProps {
  order: orderProps;
  closeFn: () => void;
  // handleConfirm: (paymentRef: string, orderId: string) => void;
}

function OrderPopup({ order, closeFn}: OrderPopupProps) {
  const navigate = useNavigate();
  
  

  // Extract standard and custom order items from order
  const items = order.order_items;
  // const customOrderItems = order.custom_order_items;

  // Calculate the total order price for standard items
  const totalOrderPrice = items.reduce((sum, item) => sum + item.total_price, 0);

  // Calculate miscellaneous fee (if any) from a sample item
  const miscItem = items.find(item => item.miscellaneous != null);
  const miscellaneousValue = miscItem ? miscItem.miscellaneous : 0;
  const millingPriceFromLS = localStorage.getItem("millingPrice");
  const miscellaneousPercentage = millingPriceFromLS !== null ? parseFloat(millingPriceFromLS) : 10; // cost per KG for milling service
  const miscellaneousQuantity = miscellaneousValue / miscellaneousPercentage;

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

  const handleReorder = () => {
    // Build a list of reorder items of type ReorderItem.
    const orderList: ReorderItem[] = [
      ...order.order_items.map(({ quantity, product }) => ({
        name: product.name,
        price: product.price,
        quantity,
      })),
      ...order.custom_order_items.map(({ product_name, quantity, size }) => ({
        name: product_name,
        price: 0, // Default price or compute if available
        quantity,
        isCustom: true,
        size: size || "kg", // Default to "kg" if not provided
      })),
    ];

    // Treat miscellaneous as the milling service.
    // Append a milling service item only if a miscellaneous fee exists.
    if (miscellaneousValue > 0) {
      orderList.push({
        name: "Milling Service",
        price: miscellaneousPercentage, // cost per KG
        quantity: miscellaneousQuantity, // calculated total KG
        isCustom: true,
        size: "kg",
      });
    }

    const queryString = `?product=${encodeURIComponent(JSON.stringify(orderList))}`;
    navigate(`/account/cart${queryString}`);
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div onClick={closeFn} className="absolute inset-0 bg-black bg-opacity-70 cursor-pointer" />
      <div className="relative bg-white rounded p-6 w-[90%] sm:w-[80%] md:w-[60%] max-h-[80vh] overflow-y-auto">
        {/* Close Icon */}
        <div className="absolute right-4 top-4">
          <MdClose size="1.5rem" onClick={closeFn} className="cursor-pointer" />
        </div>
        <h3 className="text-xl font-bold mb-4">Order Details</h3>

        {/* Payment Details Section */}
        {order.payment && (
          <div className="border p-4 rounded mb-4">
            <h5 className="text-lg font-bold mb-2">Payment Details</h5>
            <p>
              <strong>Payment Method:</strong>{" "}
              {getPaymentMethodLabel(order.payment.payment_option)}
            </p>
            {(order.payment.payment_option === "full" ||
              order.payment.payment_option === "installment") && (
              <>
                <p>
                  <strong>Bank Paid To:</strong> {order.payment.bank}
                </p>
                <p>
                  <strong>Payee Name:</strong> {order.payment.payee_name}
                </p>
                <p>
                  <strong>Amount Paid:</strong>{" "}
                  {order.payment.amount_paid
                    ? `₦ ${order.payment.amount_paid.toLocaleString("en-GB")}`
                    : "N/A"}
                </p>
              </>
            )}
            {order.payment.payment_option === "delivery" && (
              <p>
                <strong>Delivery Person:</strong> {order.payment.delivery_person}
              </p>
            )}
          </div>
        )}

        {/* Standard Order Items Section */}
        {order.order_items.length > 0 && (
          <div>
            <h5 className="text-lg font-bold mb-2">Standard Order Items</h5>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-default-500 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-center">Price/Unit</th>
                    <th className="px-4 py-2 text-center">Quantity</th>
                    <th className="px-4 py-2 text-center">Total Price</th>
                  </tr>
                </thead>
                <tbody className="bg-slate-100">
                  {items.map((item, index) => (
                    <tr key={`${index}-${item.product_id}`}>
                      <td className="px-4 py-2 capitalize">{item.product.name}</td>
                      <td className="px-4 py-2 text-center">₦ {item.product.price}</td>
                      <td className="px-4 py-2 text-center">{item.quantity}</td>
                      <td className="px-4 py-2 text-center">
                        ₦ {item.total_price.toLocaleString("en-GB")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Custom Order Items Section */}
        {order.custom_order_items.length > 0 && (
          <div>
            <h5 className="text-lg font-bold mb-2">Custom Order Items</h5>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-default-500 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-center">Quantity</th>
                  </tr>
                </thead>
                <tbody className="bg-slate-100">
                  {order.custom_order_items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 capitalize">{item.product_name}</td>
                      <td className="px-4 py-2 text-center">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Summary Section */}
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <tbody>
                <tr className="font-medium">
                  <td className="px-4 py-2">Milling Service</td>
                  <td className="px-4 py-2 text-center">₦ {miscellaneousPercentage}</td>
                  <td className="px-4 py-2 text-center">{miscellaneousQuantity} KG</td>
                  <td className="px-4 py-2 text-center"> ₦ {miscellaneousValue.toLocaleString("en-GB")}</td>
                </tr>
                {/* <tr className="font-bold bg-default-500 text-white">
                  <td className="px-4 py-2" colSpan={3}>
                    Milling Service (Total KG)
                  </td>
                  <td className="px-4 py-2 text-center">
                    ₦ {miscellaneousValue.toLocaleString("en-GB")}
                  </td>
                </tr> */}
                <tr className="font-bold">
                  <td className="px-4 py-2" colSpan={3}>
                    Grand Total
                  </td>
                  <td className="px-4 py-2 text-center">
                    ₦ {(totalOrderPrice + miscellaneousValue).toLocaleString("en-GB")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>


        {/* Re-order Button */}
        <div className="flex gap-3 mt-4">
          <div
            onClick={handleReorder}
            className="bg-default-500 text-white py-3 px-4 cursor-pointer rounded text-xs"
          >
            Re-order same feed
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPopup;
