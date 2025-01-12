// import { process } from "https://deno.land/std/node/process.ts";
// import * as process from "https://deno.land/std@0.122.0/node/process.ts"; // specify a known working version

export type Env = Partial<{
  NATS_URL: string;

  OPEN_ROUTER_AUTH_TOKEN: string;
  LOCAL_AUTH_TOKEN: string;
  NATS_AUTH_TOKEN: string;
}>;
