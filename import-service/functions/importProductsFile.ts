import S3Service from "@services/s3.service";
import { CORS_HEADERS } from "@constants/headers";
import { ERROR_500 } from "@constants/errors";
import { APIGatewayProxyEvent } from "aws-lambda";

export const importProductsFile = async (event: APIGatewayProxyEvent | any) => {
  try {
    const path = `uploaded/${event.queryStringParameters?.name}`;
    const headers = CORS_HEADERS;

    const signedUrl = await S3Service.getSignedUrl(path);

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
