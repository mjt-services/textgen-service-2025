import { logDebug } from "./logDebug";
import { toTextgenFetchParams } from "./toTextgenFetchParams";
import { TextDecoderStream } from "../polyfill/TextStreamPolyfill";
import { createConsumer } from "./createConsumer";
import { dataParser } from "./dataParser";
import { DEFAULT_STOP, } from "@mjt-services/textgen-common-2025";
import { Parsers } from "@mjt-engine/parse";
export const sendTextgenStreamingResponse = async ({ signal, detail, headers, send, sendError, env }) => {
    const stream = new TextDecoderStream();
    const buffer = [];
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
    logDebug("message.detail", {
        url,
        body,
        authToken,
    });
    const response = await fetch(url, {
        method: "POST",
        // signal,
        signal: finishedConsumingSignal,
        headers: {
            Authorization: `Bearer ${authToken} `,
            "Content-Type": "application/json",
        },
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
        throw new Error(`Bad response: ${response?.status}`, { cause: response });
    }
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
            sendError(error);
        },
        onDone: () => { },
        dataParser,
    });
    // send sentinel message to indicate that the stream is done
    send();
};
//# sourceMappingURL=sendTextgenStreamingResponse.js.map