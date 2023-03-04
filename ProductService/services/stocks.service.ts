import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

class StocksService {
  private client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
  private tableName = process.env.STOCKS_DYNAMODB_TABLE;

  async getAll() {
    const command = new ScanCommand({
      TableName: this.tableName,
    });

    try {
      return await this.client.send(command);
    } catch (error) {
      throw new Error("Cannot retreive stocks");
    }
  }

  async getById(productId: string) {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        productId,
      },
    });

    try {
      return await this.client.send(command);
    } catch (error) {
      throw new Error(`Cannot retreive stock with productId: ${productId}`);
    }
  }
}

export default new StocksService();
