import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

class StocksService {
  private client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
  private tableName = process.env.STOCKS_DYNAMODB_TABLE;

  private async send(command, errorMessage) {
    try {
      return await this.client.send(command);
    } catch (error) {
      throw new Error(errorMessage);
    }
  }

  public async getAll() {
    const command = new ScanCommand({
      TableName: this.tableName,
    });

    return this.send(command, "Cannot retreive stocks");
  }

  public async getById(productId: string) {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        productId,
      },
    });

    return this.send(
      command,
      `Cannot retreive stock with productId: ${productId}`
    );
  }

  public async create(data) {
    const { product_id, count } = data;
    const command = new PutCommand({
      TableName: this.tableName,
      Item: { product_id, count },
    });

    return this.send(command, `Cannot create a stock with data: ${data}`);
  }
}

export default new StocksService();
