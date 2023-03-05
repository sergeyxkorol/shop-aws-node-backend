import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Stock } from "@models/stock";
import BaseService from "./base.service";

class StocksService<T> extends BaseService<T> {}

export default new StocksService<Stock>(
  DynamoDBDocumentClient.from(new DynamoDBClient({})),
  process.env.STOCKS_DYNAMODB_TABLE,
  "stock"
);
