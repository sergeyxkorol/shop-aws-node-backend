module.exports = {
  clearMocks: false,
  roots: ["<rootDir>"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  moduleNameMapper: {
    "@data/products": "<rootDir>/src/data/products",
    "@models/products": "<rootDir>/src/models/products",
    "@services/products.service": "<rootDir>/src/services/products.service",
  },
};
