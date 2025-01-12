import { main } from "./main";

(async () => {
  try {
    const env = Deno.env.toObject();
    console.log(JSON.stringify(env, null, 2));
    main(env);
  } catch (error) {
    console.error(error);
  }
})();
