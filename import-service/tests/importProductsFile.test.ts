import S3Service from "../services/s3.service";
import { importProductsFile } from "../functions";

describe("getProductsList", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return a signed URL and correct status code", async () => {
    // Arrange
    const testSignedUrl = "http://test_url.com";
    S3Service.getSignedUrl = jest.fn().mockResolvedValue(testSignedUrl);
    const event = {
      queryStringParameters: {
        name: "test.csv",
      },
    };

    // Act
    const response = await importProductsFile(event);

    // Assert
    expect(response.body).toEqual(testSignedUrl);
    expect(response.statusCode).toBe(200);
  });
});
