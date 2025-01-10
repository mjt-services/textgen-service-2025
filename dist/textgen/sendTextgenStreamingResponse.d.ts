import type { Env } from "../Env";
import type { ConnectionListener } from "@mjt-engine/message";
import { type TextgenConnectionMap } from "@mjt-services/textgen-common-2025";
export declare const sendTextgenStreamingResponse: ConnectionListener<TextgenConnectionMap, "textgen.generate", Env>;
