import { TEXTGEN_CHAT_TEMPLATES, Textgens, } from "@mjt-services/textgen-common-2025";
export const toTextgenExtendedBody = (request) => {
    console.log("toTextgenExtendedBody: request", request);
    const { body, options = {} } = request;
    const { promptStyle = "message", templateType = "chatML", stop } = options;
    const extendedBody = {
        max_tokens: 256,
        prompt: promptStyle === "raw"
            ? Textgens.chatMessagesToPromptText({
                messages: body.messages ?? [],
                messageTemplate: TEXTGEN_CHAT_TEMPLATES[templateType],
            })
            : undefined,
        ...body,
        messages: promptStyle === "raw" ? undefined : body.messages,
        stop,
    };
    return extendedBody;
};
//# sourceMappingURL=toTextgenExtendedBody.js.map