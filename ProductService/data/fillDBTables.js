import {
  DynamoDBClient,
  BatchWriteItemCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { products } from "./products";

const getClient = () => {
  const dynamoDBClient = new DynamoDBClient({
    region: process.env.REGION.trim(),
  });

  const marshallOptions = {
    removeUndefinedValues: true,
  };

  const unmarshallOptions = {
    wrapNumbers: false,
  };

  return DynamoDBDocumentClient.from(dynamoDBClient, {
    marshallOptions,
    unmarshallOptions,
  });
};

const generateParams = () => {
  const productsTableName = process.env.PRODUCTS.trim();
  const stocksTableName = process.env.STOCKS.trim();

  const productTableRequestItems = [];
  const stockTableRequestItems = [];

  products.forEach(({ id, title, description, price, count }) => {
    const productRequestItem = {
      PutRequest: {
        Item: {
          id: { S: id },
          title: { S: title },
          description: { S: description },
          price: { N: price.toString() },
        },
      },
    };
    const stockRequestItem = {
      PutRequest: {
        Item: {
          product_id: { S: id },
          count: { N: count.toString() },
        },
      },
    };

    productTableRequestItems.push(productRequestItem);
    stockTableRequestItems.push(stockRequestItem);
  });

  const params = {
    RequestItems: {
      [productsTableName]: productTableRequestItems,
      [stocksTableName]: stockTableRequestItems,
    },
  };

  return params;
};

const fillTables = async () => {
  const ddbDocClient = getClient();
  const params = generateParams();

  try {
    const data = await ddbDocClient.send(new BatchWriteItemCommand(params));
    console.log("Success, items inserted", data);
  } catch (error) {
    console.error(error.message);
  }
};

fillTables();
