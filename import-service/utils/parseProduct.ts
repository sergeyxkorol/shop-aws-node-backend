import { IncomingProduct } from "@models/Product";

export const parseProduct = (product: IncomingProduct) => {
  return {
    title: product.Title,
    description: product.Description,
    price: product.Price,
  };
};
