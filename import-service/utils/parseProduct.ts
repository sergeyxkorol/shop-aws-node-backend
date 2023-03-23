import { IncomingProduct } from "@models/Product";

export const parseProduct = (product: IncomingProduct) => ({
  title: product.Title,
  description: product.Description,
  price: product.Price,
});
