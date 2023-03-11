module.exports = {
  clearMocks: false,
  roots: ["<rootDir>"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  moduleNameMapper: {
    "@services/s3.service": "<rootDir>/services/s3.service",
    "@constants/s3Client": "<rootDir>/constants/s3Client",
    "@constants/headers": "<rootDir>/constants/headers",
    "@constants/errors": "<rootDir>/constants/errors",
  },
};
