import { Messages } from "@mjt-engine/message";
import type { Env } from "./Env";

import { textgenGenerateListener } from "./textgen/textgenGenerateListener";
import type { TextgenConnectionMap } from "@mjt-services/textgen-common-2025";
import { assertValue } from "@mjt-engine/assert";

export const initConnection = async (env: Env) => {
  const url = assertValue(env.NATS_URL);
  console.log("NATS_URL", url);

  await Messages.createConnection<TextgenConnectionMap, Env>({
    subscribers: {
      "textgen.generate": textgenGenerateListener,
    },
    options: { log: console.log },
    server: [url],
    env,
  });
  console.log("initConnection: init complete");
};
