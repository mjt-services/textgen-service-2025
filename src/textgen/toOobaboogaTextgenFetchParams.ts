import { Asserts } from "@mjt-engine/assert";
import type { TextgenConnectionMap } from "@mjt-services/textgen-common-2025";
import type { Env } from "../Env";
import { getEnv } from "../getEnv";
import { toTextgenExtendedBody } from "./toTextgenExtendedBody";

export const toOobaboogaTextgenFetchParams = ({
  request,
  headers = {},
  env,
}: {
  request: TextgenConnectionMap["textgen.generate"]["request"];
  headers?: TextgenConnectionMap["textgen.generate"]["headers"];
  env: Env;
}) => {
  const { options } = request;
  const envUrl = Asserts.assertValue(getEnv().LLM_URL);
  const {
    authToken = env.LOCAL_AUTH_TOKEN,
    url = options?.promptStyle === "raw"
      ? `${envUrl}/v1/completions`
      : `${envUrl}/v1/chat/completions`,
  } = headers;

  return {
    url,
    body: toTextgenExtendedBody(request),
    authToken,
  };
};
