import { toTextgenExtendedBody } from "./toTextgenExtendedBody";
export const toOpenRouterTextgenFetchParams = ({ request, headers = {}, env, }) => {
    console.log("toOpenRouterTextgenFetchParams: env", env);
    const { authToken = env.OPEN_ROUTER_AUTHTOKEN, url = "https://openrouter.ai/api/v1/chat/completions", } = headers;
    return {
        url,
        body: toTextgenExtendedBody(request),
        authToken,
    };
};
//# sourceMappingURL=toOpenRouterTextgenFetchParams.js.map