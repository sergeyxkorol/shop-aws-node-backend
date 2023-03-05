import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Product } from "@models/product";
import BaseService from "./base.service";

class ProductsService<T> extends BaseService<T> {}

export default new ProductsService<Product>(
  DynamoDBDocumentClient.from(new DynamoDBClient({})),
  process.env.PRODUCTS_DYNAMODB_TABLE,
  "product"
);
