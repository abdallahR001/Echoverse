import prisma from "../config/prisma.js"
export const createMessages = async ({
    universeId,
    userMessage,
    aiMessage,
    responseRole
}) => {

    await prisma.message.create({
        data: {
            userUniverseId: universeId,
            content: userMessage,
            senderRole: "USER"
        }
    });

    await prisma.message.create({
        data: {
            userUniverseId: universeId,
            content: aiMessage,
            senderRole: responseRole
        }
    });
};

export const getPreviousMessages = async (userUniverseId) => {
    return await prisma.message.findMany({
        where: {
            userUniverseId,
        },
        orderBy: {
            created_at: "desc"
        },
        take: 3,
    });
};

export const createStartingMessage = async ({
    userUniverseId,
    content,
    senderRole
}) => {
    return prisma.message.create({
        data: {
            userUniverseId,
            content,
            senderRole
        }
    });
};