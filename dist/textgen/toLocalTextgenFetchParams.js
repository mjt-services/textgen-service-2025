import { toTextgenExtendedBody } from "./toTextgenExtendedBody";
export const toLocalTextgenFetchParams = ({ request, headers = {}, env, }) => {
    const { options } = request;
    const { authToken = env.LOCAL_AUTHTOKEN, url = options?.promptStyle === "raw"
        ? "http://10.0.0.9:5000/v1/completions"
        : "http://10.0.0.9:5000/v1/chat/completions", } = headers;
    return {
        url,
        body: toTextgenExtendedBody(request),
        authToken,
    };
};
//# sourceMappingURL=toLocalTextgenFetchParams.js.map