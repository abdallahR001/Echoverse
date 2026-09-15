import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const generateUserMessageEmbedding = async (content) => {

    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",

        contents: content,
    });

    console.log(response.embeddings[0].values)
    return response.embeddings[0].values;
};