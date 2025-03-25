import { isDefined } from "@mjt-engine/object";
import {
  type TextgenConnectionMap,
  type OobaboogaTextgenRequest,
  type OpenRouterTextgenRequest,
  TEXTGEN_CHAT_TEMPLATES,
  Textgens,
} from "@mjt-services/textgen-common-2025";

export const toTextgenExtendedBody = (
  request: TextgenConnectionMap["textgen.generate"]["request"]
) => {
  console.log("toTextgenExtendedBody: request", request);
  const { body, options = {} } = request;
  const { promptStyle = "message", templateType = "chatML", stop } = options;

  const extendedBody: OobaboogaTextgenRequest & OpenRouterTextgenRequest = {
    max_tokens: 256,
    prompt:
      promptStyle === "raw"
        ? Textgens.chatMessagesToPromptText({
            messages: body.messages ?? [],
            messageTemplate: TEXTGEN_CHAT_TEMPLATES[templateType],
          })
        : undefined,
    ...body,
    messages: promptStyle === "raw" ? undefined : body.messages,
    stop,
  };
  return Object.fromEntries(
    Object.entries(extendedBody).filter((k, v) => isDefined(v))
  );
};
