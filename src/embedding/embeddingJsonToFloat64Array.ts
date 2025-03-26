import Decimal from "decimal.js";

export const embeddingJsonToFloat64Array = (jsonStr: string): Float32Array => {
  // Match the "embedding": [ ... ] array using a forgiving regex
  const match = jsonStr.match(/"embedding"\s*:\s*\[([^\]]+)\]/);
  if (!match) throw new Error("Invalid embedding JSON string");

  // Split on commas, allow string or numeric values
  const rawItems = match[1]
    .split(",")
    .map((s) => s.trim().replace(/^"|"$/g, ""));

  const floatArray = new Float32Array(rawItems.length);

  for (let i = 0; i < rawItems.length; i++) {
    const dec = new Decimal(rawItems[i]);
    floatArray[i] = dec.toNumber(); // safely to IEEE 754 float64
  }

  return floatArray;
};
