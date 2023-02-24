import ProductsService from "src/services/products.service";

const getProductsList = async () => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };

  try {
    const productsList = await ProductsService.getAll();

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(productsList),
    };
  } catch (error) {
    return {
      headers,
      statusCode: 500,
      body: "Internal server error",
    };
  }
};

export default getProductsList;
