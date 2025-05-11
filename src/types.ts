export type Price = {
  main: number;
  fractional: number;
};

export type Product = {
  id: number;
  name: string;
  price: Price;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
