import prisma from "../config/prisma.js"
export const createMessages = async ({universeId,userMessage,aiMessage,responseRole}) =>
{
    return await prisma.message.createMany(
        {
            data:[
                {
                    universeId,
                    content:userMessage,
                    senderRole:"USER"
                },
                {
                    universeId,
                    content:aiMessage,
                    senderRole:responseRole
                }
            ]
        }
    )
}

export const getPreviousMessages = async (universeId) => {
    return await prisma.message.findMany({
        where: {
            universeId,
        },
        orderBy: {
            created_at: "desc",
        },
        take: 5,
    });
};