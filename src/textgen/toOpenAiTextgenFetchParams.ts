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
  const { authToken = env.LLM_AUTH_TOKEN, url = env.LLM_URL } = headers;

  return {
    url,
    body: toTextgenExtendedBody(request),
    authToken,
  };
};
