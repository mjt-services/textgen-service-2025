import { safe } from "@mjt-engine/object";

export const dataParser = (data: string) => {
  // if (signal?.aborted) {
  //   return undefined;
  // }
  if (!data || data === "[DONE]") {
    return undefined;
  }
  return safe(() => JSON.parse(data), { quiet: true });
};
