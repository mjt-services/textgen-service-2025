import { assertValue } from "@mjt-engine/assert/dist/assertValue";
import { isDefined } from "@mjt-engine/object";
import {
  type OobaboogaTextgenRequest,
  type OpenRouterTextgenRequest,
  type TextgenConnectionMap,
} from "@mjt-services/textgen-common-2025";
import { getEnv } from "../getEnv";

export const toTextgenExtendedBody = (
  request: TextgenConnectionMap["textgen.generate"]["request"]
) => {
  const { body, options = {} } = request;
  const { stop } = options;
  const defaultModel = assertValue(getEnv().LLM_MODEL);

  const extendedBody: OobaboogaTextgenRequest & OpenRouterTextgenRequest = {
    max_tokens: 256,
    model: defaultModel,
    ...removeUndefinedValues(body),
    stop,
  };
  return removeUndefinedValues(extendedBody);
};

export const removeUndefinedValues = <T extends object>(obj: T): T => {
  const cleaned = Object.entries(obj).filter(([k, v]) => isDefined(v));
  return Object.fromEntries(cleaned) as T;
};
