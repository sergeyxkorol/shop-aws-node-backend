import ProductsService from "src/services/products.service";

const getProductById = async (event) => {
  const { productId } = event.pathParameters;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };

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
    return {
      headers,
      statusCode: 500,
      body: "Internal server error",
    };
  }
};

export default getProductById;
