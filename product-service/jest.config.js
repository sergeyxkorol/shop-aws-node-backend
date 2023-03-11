module.exports = {
  clearMocks: false,
  roots: ["<rootDir>"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  moduleNameMapper: {
    "@data/products": "<rootDir>/data/products",
    "@models/product": "<rootDir>/models/product",
    "@services/products.service": "<rootDir>/services/products.service",
    "@services/stocks.service": "<rootDir>/services/stocks.service",
    "@constants/errors": "<rootDir>/constants/errors",
    "@constants/headers": "<rootDir>/constants/headers",
  },
};
