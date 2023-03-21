import { APIGatewayTokenAuthorizerEvent } from "aws-lambda";
import { Effect } from "src/constants/effect";
import { generateResponse } from "src/utils/generateResponse";

export const basicAuthorizer = async (
  event: APIGatewayTokenAuthorizerEvent
) => {
  const { authorizationToken, methodArn } = event;

  const decodedToken: string = Buffer.from(
    authorizationToken,
    "base64"
  ).toString();
  const [userName, password] = decodedToken.split(" ");
  const storedPassword = process.env[userName];
  const effect = password === storedPassword ? Effect.Allow : Effect.Deny;

  return generateResponse(userName, effect, methodArn);
};
