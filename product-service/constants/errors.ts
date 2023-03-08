import { CORS_HEADERS } from "./headers";

export const ERROR_500 = {
  headers: CORS_HEADERS,
  statusCode: 500,
  body: "Internal server error",
};
