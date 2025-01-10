import type { ConnectionListener } from "@mjt-engine/message";
import { type OobaboogaTextgenResponse, type OpenRouterTextgenResponse, type TextgenConnectionMap } from "@mjt-services/textgen-common-2025";
import type { Env } from "../Env";
export declare const createConsumer: ({ buffer, finishedConsumingAbortController, send, stop, stopAfter, }: {
    send: Parameters<ConnectionListener<TextgenConnectionMap, "textgen.generate", Env>>[0]["send"];
    buffer: string[];
    finishedConsumingAbortController: AbortController;
    stopAfter?: string | string[];
    stop?: string | string[];
}) => (value: OpenRouterTextgenResponse | OobaboogaTextgenResponse | undefined, done: boolean) => Promise<true | undefined>;
