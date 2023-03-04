import ProductsService from "@services/products.service";
import StocksService from "@services/stocks.service";
import { ERROR_500 } from "@constants/errors";
import { CORS_HEADERS } from "@constants/headers";

const getProductsList = async () => {
  console.log("GET - getProductsList");

  const headers = CORS_HEADERS;

  try {
    const { Items: productItems } = await ProductsService.getAll();
    const { Items: stockItems } = await StocksService.getAll();

    const enrichedProducts = productItems.reduce((accum, currentElem) => {
      const stockItem = stockItems.find(
        ({ product_id }) => product_id === currentElem.id
      );
      if (stockItem) {
        accum.push({ ...currentElem, count: stockItem.count });
      }

      return accum;
    }, []);

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(enrichedProducts),
    };
  } catch (error) {
    return ERROR_500;
  }
};

export default getProductsList;
