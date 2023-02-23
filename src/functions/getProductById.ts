import ProductsService from "src/services/products.service";

const getProductById = async (event) => {
  const { productId } = event.pathParams;

  try {
    const product = await ProductsService.getById(productId);

    if (!product) {
      return {
        headers: {
          "Content-Type": "text/plain",
        },
        statusCode: 404,
        body: "Product not found",
      };
    }

    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      headers: {
        "Content-Type": "text/plain",
      },
      statusCode: 500,
      body: "Internal server error",
    };
  }
};

export default getProductById;
