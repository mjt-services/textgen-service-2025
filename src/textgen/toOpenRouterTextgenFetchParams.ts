import type { TextgenConnectionMap } from "@mjt-services/textgen-common-2025";
import type { Env } from "../Env";
import { toTextgenExtendedBody } from "./toTextgenExtendedBody";

export const toOpenRouterTextgenFetchParams = ({
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
    authToken = env.OPEN_ROUTER_AUTHTOKEN,
    url = "https://openrouter.ai/api/v1/chat/completions",
  } = headers;

  return {
    url,
    body: toTextgenExtendedBody(request),
    authToken,
  };
};
