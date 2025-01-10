// import { process } from "https://deno.land/std/node/process.ts";
// import * as process from "https://deno.land/std@0.122.0/node/process.ts"; // specify a known working version

export type Env = Partial<{
  NATS_URL: string;

  OPEN_ROUTER_AUTHTOKEN: string;
  LOCAL_AUTHTOKEN: string;
}>;
