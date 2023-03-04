import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

class ProductsService {
  private client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
  private tableName = process.env.PRODUCTS_DYNAMODB_TABLE;

  async getAll() {
    const command = new ScanCommand({
      TableName: this.tableName,
    });

    try {
      return await this.client.send(command);
    } catch (error) {
      throw new Error("Cannot retreive products");
    }
  }

  async getById(id: string) {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        id,
      },
    });

    try {
      return await this.client.send(command);
    } catch (error) {
      throw new Error(`Cannot retreive product with id: ${id}`);
    }
  }

  async create(data) {
    const { id, title, description, price } = data;
    const command = new PutCommand({
      TableName: this.tableName,
      Item: { id, title, description, price },
    });

    try {
      return await this.client.send(command);
    } catch (error) {
      throw new Error(`Cannot create a product with data: ${data}`);
    }
  }
}

export default new ProductsService();
