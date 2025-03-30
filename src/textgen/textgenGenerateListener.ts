import type { ConnectionListener } from "@mjt-engine/message";
import type { TextgenConnectionMap } from "@mjt-services/textgen-common-2025";
import { sendTextgenStreamingResponse } from "./sendTextgenStreamingResponse";

export const textgenGenerateListener: ConnectionListener<
  TextgenConnectionMap,
  "textgen.generate"
> = async (props) => {
  const { stream } = props.detail.body;
  if (stream) {
    return sendTextgenStreamingResponse(props);
  }
  throw new Error("non-stream generation is not supported");
};
