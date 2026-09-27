import { sendMessage } from "../services/messageService.js";

export const createMessage = async (req, res, next) => {
    try {
        const { universeId, userMessage } = req.body;

        const userId = req.user.id;

        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        await sendMessage({
            universeId,
            userMessage,
            userId,
            onChunk: (chunk) => {
                res.write(chunk);
            },
        });

        res.end();

    } catch (error) {
        if (!res.headersSent) {
            next(error);
        } else {
            res.end();
        }
    }
};