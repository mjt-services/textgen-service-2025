type OllamaChunk = {
  message?: {
    role: "assistant" | "user" | "system";
    content: string;
  };
  done?: boolean;
};

type StreamCallbacks = {
  onMessage?: (chunk: string, full?: OllamaChunk) => void;
  onDone?: () => void;
  onError?: (err: any) => void;
};

export async function streamNdJsonResponse(
  res: Response,
  { onMessage, onDone, onError }: StreamCallbacks
) {
  const decoder = new TextDecoder();
  const reader = res.body?.getReader();
  if (!reader) {
    onError?.(new Error("No response body"));
    return;
  }

  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // Process lines if we have newlines
      let lines = buffer.split("\n");
      buffer = lines.pop() ?? ""; // Save the last partial line for next round

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        try {
          const json = JSON.parse(trimmed) as OllamaChunk;
          if (json.done) {
            onDone?.();
            return;
          }
          if (json.message?.content) {
            onMessage?.(json.message.content, json);
          }
        } catch (err) {
          onError?.(new Error(`Failed to parse JSON: ${trimmed}`));
        }
      }
    }

    // Flush leftover buffer (in case of one last line with no newline)
    if (buffer.trim()) {
      try {
        const json = JSON.parse(buffer.trim()) as OllamaChunk;
        if (json.done) onDone?.();
        else if (json.message?.content) onMessage?.(json.message.content, json);
      } catch (err) {
        onError?.(new Error(`Final JSON parse failed: ${buffer}`));
      }
    }

    onDone?.();
  } catch (err) {
    onError?.(err);
  }
}
