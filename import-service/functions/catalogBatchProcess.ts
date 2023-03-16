import { SQSEvent } from "aws-lambda";
import { ERROR_500 } from "@constants/errors";
import { IncomingProduct } from "@models/Product";
import ProductsService from "@services/products.service";
import SnsService from "@services/sns.service";
import { parseProduct } from "@utils/parseProduct";

export const catalogBatchProcess = async (event: SQSEvent | any) => {
  try {
    for await (const record of event.Records) {
      const parsedRecord: IncomingProduct = JSON.parse(record.body);
      const parsedProduct = parseProduct(parsedRecord);

      await ProductsService.create(parsedProduct);

      await SnsService.publish({
        Subject: "New products added",
        Message: JSON.stringify(parsedProduct),
        MessageAttributes: {
          title: {
            DataType: "String",
            StringValue: parsedProduct.title,
          },
        },
        TopicArn: process.env.SNS_ARN,
      });
    }
  } catch (error) {
    console.error("catalogBatchProcess error", error);

    return ERROR_500;
  }
};
