import ProductsService from "../services/products.service";
import SnsService from "../services/sns.service";
import { catalogBatchProcess } from "../functions";

describe("catalogBatchProcess", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call ProductsService.create and SnsService.publish methods with proper arguments", async () => {
    // Arrange
    process.env.SNS_ARN = "testArn";
    SnsService.publish = jest
      .fn()
      .mockImplementation((data) => Promise.resolve(data));
    ProductsService.create = jest
      .fn()
      .mockImplementation((data) => Promise.resolve(data));

    const event = {
      Records: [
        {
          body: '{"Title": "My new product 1", "Description": "Test", "Price": "123", "Count": "69"}',
        },
      ],
    };
    const testCreatePayload = {
      description: "Test",
      price: "123",
      title: "My new product 1",
    };
    const testPublishPayload = {
      Subject: "New products added",
      Message:
        '{"title":"My new product 1","description":"Test","price":"123"}',
      MessageAttributes: {
        title: {
          DataType: "String",
          StringValue: "My new product 1",
        },
      },
      TopicArn: "testArn",
    };

    // Act
    await catalogBatchProcess(event);

    // Assert
    expect(ProductsService.create).toHaveBeenCalledWith(testCreatePayload);
    expect(SnsService.publish).toHaveBeenCalledWith(testPublishPayload);
  });
});
