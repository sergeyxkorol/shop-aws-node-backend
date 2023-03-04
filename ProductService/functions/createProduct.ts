import { v4 as uuidv4 } from "uuid";
import ProductsService from "@services/products.service";
import StocksService from "@services/stocks.service";
import { ERROR_500 } from "@constants/errors";
import { CORS_HEADERS } from "@constants/headers";

const createProduct = async (event) => {
  const data = event.body;
  const { title, description, price, count } = JSON.parse(data);
  const id = uuidv4();
  const headers = CORS_HEADERS;

  console.log(`POST - createProduct, data: ${data}`);

  try {
    const product = await ProductsService.create({
      id,
      title,
      description,
      price,
    });
    const stock = await StocksService.create({ product_id: id, count });

    if (!product || !stock) {
      return {
        headers,
        statusCode: 500,
        body: "Product was not created",
      };
    }

    return {
      headers,
      statusCode: 201,
    };
  } catch (error) {
    return ERROR_500;
  }
};

export default createProduct;
