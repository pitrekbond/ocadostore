import { useEffect, useState } from "react";
import { CartItem, Product } from "./types";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import OrderSummary from "./components/OrderSummary";
import productsData from "./products.json";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(
    productsData as Product[]
  );
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState<
    "products" | "cart" | "summary"
  >("products");

  useEffect(() => {
    fetch("/products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  console.log("gowno");

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const handleAddItem = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === productId
      );
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevItems.filter((item) => item.product.id !== productId);
      }
    });
  };

  const handleChangeQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handlePlaceOrder = () => {
    const orderData = {
      items: cartItems,
      total: cartItems.reduce(
        (sum, item) =>
          sum +
          ((item.product.price.main * 100 + item.product.price.fractional) *
            item.quantity) /
            100,
        0
      ),
      date: new Date().toISOString(),
    };
    localStorage.setItem("currentOrder", JSON.stringify(orderData));
    window.location.href = "/confirmation.html";
  };

  return (
    <div className="App">
      {currentPage === "products" && (
        <ProductList
          products={products}
          onAddToCart={handleAddToCart}
          onViewCart={() => setCurrentPage("cart")}
        />
      )}
      {currentPage === "cart" && (
        <ShoppingCart
          cartItems={cartItems}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          onChangeQuantity={handleChangeQuantity}
          onCheckout={() => setCurrentPage("summary")}
          onContinueShopping={() => setCurrentPage("products")}
        />
      )}
      {currentPage === "summary" && (
        <OrderSummary
          cartItems={cartItems}
          onPlaceOrder={handlePlaceOrder}
          onBackToCart={() => setCurrentPage("cart")}
        />
      )}
    </div>
  );
};

export default App;
