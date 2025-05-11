import { Product } from "../types";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewCart: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  onViewCart,
}) => {
  return (
    <div>
      <h1>Product List</h1>
      <button onClick={onViewCart}>View Cart</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>
              Price: ${product.price.main}.
              {product.price.fractional.toString().padStart(2, "0")}
            </p>
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
