import { Stream } from "stream";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { SIGNED_URL_EXPIRES_IN } from "@constants/s3Client";

class S3ClientService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({ region: process.env.REGION });
  }

  public async getSignedUrl(commands) {
    const input = new PutObjectCommand(commands);

    return await getSignedUrl(this.s3Client, input, {
      expiresIn: SIGNED_URL_EXPIRES_IN,
    });
  }

  public async getObject(commands) {
    const input = new GetObjectCommand(commands);

    return await this.s3Client.send(input);
  }

  public getObjectAsStream(response: GetObjectCommandOutput) {
    return response.Body as Stream;
  }
}

export default new S3ClientService();
