import { getRelevantMemories } from "../repositories/memorySlot.repository.js";

const MEMORY_DISTANCE_THRESHOLD = 0.35;

export const getRelevantMemoriesIfExist = async ({
    userUniverseId,
    messageEmbedding,
}) => {

    const memories = await getRelevantMemories({
        userUniverseId,
        embedding: messageEmbedding,
        limit: 5,
    });

    return memories
        // .filter(memory => memory.distance <= MEMORY_DISTANCE_THRESHOLD)
        // .map(memory => memory.content);

};