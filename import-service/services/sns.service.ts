import {
  PublishCommand,
  PublishCommandInput,
  SNSClient,
} from "@aws-sdk/client-sns";

class SNSClientService {
  private snsClient: SNSClient;

  constructor() {
    this.snsClient = new SNSClient({ region: process.env.REGION });
  }

  public async publish(command: PublishCommandInput) {
    const input = new PublishCommand(command);

    return await this.snsClient.send(input);
  }
}

export default new SNSClientService();
