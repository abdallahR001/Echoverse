import OpenAI from "openai";
import { buildPrompt } from "./messagePromptBuilder.js";

const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const generateAIResponse = async ({
    universe,
    previousMessages,
    userMessage,
    event,
}) => {

    const prompt = buildPrompt({
        universe,
        previousMessages,
        userMessage,
        event,
    });

    const response = await openai.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
            {
                role: "system",
                content: prompt,
            },
        ],

        response_format: {
            type: "json_object",
        },

        temperature: 1,
    });

    const aiResponse = JSON.parse(response.choices[0].message.content);

    return aiResponse
};