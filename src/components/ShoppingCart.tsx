import { CartItem } from "../types";

interface ShoppingCartProps {
  cartItems: CartItem[];
  onAddItem: (productId: number) => void;
  onRemoveItem: (productId: number) => void;
  onChangeQuantity: (productId: number, quantity: number) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cartItems,
  onAddItem,
  onRemoveItem,
  onChangeQuantity,
  onCheckout,
  onContinueShopping,
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
      <h1>Shopping Cart</h1>
      <button onClick={onContinueShopping}>Continue Shopping</button>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.product.id}>
                <h3>{item.product.name}</h3>
                <p>
                  Price: ${item.product.price.main}.
                  {item.product.price.fractional.toString().padStart(2, "0")}
                </p>
                <div>
                  <button onClick={() => onRemoveItem(item.product.id)}>
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      onChangeQuantity(
                        item.product.id,
                        parseInt(e.target.value) || 0
                      )
                    }
                    min="1"
                  />
                  <button onClick={() => onAddItem(item.product.id)}>+</button>
                </div>
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
          <button onClick={onCheckout}>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
