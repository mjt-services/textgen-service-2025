import { sendTextgenStreamingResponse } from "./sendTextgenStreamingResponse";
export const textgenGenerateListener = async (props) => {
    // Add your code logic here
    try {
        const { stream } = props.detail.body;
        if (stream) {
            return sendTextgenStreamingResponse(props);
        }
        // return sendTextgenNonStreamingResponse(props);
        return { done: true };
    }
    catch (error) {
        console.log("textgenGenerateListener error", error);
    }
};
//# sourceMappingURL=textgenGenerateListener.js.map