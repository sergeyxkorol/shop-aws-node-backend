import { APIGatewayProxyEvent } from "aws-lambda";
import S3Service from "@services/s3.service";
import { CORS_HEADERS } from "@constants/headers";
import { ERROR_500 } from "@constants/errors";

export const importProductsFile = async (event: APIGatewayProxyEvent) => {
  try {
    const fileName = event.queryStringParameters?.name;
    const path = `uploaded/${fileName}`;
    const { BUCKET } = process.env;
    const headers = CORS_HEADERS;
    const params = { Bucket: BUCKET, Key: path };

    const signedUrl = await S3Service.getSignedUrl(params);

    return {
      headers,
      statusCode: 200,
      body: signedUrl,
    };
  } catch (error) {
    console.error("importProductsFile error", error);

    return ERROR_500;
  }
};
