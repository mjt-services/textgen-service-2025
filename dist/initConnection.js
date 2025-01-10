import { Messages } from "@mjt-engine/message";
import { textgenGenerateListener } from "./textgen/textgenGenerateListener";
import { assertValue } from "@mjt-engine/assert";
export const initConnection = async (env) => {
    const url = assertValue(env.NATS_URL);
    console.log("NATS_URL", url);
    await Messages.createConnection({
        subscribers: {
            "textgen.generate": textgenGenerateListener,
        },
        options: { log: console.log },
        server: [url],
        env,
    });
    console.log("initConnection: init complete");
};
//# sourceMappingURL=initConnection.js.map