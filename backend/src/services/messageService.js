import {
    createMessages,
    getPreviousMessages
} from "../repositories/message.repository.js";

import {
    getUserUniverse
} from "../repositories/universe.repository.js";

import { generateEvent } from "../utils/eventsEngine.js";
import { generateAIResponse } from "../utils/generateAiResponse.js";
import { generateUserMessageEmbedding } from "../utils/generateUserMessageEmbedding.js";
import { getRelevantMemoriesIfExist } from "../utils/getRelevantMemories.js";
import { getRelevantUniverseInfo } from "../utils/getRelevantUniverseInfo.js";
import { buildPrompt } from "../utils/messagePromptBuilder.js";
import { saveImportantMemories } from "./memorySlotService.js";


export const sendMessage = async ({
    universeId,
    userMessage,
    userId
}) => {

    const totalStart = performance.now();

    // =========================================
    // 1. Check universe
    // =========================================

    let start = performance.now();

    const universe = await getUserUniverse({
        userId,
        universeId
    });

    console.log(
        `[TIMING] getUserUniverse: ${(performance.now() - start).toFixed(2)} ms`
    );

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

    start = performance.now();

    const event = generateEvent();

    console.log(
        `[TIMING] generateEvent: ${(performance.now() - start).toFixed(2)} ms`
    );


    // =========================================
    // 3. Previous messages + Embedding
    // =========================================

    start = performance.now();

    const [
        previousMessagesResult,
        userMessageEmbedding
    ] = await Promise.all([
        getPreviousMessages(universe.id),
        generateUserMessageEmbedding(userMessage)
    ]);

    const previousMessages = previousMessagesResult.reverse();

    console.log(
        `[TIMING] messages + embedding: ${(performance.now() - start).toFixed(2)} ms`
    );


    // =========================================
    // 4. Relevant memories + universe info
    // =========================================

    start = performance.now();

    const [
        relevantMemories,
        relevantUniverseInfo
    ] = await Promise.all([

        getRelevantMemoriesIfExist({
            userUniverseId: universe.id,
            messageEmbedding: userMessageEmbedding
        }),

        getRelevantUniverseInfo({
            universeId: universe.universeId,
            messageEmbedding: userMessageEmbedding
        })

    ]);

    console.log(
        `[TIMING] relevant context: ${(performance.now() - start).toFixed(2)} ms`
    );


    // =========================================
    // 5. Build prompt
    // =========================================

    start = performance.now();

    const prompt = buildPrompt({
        universe: universe.universe,
        previousMessages,
        userMessage,
        event,
        relevantMemories,
        relevantUniverseInfo
    });

    console.log(
        `[TIMING] buildPrompt: ${(performance.now() - start).toFixed(2)} ms`
    );


    // =========================================
    // 6. Generate AI response
    // =========================================

    start = performance.now();

    const aiResponse = await generateAIResponse({
        prompt
    });

    console.log(
        `[TIMING] generateAIResponse: ${(performance.now() - start).toFixed(2)} ms`
    );


    // =========================================
    // 7. Save messages
    // =========================================

    start = performance.now();

    await createMessages({
        universeId: universe.id,
        userMessage,
        aiMessage: aiResponse.narratorResponse.content,
        responseRole: aiResponse.narratorResponse.senderRole
    });

    console.log(
        `[TIMING] createMessages: ${(performance.now() - start).toFixed(2)} ms`
    );


    // =========================================
    // 8. Save important memories
    // =========================================

    start = performance.now();

    await saveImportantMemories({
        memories: aiResponse.importantMemories,
        userId,
        userUniverseId: universe.id
    });

    console.log(
        `[TIMING] saveImportantMemories: ${(performance.now() - start).toFixed(2)} ms`
    );


    // =========================================
    // 9. Total
    // =========================================

    console.log(
        `[TIMING] TOTAL: ${(performance.now() - totalStart).toFixed(2)} ms`
    );


    // =========================================
    // Return
    // =========================================

    return {
        success: true,
        narratorResponse: aiResponse.narratorResponse,
        systemResponse: aiResponse.systemResponse,
        importantMemories: aiResponse.importantMemories
    };
};