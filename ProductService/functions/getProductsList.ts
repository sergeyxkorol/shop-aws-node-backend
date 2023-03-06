import ProductsService from "@services/products.service";
import { ERROR_500 } from "@constants/errors";
import { CORS_HEADERS } from "@constants/headers";

const getProductsList = async () => {
  const headers = CORS_HEADERS;

  try {
    const productsList = await ProductsService.getAll();

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(productsList),
    };
  } catch (error) {
    return ERROR_500;
  }
};

export default getProductsList;
