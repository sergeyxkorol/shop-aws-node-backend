import ProductsService from "@services/products.service";
import StocksService from "@services/stocks.service";
import { ERROR_500 } from "@constants/errors";
import { CORS_HEADERS } from "@constants/headers";

const getProductById = async (event) => {
  console.log("GET - getProductById");

  const { productId } = event.pathParameters;
  const headers = CORS_HEADERS;

  try {
    const { Item: product } = await ProductsService.getById(productId);
    const { Item: stockItem } = await StocksService.getById(productId);

    if (!product || !stockItem) {
      return {
        headers,
        statusCode: 404,
        body: "Product not found",
      };
    }

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ ...product, count: stockItem.count }),
    };
  } catch (error) {
    return ERROR_500;
  }
};

export default getProductById;
