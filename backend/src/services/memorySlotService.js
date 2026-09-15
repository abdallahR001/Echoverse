import { createMemory } from "../repositories/memorySlot.repository.js";
import { generateMemoryEmbedding } from "../utils/generateMemoryEmbedding.js";

const MEMORY_IMPORTANCE_THRESHOLD = 6;

export const saveImportantMemories = async ({
    memories,
    userId,
    userUniverseId,
}) => {

    if (!memories || memories.length === 0) {
        return;
    }

    for (const memory of memories) {

        if (memory.importance < MEMORY_IMPORTANCE_THRESHOLD) {
            continue;
        }

        const embedding = await generateMemoryEmbedding(memory.content);

        await createMemory({
            userId,
            userUniverseId,
            content: memory.content,
            embedding,
        });
    }

};