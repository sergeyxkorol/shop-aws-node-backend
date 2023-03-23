module.exports = {
  clearMocks: false,
  roots: ["<rootDir>"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  moduleNameMapper: {
    "@services/s3.service": "<rootDir>/services/s3.service",
    "@services/products.service": "<rootDir>/services/products.service",
    "@services/sns.service": "<rootDir>/services/sns.service",
    "@services/sqs.service": "<rootDir>/services/sqs.service",
    "@constants/s3Client": "<rootDir>/constants/s3Client",
    "@constants/headers": "<rootDir>/constants/headers",
    "@constants/errors": "<rootDir>/constants/errors",
    "@functions/index": "<rootDir>/functions/index",
    "@utils/parseProduct": "<rootDir>/utils/parseProduct",
  },
};
