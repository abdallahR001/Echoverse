import {
    createMessages,
    getPreviousMessages
} from "../repositories/message.repository.js";

import {
    getUserUniverse
} from "../repositories/universe.repository.js";

import {
    getActiveObjective
} from "../repositories/objective.repository.js";

import { generateEvent } from "../utils/eventsEngine.js";
import { generateAIResponse } from "../utils/generateAiResponse.js";
import { generateUserMessageEmbedding } from "../utils/generateUserMessageEmbedding.js";
import { analyzeStory } from "../utils/analyzeStory.js";
import { getRelevantMemoriesIfExist } from "../utils/getRelevantMemories.js";
import { getRelevantUniverseInfo } from "../utils/getRelevantUniverseInfo.js";
import { buildPrompt } from "../utils/messagePromptBuilder.js";

import { saveImportantMemories } from "./memorySlotService.js";
import {
    createObjective,
    updateObjectiveStatus
} from "./objectiveService.js";


export const sendMessage = async ({
    universeId,
    userMessage,
    userId,
    onChunk
}) => {

    // =========================================
    // 1. Check universe
    // =========================================

    const universe = await getUserUniverse({
        userId,
        universeId
    });

    if (!universe) {
        const error = new Error("Universe not found");
        error.statusCode = 404;
        throw error;
    }

    if (universe.status !== "ACTIVE") {
        const error = new Error("Universe is not active");
        error.statusCode = 400;
        throw error;
    }


    // =========================================
    // 2. Generate random event
    // =========================================

    const event = generateEvent();


    // =========================================
    // 3. Previous messages + Embedding
    // =========================================

    const [
        previousMessagesResult,
        userMessageEmbedding
    ] = await Promise.all([
        getPreviousMessages(universe.id),
        generateUserMessageEmbedding(userMessage)
    ]);

    const previousMessages = previousMessagesResult.reverse();


    // =========================================
    // 4. Relevant context + Current objective
    // =========================================

    const [
        relevantMemories,
        relevantUniverseInfo,
        currentObjective
    ] = await Promise.all([

        getRelevantMemoriesIfExist({
            userUniverseId: universe.id,
            messageEmbedding: userMessageEmbedding
        }),

        getRelevantUniverseInfo({
            universeId: universe.universeId,
            messageEmbedding: userMessageEmbedding
        }),

        getActiveObjective({
            userId,
            universeId: universe.id
        })

    ]);


    // =========================================
    // 5. Build prompt
    // =========================================

    const prompt = buildPrompt({
        universe: universe.universe,
        previousMessages,
        userMessage,
        event,
        relevantMemories,
        relevantUniverseInfo,
        currentObjective
    });


    // =========================================
    // 6. Generate AI response
    // =========================================

    const aiStream = await generateAIResponse({
        prompt
    });

    let fullResponse = "";

    for await (const chunk of aiStream) {

        const content =
            chunk.choices[0]?.delta?.content;

        if (!content) continue;

        fullResponse += content;

        onChunk?.(content);
    }


    // =========================================
    // 7. Save messages
    // =========================================

    await createMessages({
        universeId: universe.id,
        userMessage,
        aiMessage: fullResponse,
        responseRole: "AI"
    });


    // =========================================
    // 8. Analyze story
    // =========================================

    const analysis = await analyzeStory({
        userMessage,
        aiResponse: fullResponse,
        currentObjective: currentObjective?.title ?? null
    });

    const {
        memories,
        dangerLevel,
        realityStability,
        objective
    } = analysis;


    // =========================================
    // 9. Save important memories
    // =========================================

    await saveImportantMemories({
        memories,
        userId,
        userUniverseId: universe.id
    });


    // =========================================
    // 10. Handle objective
    // =========================================

if (objective) {

    if (currentObjective) {

        await updateObjectiveStatus({
            userId,
            universeId: universe.id,
            objectiveId: currentObjective.id,
            status: objective.status
        });

    } else {

        await createObjective({
            userId,
            universeId: universe.id,
            title: objective.title
        });

    }
}


    // =========================================
    // Return
    // =========================================

    return {
        success: true,
        dangerLevel,
        realityStability,
        objective
    };
};