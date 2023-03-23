import { S3CreateEvent } from "aws-lambda";
import csvParser from "csv-parser";
import S3Service from "@services/s3.service";
import SQSService from "@services/sqs.service";

export const importFileParser = async (event: S3CreateEvent) => {
  const destinationFolder = "parsed";

  try {
    for await (const record of event.Records) {
      const s3Object: string = record.s3.object.key;

      const response = await S3Service.getObject(s3Object);
      const stream = S3Service.getObjectAsStream(response).pipe(csvParser());

      for await (const chunk of stream) {
        await SQSService.sendMessage({
          QueueUrl: process.env.SQS_URL,
          MessageBody: JSON.stringify(chunk),
        });
      }

      const [folder, name] = s3Object.split("/");
      await S3Service.copyObject(name, folder, destinationFolder);
      await S3Service.deleteObject(s3Object);

      console.log(
        `${s3Object} has been moved to the "${destinationFolder}" folder`
      );
    }
  } catch (error) {
    console.error("importFileParser error", error);
  }
};
