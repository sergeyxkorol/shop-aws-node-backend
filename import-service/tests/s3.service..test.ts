import { mockClient } from "aws-sdk-client-mock";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import S3Service from "../services/s3.service";

jest.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: jest
    .fn()
    .mockResolvedValue("http://test-signed.url/upload?name=test_object.csv"),
}));

describe("S3Service", () => {
  let s3Mock;

  beforeEach(() => {
    s3Mock = mockClient(S3Client);
  });

  afterEach(() => {
    s3Mock.reset();
  });

  it("should return a signed URL", async () => {
    // Arrange
    process.env = {
      REGION: "us-east-1",
      BUCKET: "test",
    };
    const key = "test_object.csv";
    const testResponse = "http://test-signed.url/upload?name=test_object.csv";
    s3Mock.on(PutObjectCommand).resolves({});

    // Act
    const result = await S3Service.getSignedUrl(key);

    // Assert
    expect(result).toEqual(testResponse);
  });
});
