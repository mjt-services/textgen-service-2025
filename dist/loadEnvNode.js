import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
export const loadEnv = (filePath = ".env") => {
    const envPath = resolve(process.cwd(), filePath);
    if (!existsSync(envPath)) {
        console.warn(`Warning: ${filePath} file not found.`);
        return {};
    }
    const envFile = readFileSync(envPath, "utf-8");
    const envVariables = envFile.split("\n");
    const result = {};
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
//# sourceMappingURL=loadEnvNode.js.map