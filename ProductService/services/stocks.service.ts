import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Stock } from "@models/stock";
import BaseService from "./base.service";

class StocksService<T, D> extends BaseService<T, D> {}

export default new StocksService<Stock, null>({
  client: DynamoDBDocumentClient.from(new DynamoDBClient({})),
  tableName: process.env.STOCKS_DYNAMODB_TABLE,
  storedItemName: "stock",
});
