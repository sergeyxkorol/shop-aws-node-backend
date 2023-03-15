import { v4 as uuidv4 } from "uuid";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Product } from "@models/Product";

type Props = {
  client: DynamoDBDocumentClient;
  tableName: string;
};

class ProductsService {
  private client: DynamoDBDocumentClient;
  private tableName: string;

  constructor({ client, tableName }: Props) {
    this.client = client;
    this.tableName = tableName;
  }

  public async create(data: Product) {
    const id = uuidv4();

    const command = new PutCommand({
      TableName: this.tableName,
      Item: { id, ...data },
    });

    return this.client.send(command);
  }
}

export default new ProductsService({
  client: DynamoDBDocumentClient.from(new DynamoDBClient({})),
  tableName: process.env.PRODUCTS_DYNAMODB_TABLE,
});
