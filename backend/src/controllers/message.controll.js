import { sendMessage } from "../services/messageService.js";

export const createMessage = async (req, res, next) => {
    try {
        const { universeId, userMessage } = req.body;

        const response = await sendMessage({
            universeId,
            userMessage,
        });

        res.status(200).json(response);

    } catch (error) {
        next(error);
    }
};