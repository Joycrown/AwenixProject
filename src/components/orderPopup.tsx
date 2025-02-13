import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { orderProduct, orderCustomItem } from "../utils/interface";

interface OrderPopupProps {
  orderItems: orderProduct[];
  customOrderItems: orderCustomItem[];
  closeFn: () => void;
}

function OrderPopup({ orderItems, customOrderItems, closeFn }: OrderPopupProps) {
  const navigate = useNavigate();

  const handleReorder = () => {
    // Merge both lists into one order list for re-ordering
    const orderList = [
      ...orderItems.map(({ quantity, product }) => ({
        name: product.name,
        price: product.price,
        quantity,
      })),
      ...customOrderItems.map(({ product_name, quantity }) => ({
        name: product_name,
        price: 0, // Set a default price or compute if available
        quantity,
      })),
    ];

    const queryString = `?product=${encodeURIComponent(
      JSON.stringify(orderList)
    )}`;
    navigate(`/account/cart${queryString}`);
  };

  return (
    <div className="fixed w-full h-screen left-0 top-0 flex items-center justify-center z-50">
      <div
        onClick={closeFn}
        className="absolute w-full h-full bg-black bg-opacity-70 cursor-pointer"
      />
      <div className="relative space-y-4 rounded bg-white p-4 max-h-[80vh] overflow-y-auto">
        <div className="absolute right-0 top-0 bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
          <MdClose size="1.2rem" onClick={closeFn} />
        </div>

        {/* Standard Order Items Section */}
        {orderItems.length > 0 && (
          <div>
            <h5 className="text-lg font-bold mb-2">Standard Order Items</h5>
            <table className="border-separate border-spacing-y-0 text-sm w-full">
              <thead className="bg-default-500 text-white rounded">
                <tr>
                  <th className="text-start p-4">Name</th>
                  <th className="text-start px-4">Price/Unit</th>
                  <th className="text-start px-4">Quantity</th>
                  <th className="text-start px-4">Total Price</th>
                </tr>
              </thead>
              <tbody className="border bg-slate-100 [&>*:nth-child(even)]:bg-slate-300">
                {orderItems.map(
                  (
                    { product_id, quantity, total_price, product },
                    key: number
                  ) => (
                    <tr key={`${key}-${product_id}`}>
                      <td className="p-4 capitalize">{product.name}</td>
                      <td className="p-4 text-center">₦ {product.price}</td>
                      <td className="p-4 text-center">{quantity}</td>
                      <td className="p-4 text-center">
                        ₦ {total_price.toLocaleString("en-GB")}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Custom Order Items Section */}
        {customOrderItems.length > 0 && (
          <div>
            <h5 className="text-lg font-bold mb-2">Custom Order Items</h5>
            <table className="border-separate border-spacing-y-0 text-sm w-full">
              <thead className="bg-default-500 text-white rounded">
                <tr>
                  <th className="text-start p-4">Name</th>
                  <th className="text-start px-4">Quantity</th>
                </tr>
              </thead>
              <tbody className="border bg-slate-100 [&>*:nth-child(even)]:bg-slate-300">
                {customOrderItems.map((item, key: number) => (
                  <tr key={key}>
                    <td className="p-4 capitalize">{item.product_name}</td>
                    <td className="p-4 text-center">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex gap-3">
          <div
            onClick={handleReorder}
            className="bg-default-500 text-white py-3 px-4 cursor-pointer rounded text-xs"
          >
            Re-order now
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPopup;
