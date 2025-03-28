import { assertValue } from "@mjt-engine/assert/dist/assertValue";
import { isDefined } from "@mjt-engine/object";
import {
  type OobaboogaTextgenRequest,
  type OpenRouterTextgenRequest,
  TEXTGEN_CHAT_TEMPLATES,
  type TextgenConnectionMap,
  Textgens,
} from "@mjt-services/textgen-common-2025";
import { getEnv } from "../getEnv";

export const toTextgenExtendedBody = (
  request: TextgenConnectionMap["textgen.generate"]["request"]
) => {
  const { body, options = {} } = request;
  const { promptStyle = "message", templateType = "chatML", stop } = options;
  const defaultModel = assertValue(getEnv().LLM_MODEL);

  const extendedBody: OobaboogaTextgenRequest & OpenRouterTextgenRequest = {
    max_tokens: 256,
    model: defaultModel,
    prompt:
      promptStyle === "raw"
        ? Textgens.chatMessagesToPromptText({
            messages: body.messages ?? [],
            messageTemplate: TEXTGEN_CHAT_TEMPLATES[templateType],
          })
        : undefined,
    ...removeUndefinedValues(body),
    messages: promptStyle === "raw" ? undefined : body.messages,
    stop,
  };
  return removeUndefinedValues(extendedBody);
};

export const removeUndefinedValues = <T extends object>(obj: T): T => {
  const cleaned = Object.entries(obj).filter(([k, v]) => isDefined(v));
  return Object.fromEntries(cleaned) as T;
};
