// import type { AppMessageListener } from "../AppMessageListener";
// import { Env } from "../Env";
// import type { OpenRouterTextgenResponse } from "../app-common/3rd-party/open-router/OpenRouterTextgenResponse";

// export const sendTextgenNonStreamingResponse: AppMessageListener<
//   "textgen:request"
// > = async ({ message, signal, send }) => {
//   const url = "https://openrouter.ai/api/v1/chat/completions";
//   const authToken = Env.OPEN_ROUTER_AUTHTOKEN;
//   const body = JSON.stringify(message.detail);

//   const resp = await fetch(url, {
//     method: "POST",
//     signal,
//     headers: {
//       Authorization: `Bearer ${authToken} `,
//       "Content-Type": "application/json",
//     },
//     body,
//   });
//   if (!resp.ok) {
//     throw new Error(`Bad response: ${resp.status}`, { cause: resp });
//   }
//   const detail = (await resp.json()) satisfies OpenRouterTextgenResponse;
//   send({
//     type: "textgen:response",
//     detail,
//   });
// };
