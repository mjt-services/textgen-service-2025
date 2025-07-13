import { logDebug } from "./logDebug";
import { toTextgenFetchParams } from "./toTextgenFetchParams";

import { TextDecoderStream } from "../polyfill/TextStreamPolyfill";

import type { Env } from "../Env";
import { createConsumer } from "./createConsumer";
import { dataParser } from "./dataParser";
import type { ConnectionListener } from "@mjt-engine/message";
import {
  type TextgenConnectionMap,
  DEFAULT_STOP,
} from "@mjt-services/textgen-common-2025";
import { Parsers } from "@mjt-engine/parse";
import { Asserts } from "@mjt-engine/assert";
import { isDefined } from "@mjt-engine/object";
import { streamNdJsonResponse } from "./streamNdJsonResponse";
export const sendTextgenStreamingResponse: ConnectionListener<
  TextgenConnectionMap,
  "textgen.generate",
  Env
> = async ({ signal, detail, headers, send, sendError, env }) => {
  const finishedConsumingAbortController = new AbortController();
  const finishedConsumingSignal = finishedConsumingAbortController.signal;
  const onAbort = () => {
    finishedConsumingAbortController.abort();
  };
  signal.addEventListener("abort", onAbort);
  finishedConsumingSignal.addEventListener("abort", () => {
    console.log("finishedConsumingSignal aborted");
  });
  const { authToken, body, url } = toTextgenFetchParams({
    request: detail,
    headers,
    env,
  });

  // console.log(JSON.stringify(body.messages, null, 2));
  const response = await fetch(Asserts.assertValue(url), {
    method: "POST",
    signal: finishedConsumingSignal,
    headers: [
      isDefined(authToken)
        ? (["Authorization", `Bearer ${authToken} `] as [string, string])
        : undefined,
      ["Content-Type", "application/json"] as [string, string],
    ].filter(isDefined),
    body: JSON.stringify(body),
  })
    .catch((error) => {
      console.log(error);
      sendError(error);
      return undefined;
    })
    .finally(() => {
      if (signal) {
        signal.removeEventListener("abort", onAbort);
      }
    });
  if (!response || !response.ok || !response.body) {
    throw new Error(`Bad response: ${response?.status}`, { cause: detail });
  }
  const contentType = response.headers.get("Content-Type");

  const buffer: string[] = [];
  if (contentType === "application/x-ndjson") {
    await streamNdJsonResponse(response, {
      onMessage: (chunk, full) => {
        console.log("onMessage", { chunk, full });
        buffer.push(chunk);
        send({ delta: chunk, done: full?.done, text: buffer.join("") });
      },
      onDone: () => {
        console.log("onDone");
        send({ text: buffer.join(""), done: true });
      },
      onError: (error) => {
        console.error(error);
        sendError(error);
      },
    });
  } else {
    const stream = new TextDecoderStream();
    const pipe = response.body.pipeThrough(stream);
    const reader = pipe.getReader();

    const { stop = [], stopAfter = [] } = detail.options ?? {};
    await Parsers.createSseParser({
      signal,

      consumer: createConsumer({
        buffer,
        finishedConsumingAbortController,
        send,
        stop: [...DEFAULT_STOP, ...stop],
        stopAfter,
      }),
      reader,
      onError: async (error) => {
        console.error(error);
        sendError(error);
      },
      onDone: () => {},
      dataParser,
    });
  }

  // send sentinel message to indicate that the stream is done
  send();
};
