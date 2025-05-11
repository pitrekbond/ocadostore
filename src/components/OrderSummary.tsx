import { CartItem } from "../types";

interface OrderSummaryProps {
  cartItems: CartItem[];
  onPlaceOrder: () => void;
  onBackToCart: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  onPlaceOrder,
  onBackToCart,
}) => {
  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      ((item.product.price.main * 100 + item.product.price.fractional) *
        item.quantity) /
        100,
    0
  );

  return (
    <div>
      <h1>Order Summary</h1>
      <button onClick={onBackToCart}>Back to Cart</button>
      <ul>
        {cartItems.map((item) => (
          <li key={item.product.id}>
            <h3>{item.product.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>
              Price: ${item.product.price.main}.
              {item.product.price.fractional.toString().padStart(2, "0")}
            </p>
            <p>
              Subtotal: $
              {(
                (item.quantity *
                  (item.product.price.main * 100 +
                    item.product.price.fractional)) /
                100
              ).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={onPlaceOrder}>Place Order</button>
    </div>
  );
};

export default OrderSummary;
