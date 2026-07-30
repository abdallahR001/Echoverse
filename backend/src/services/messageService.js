import { createMessages, getPreviousMessages } from "../repositories/message.repository.js";
import { getUniverseById } from "../repositories/universe.repository.js";
import { generateEvent } from "../utils/eventsEngine.js";
import { generateAIResponse } from "../utils/generateAiResponse.js";
import { buildPrompt } from "../utils/messagePromptBuilder.js";

export const sendMessage = async ({ universeId, userMessage }) => {

    // 1. Check universe

    const universe = await getUniverseById(universeId);

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

    // 2. Get previous messages

    const previousMessages = (await getPreviousMessages(universeId)).reverse();

    // 3. Generate random event

    const event = generateEvent();

    //generate prompt

    const prompt = buildPrompt({
        universe,
        previousMessages,
        userMessage,
        event,
    });

    // 4. Generate AI response

    const aiResponse = await generateAIResponse({
        universe,
        previousMessages,
        userMessage,
        event,
        prompt
    });

    // 5. Save messages

    console.log(aiResponse)

    await createMessages({
    universeId,
    userMessage,
    aiMessage: aiResponse.narratorResponse.content,
    responseRole: aiResponse.narratorResponse.senderRole
});

    // 6. Save important memories

    // TODO

    // 7. Save signals

    // TODO

    // 8. Save objectives

    // TODO

    // 9. Return response

    return {
    success: true,
    narratorResponse: aiResponse.narratorResponse,
    systemResponse: aiResponse.systemResponse,
    importantMemories: aiResponse.importantMemories,
};
};