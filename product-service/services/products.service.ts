import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Product } from "@models/product";
import { Stock } from "@models/stock";
import BaseService from "./base.service";

class ProductsService<T, D> extends BaseService<T, D> {}

export default new ProductsService<Product, Stock>({
  client: DynamoDBDocumentClient.from(new DynamoDBClient({})),
  tableName: process.env.PRODUCTS_DYNAMODB_TABLE,
  relatedTableName: process.env.STOCKS_DYNAMODB_TABLE,
  storedItemName: "product",
});
