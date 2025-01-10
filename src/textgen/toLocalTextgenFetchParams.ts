import { toTextgenExtendedBody } from "./toTextgenExtendedBody";
import type { Env } from "../Env";
import type { TextgenConnectionMap } from "@mjt-services/textgen-common-2025";

export const toLocalTextgenFetchParams = ({
  request,
  headers = {},
  env,
}: {
  request: TextgenConnectionMap["textgen.generate"]["request"];
  headers?: TextgenConnectionMap["textgen.generate"]["headers"];
  env: Env;
}) => {
  const { options } = request;
  const {
    authToken = env.LOCAL_AUTHTOKEN,
    url = options?.promptStyle === "raw"
      ? "http://10.0.0.9:5000/v1/completions"
      : "http://10.0.0.9:5000/v1/chat/completions",
  } = headers;

  return {
    url,
    body: toTextgenExtendedBody(request),
    authToken,
  };
};
