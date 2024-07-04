import { MdClose } from "react-icons/md";
import { orderProduct } from "../utils/interface";
import { useNavigate } from "react-router-dom";

interface orderItemsProps {
  items: orderProduct[];
  closeFn: () => void;
}

function OrderPopup({ items, closeFn }: orderItemsProps) {
  const navigate = useNavigate();

  const handleReorder = () => {
    const orderList = items.map(({ quantity, product }) => ({
      name: product.name,
      price: product.price,
      quantity: quantity,
    }));

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
      <div className="relative space-y-4 rounded">
        <div className="absolute right-0 -top-8 bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
          <MdClose size="1.2rem" onClick={closeFn} />
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
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
              {items.map(
                (
                  { product_id, quantity, total_price, product }: orderProduct,
                  key: number
                ) => (
                  <tr key={`${key} ${product_id * key}`}>
                    <td className="p-4 capitalize">{product.name}</td>
                    <td className="p-4 text-center">₦ {product.price}</td>
                    <td className="p-4 text-center">{quantity}</td>
                    <td className="p-4 text-center">
                      ₦ {total_price.toLocaleString("en-Gb")}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

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
