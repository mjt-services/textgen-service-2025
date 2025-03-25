import type { TextgenConnectionMap } from "@mjt-services/textgen-common-2025";
import type { Env } from "../Env";
import { toOobaboogaTextgenFetchParams } from "./toOobaboogaTextgenFetchParams";
import { toOpenAiTextgenFetchParams } from "./toOpenAiTextgenFetchParams";

export const toTextgenFetchParams = ({
  request,
  headers,
  env,
}: {
  request: TextgenConnectionMap["textgen.generate"]["request"];
  headers?: TextgenConnectionMap["textgen.generate"]["headers"];
  env: Env;
}) => {
  const { options = {} } = request;
  const { provider = "openai" } = options;
  switch (provider) {
    case "oobabooga": {
      return toOobaboogaTextgenFetchParams({ request, headers, env });
    }
    case "openai": {
      return toOpenAiTextgenFetchParams({ request, headers, env });
    }
  }
  throw new Error(`unknown provider: ${provider}`);
};
