import ProductsService from "@services/products.service";
import { ERROR_500 } from "@constants/errors";
import { CORS_HEADERS } from "@constants/headers";

const getProductById = async (event) => {
  const { productId } = event.pathParameters;
  const headers = CORS_HEADERS;

  try {
    const product = await ProductsService.getById(productId);

    if (!product) {
      return {
        headers,
        statusCode: 404,
        body: "Product not found",
      };
    }

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return ERROR_500;
  }
};

export default getProductById;
