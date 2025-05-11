declare module "*.json" {
  const value: {
    id: number;
    name: string;
    price: {
      main: number;
      fractional: number;
    };
  }[];
  export default value;
}
