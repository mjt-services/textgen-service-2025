import { toLocalTextgenFetchParams } from "./toLocalTextgenFetchParams";
import { toOpenRouterTextgenFetchParams } from "./toOpenRouterTextgenFetchParams";
import type { Env } from "../Env";
import type { TextgenConnectionMap } from "@mjt-services/textgen-common-2025";

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
  const { provider = "openrouter" } = options;
  switch (provider) {
    case "local": {
      return toLocalTextgenFetchParams({ request, headers, env });
    }
    case "openrouter": {
      return toOpenRouterTextgenFetchParams({ request, headers, env });
    }
  }
  throw new Error(`unknown provider: ${provider}`);
};
