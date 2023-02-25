import productsService from "../services/products.service";
import { getProductById } from "../functions";

describe("getProductById", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return a product and correct status code", async () => {
    // Arrange
    const testId = "testId";
    const testProduct = {
      id: testId,
      title: "test",
    };
    const eventData = { pathParameters: { productId: testId } };
    productsService.getById = jest.fn().mockResolvedValue(testProduct);

    // Act
    const response = await getProductById(eventData);
    const parsedBody = JSON.parse(response.body);

    // Assert
    expect(parsedBody).toEqual(testProduct);
    expect(response.statusCode).toBe(200);
  });

  it("should return 404 status code", async () => {
    // Arrange
    const testId = "testId";
    const testProduct = undefined;
    const eventData = { pathParameters: { productId: testId } };
    productsService.getById = jest.fn().mockResolvedValue(testProduct);

    // Act
    const response = await getProductById(eventData);

    // Assert
    expect(response.statusCode).toBe(404);
  });
});
