import { toLocalTextgenFetchParams } from "./toLocalTextgenFetchParams";
import { toOpenRouterTextgenFetchParams } from "./toOpenRouterTextgenFetchParams";
export const toTextgenFetchParams = ({ request, headers, env, }) => {
    const { options = {} } = request;
    const { provider = "openrouter" } = options;
    switch (provider) {
        case "local": {
            return toLocalTextgenFetchParams({ request, headers, env });
        }
        case "openrouter": {
            return toOpenRouterTextgenFetchParams({ request, headers, env });
        }
    }
    throw new Error(`unknown provider: ${provider}`);
};
//# sourceMappingURL=toTextgenFetchParams.js.map