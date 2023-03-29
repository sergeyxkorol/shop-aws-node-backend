import { APIGatewayTokenAuthorizerEvent } from "aws-lambda";
import { Effect } from "@constants/effect";
import { generateResponse } from "@utils/generateResponse";

export const basicAuthorizer = async (
  event: APIGatewayTokenAuthorizerEvent
) => {
  const { authorizationToken, methodArn } = event;
  let userName = "";
  let effect: Effect;

  try {
    const [_, encodedToken] = authorizationToken.split(" ");
    const decodedToken: string = Buffer.from(encodedToken, "base64").toString(
      "utf-8"
    );
    const [name, password] = decodedToken.split(":");
    const isCorrectToken = authorizationToken && name && password;
    const storedPassword = process.env[name];
    const isValidCredentials = isCorrectToken && password === storedPassword;

    userName = name;
    effect = isValidCredentials ? Effect.Allow : Effect.Deny;
  } catch (error) {
    console.error(error);

    effect = Effect.Deny;
  } finally {
    return generateResponse(userName, effect, methodArn);
  }
};
