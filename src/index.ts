// import { loadEnvStatic } from "./loadEnvStatic";
import { loadEnv } from "./loadEnvDeno";
import { main } from "./main";

(async () => {
  try {
    // await import("dotenv/config");
    const env = await loadEnv();
    console.log(JSON.stringify(env, null, 2));
    main(env);
  } catch (error) {
    console.error(error);
  }
})();
