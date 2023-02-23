import ProductsService from "src/services/products.service";

const getProductsList = async () => {
  try {
    const productsList = await ProductsService.getAll();

    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      statusCode: 200,
      body: JSON.stringify(productsList),
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

export default getProductsList;
