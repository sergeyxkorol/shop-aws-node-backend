import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  ServiceOutputTypes,
} from "@aws-sdk/lib-dynamodb";

class BaseService<T> {
  private client: DynamoDBDocumentClient;
  private tableName: string;
  private storedItemName: string;

  constructor(
    client: DynamoDBDocumentClient,
    tableName: string,
    storedItemName: string
  ) {
    this.client = client;
    this.tableName = tableName;
    this.storedItemName = storedItemName;
  }

  private async send(command, errorMessage): Promise<any> {
    try {
      return await this.client.send(command);
    } catch (error) {
      console.log("error", error);

      throw new Error(errorMessage);
    }
  }

  public async getAll(): Promise<{ Items: T[] }> {
    const command = new ScanCommand({
      TableName: this.tableName,
    });

    return this.send(command, `Cannot retreive ${this.storedItemName}s`);
  }

  public async getById(key: string, value: string): Promise<{ Item: T }> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        [key]: value,
      },
    });

    return this.send(
      command,
      `Cannot retreive a ${this.storedItemName} with ${key}: ${value}`
    );
  }

  public async create(data) {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: data,
    });

    return this.send(
      command,
      `Cannot create a ${this.storedItemName} with data: ${data}`
    );
  }
}

export default BaseService;
