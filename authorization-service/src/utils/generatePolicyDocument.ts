import { PolicyDocument } from "aws-lambda";
import { Effect } from "@constants/effect";

export const generatePolicyDocument = (
  effect: Effect,
  resource: string
): PolicyDocument => ({
  Version: "2012-10-17",
  Statement: [
    {
      Action: "execute-api:Invoke",
      Effect: effect,
      Resource: resource,
    },
  ],
});
