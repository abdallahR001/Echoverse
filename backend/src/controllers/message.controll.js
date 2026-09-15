import { sendMessage } from "../services/messageService.js";

export const createMessage = async (req, res, next) => {
    try {
        const { universeId, userMessage } = req.body;

        const userId = req.user.id;

        const response = await sendMessage({
            universeId,
            userMessage,
            userId
        });

        res.status(200).json(response);

    } catch (error) {
        next(error);
    }
};