import * as products from "src/mocks/products.json";
import { Product } from "src/types/product";

class ProductsService {
  async getAll(): Promise<Product[] | {}[]> {
    return Promise.resolve(products);
  }

  async getById(id: string): Promise<Product | {}> {
    const product = products.find((product: Product) => product.id === id);

    if (!product) {
      return Promise.reject();
    }

    return Promise.resolve(product);
  }
}

export default new ProductsService();
