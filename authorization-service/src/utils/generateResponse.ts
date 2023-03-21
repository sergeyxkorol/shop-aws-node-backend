import { Effect } from "../constants/effect";
import { generatePolicyDocument } from "./generatePolicyDocument";

export const generateResponse = (
  principalId: string,
  effect: Effect,
  resource: string
) => ({
  principalId,
  policyDocument: generatePolicyDocument(effect, resource),
});
