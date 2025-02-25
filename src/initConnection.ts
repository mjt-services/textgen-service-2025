import { Messages } from "@mjt-engine/message";
import type { Env } from "./Env";

import { textgenGenerateListener } from "./textgen/textgenGenerateListener";
import type { TextgenConnectionMap } from "@mjt-services/textgen-common-2025";
import { assertValue } from "@mjt-engine/assert";
import { getEnv } from "./getEnv";

export const initConnection = async () => {
  const env = getEnv();
  const url = assertValue(env.NATS_URL);
  console.log("NATS_URL", url);
  const con = await Messages.createConnection<TextgenConnectionMap, Env>({
    subscribers: {
      "textgen.generate": textgenGenerateListener,
    },
    options: { log: console.log },
    server: [url],
    token: env.NATS_AUTH_TOKEN,
    env,
  });
  console.log("initConnection: init complete");
  return con;
};
