import productsService from "../services/products.service";
import { getProductsList } from "../functions";

describe("getProductsList", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return list of products and correct status code", async () => {
    // Arrange
    const testProductsList = [
      {
        id: "testId",
        title: "test",
      },
    ];
    productsService.getAll = jest.fn().mockResolvedValue(testProductsList);

    // Act
    const response = await getProductsList();
    const parsedBody = JSON.parse(response.body);

    // Assert
    expect(parsedBody).toEqual(testProductsList);
    expect(response.statusCode).toBe(200);
  });
});
