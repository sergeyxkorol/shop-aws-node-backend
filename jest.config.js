module.exports = {
  clearMocks: false,
  roots: ["<rootDir>"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  moduleNameMapper: {
    "@data/products": "<rootDir>/ProductService/data/products",
    "@models/products": "<rootDir>/ProductService/models/products",
    "@services/products.service":
      "<rootDir>/ProductService/services/products.service",
  },
};
