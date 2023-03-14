import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb";

type Props = {
  client: DynamoDBDocumentClient;
  tableName: string;
  relatedTableName?: string;
  storedItemName: string;
};

class BaseService<T, D> {
  private client: DynamoDBDocumentClient;
  private tableName: string;
  private relatedTableName: string;
  private storedItemName: string;

  constructor({ client, tableName, relatedTableName, storedItemName }: Props) {
    this.client = client;
    this.tableName = tableName;
    this.relatedTableName = relatedTableName;
    this.storedItemName = storedItemName;
  }

  private async send(command, errorMessage: string): Promise<any> {
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

  public async create(data: T) {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: data,
    });

    return this.send(
      command,
      `Cannot create a ${this.storedItemName} with data: ${data}`
    );
  }

  public async createTransactional(mainTableData: T, relatedTableData: D) {
    const mainTableDataString = JSON.stringify(mainTableData);
    const relatedTableDataString = JSON.stringify(mainTableData);
    const command = new TransactWriteCommand({
      TransactItems: [
        {
          Put: { Item: { ...mainTableData }, TableName: this.tableName },
        },
        {
          Put: {
            Item: { ...relatedTableData },
            TableName: this.relatedTableName,
          },
        },
      ],
    });

    return this.send(
      command,
      `Cannot create a ${this.storedItemName} with mainTableData: ${mainTableDataString} and relatedTableData: ${relatedTableDataString}`
    );
  }
}

export default BaseService;
