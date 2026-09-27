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
import { getImportantMemories } from "../utils/getImportantMemories.js";
import { getRelevantMemoriesIfExist } from "../utils/getRelevantMemories.js";
import { getRelevantUniverseInfo } from "../utils/getRelevantUniverseInfo.js";
import { buildPrompt } from "../utils/messagePromptBuilder.js";
import { saveImportantMemories } from "./memorySlotService.js";


export const sendMessage = async ({
    universeId,
    userMessage,
    userId,
    onChunk
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

    const aiStream = await generateAIResponse({
        prompt
    });

    let fullResponse = ""

    for await (const chunk of aiStream) {

    const content =
        chunk.choices[0]?.delta?.content;

    if (!content) continue;

    fullResponse += content;

    onChunk?.(content)
    }

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
        aiMessage: fullResponse,
        responseRole: "AI"
    });

    console.log(
        `[TIMING] createMessages: ${(performance.now() - start).toFixed(2)} ms`
    );


    // =========================================
    // 8. Save important memories LATER
    // =========================================

    console.log("getting memories")

    const memories = await getImportantMemories({userMessage,aiResponse:fullResponse})

    await saveImportantMemories({memories,userId,userUniverseId:universe.id})

    console.log("MEMORIES:", JSON.stringify(memories, null, 2));

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
        // narratorResponse: aiResponse.narratorResponse,
        // systemResponse: aiResponse.systemResponse,
        // importantMemories: aiResponse.importantMemories
    };
};