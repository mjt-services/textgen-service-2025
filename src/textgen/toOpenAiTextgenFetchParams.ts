import type { TextgenConnectionMap } from "@mjt-services/textgen-common-2025";
import type { Env } from "../Env";
import { toTextgenExtendedBody } from "./toTextgenExtendedBody";

export const toOpenAiTextgenFetchParams = ({
  request,
  headers = {},
  env,
}: {
  request: TextgenConnectionMap["textgen.generate"]["request"];
  headers?: TextgenConnectionMap["textgen.generate"]["headers"];
  env: Env;
}) => {
  console.log("toOpenRouterTextgenFetchParams: env", env);
  const {
    authToken = env.LLM_AUTH_TOKEN,
    // url = "https://openrouter.ai/api/v1/chat/completions",
    // url = `${envUrl}/api/v1/chat/completions`,
    // url = envUrl,
    url = env.LLM_URL,
  } = headers;

  return {
    url,
    body: toTextgenExtendedBody(request),
    authToken,
  };
};
