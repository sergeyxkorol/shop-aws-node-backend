import ProductsService from "@services/products.service";
import StocksService from "@services/stocks.service";
import { ERROR_500 } from "@constants/errors";
import { CORS_HEADERS } from "@constants/headers";

const getProductById = async (event) => {
  const { productId } = event.pathParameters;
  const headers = CORS_HEADERS;

  console.log(`GET - getProductById, productId: ${productId}`);

  try {
    const { Item: product } = await ProductsService.getById("id", productId);
    const { Item: stockItem } = await StocksService.getById(
      "product_id",
      productId
    );

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
    console.error("getProductById error", error);

    return ERROR_500;
  }
};

export default getProductById;
