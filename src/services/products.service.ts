import { products } from "src/data/products";
import { Product } from "src/models/product";

class ProductsService {
  async getAll(): Promise<Product[] | {}[]> {
    return Promise.resolve(products);
  }

  async getById(id: string): Promise<Product | {}> {
    const product = products.find((product: Product) => product.id === id);

    return Promise.resolve(product);
  }
}

export default new ProductsService();
