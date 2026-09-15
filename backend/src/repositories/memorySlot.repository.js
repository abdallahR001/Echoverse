import { randomUUID } from "crypto";
import prisma from "../config/prisma.js";

export const createMemory = async ({
    userId,
    userUniverseId,
    content,
    embedding,
}) => {

    const vector = `[${embedding.join(",")}]`;

    const id = randomUUID();

    await prisma.$queryRaw`
        INSERT INTO "MemorySlot"
        (
            "id",
            "userId",
            "userUniverseId",
            "content",
            "embedding",
            "created_at",
            "updated_at"
        )
        VALUES
        (
            ${id},
            ${userId},
            ${userUniverseId},
            ${content},
            ${vector}::vector,
            NOW(),
            NOW()
        )
    `;
};

export const getRelevantMemories = async ({
    userUniverseId,
    embedding,
    limit = 5,
}) => {
    const vector = `[${embedding.join(",")}]`;

    return await prisma.$queryRaw`
        SELECT
            id,
            content,
            created_at,
            embedding <=> ${vector}::vector AS distance
        FROM "MemorySlot"
        WHERE "userUniverseId" = ${userUniverseId}
        ORDER BY embedding <=> ${vector}::vector
        LIMIT ${limit};
    `;
};