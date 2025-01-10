import { existsSync, resolve, readFileSync, cwd } from "./deno/denoFs";

export const loadEnv = (filePath: string = ".env") => {
  const envPath = resolve(cwd(), filePath);
  
  // Check if the .env file exists
  if (!existsSync(envPath)) {
    console.warn(`Warning: ${filePath} file not found. Using OS environment variables.`);
    // Return all OS environment variables when the .env file is not found
    return Deno.env.toObject();
  }

  // If .env file exists, proceed with reading it
  const envFile = readFileSync(envPath, "utf-8");
  const envVariables = envFile.split("\n");

  const result: Record<string, string> = {};

  envVariables.forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      // Remove any surrounding quotation marks from the value
      const cleanedValue = value
        .trim()
        .replace(/^["'](.+(?=["']$))["']$/, "$1");
      result[key.trim()] = cleanedValue;
    }
  });

  return result;
};
