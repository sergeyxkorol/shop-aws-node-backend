import { Stream } from "stream";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  CopyObjectCommand,
  CopyObjectCommandInput,
  DeleteObjectCommand,
  GetObjectCommand,
  GetObjectCommandInput,
  GetObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { SIGNED_URL_EXPIRES_IN } from "@constants/s3Client";

class S3ClientService {
  private s3Client: S3Client;
  private bucket: string;

  constructor() {
    this.s3Client = new S3Client({ region: process.env.REGION });
    this.bucket = process.env.BUCKET;
  }

  public async getSignedUrl(key: string) {
    const commands: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
    };
    const input = new PutObjectCommand(commands);

    return await getSignedUrl(this.s3Client, input, {
      expiresIn: SIGNED_URL_EXPIRES_IN,
    });
  }

  public async getObject(key: string) {
    const commands: GetObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
    };

    const input = new GetObjectCommand(commands);

    return await this.s3Client.send(input);
  }

  public getObjectAsStream(response: GetObjectCommandOutput) {
    return response.Body as Stream;
  }

  public async copyObject(
    key: string,
    sourceFolder: string,
    destinationFolder: string
  ) {
    const commands: CopyObjectCommandInput = {
      Bucket: this.bucket,
      Key: `${destinationFolder}/${key}`,
      CopySource: `${this.bucket}/${sourceFolder}/${key}`,
    };

    const input = new CopyObjectCommand(commands);

    return await this.s3Client.send(input);
  }

  public async deleteObject(key: string) {
    const commands = {
      Bucket: this.bucket,
      Key: key,
    };

    const input = new DeleteObjectCommand(commands);

    return await this.s3Client.send(input);
  }
}

export default new S3ClientService();
