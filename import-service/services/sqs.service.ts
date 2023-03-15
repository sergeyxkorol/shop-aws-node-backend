import {
  SQSClient,
  SendMessageCommand,
  SendMessageCommandInput,
} from "@aws-sdk/client-sqs";

class SQSClientService {
  private sqsClient: SQSClient;

  constructor() {
    this.sqsClient = new SQSClient({ region: process.env.REGION });
  }

  public async sendMessage(commands: SendMessageCommandInput) {
    const input = new SendMessageCommand(commands);

    return await this.sqsClient.send(input);
  }
}

export default new SQSClientService();
