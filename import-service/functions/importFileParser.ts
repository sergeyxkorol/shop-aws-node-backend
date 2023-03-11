import { S3CreateEvent } from "aws-lambda";
import csvParser from "csv-parser";
import S3Service from "@services/s3.service";

export const importFileParser = async (event: S3CreateEvent) => {
  try {
    const { BUCKET } = process.env;

    for await (const record of event.Records) {
      const s3Object = record.s3.object.key;
      const params = {
        Bucket: BUCKET,
        Key: s3Object,
      };
      const response = await S3Service.getObject(params);

      const stream = S3Service.getObjectAsStream(response).pipe(csvParser());

      for await (const chunk of stream) {
        console.log(`${s3Object} - stream chunk:`, chunk);
      }

      console.log(`${s3Object} - Parsing completed`);
    }
  } catch (error) {
    console.error("importFileParser error", error);
  }
};
