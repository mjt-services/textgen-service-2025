import { Asserts } from "@mjt-engine/assert";
import type { ConnectionListener, ErrorDetail } from "@mjt-engine/message";
import type { TextgenConnectionMap } from "@mjt-services/textgen-common-2025";
import { getEnv } from "../getEnv";
import { embeddingJsonToFloat64Array } from "./embeddingJsonToFloat64Array";

export const embeddingGenerateListener: ConnectionListener<
  TextgenConnectionMap,
  "embedding.generate"
> = async (props) => {
  const embedUrl = Asserts.assertValue(getEnv().EMBEDDING_URL);

  const { prompt, model = getEnv().EMBEDDING_MODEL } = props.detail.body;
  const body = { prompt, model };
  const response = await fetch(embedUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const reason = response.body ? await response.text() : response.statusText;
    throw {
      cause: { reason, status: response.status },
      extra: [body, embedUrl],
    } as ErrorDetail;
  }
  const json = (await response.json()) as { embedding: number[] };
  return new Float32Array(json.embedding);
};
