import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function getImportantMemories({
    userMessage,
    aiResponse,
}) {

    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",

        messages: [
            {
                role: "system",
                content: `
You extract important long-term memories from an interactive story.

Analyze:
1. The player's message.
2. The AI's story response.

Only extract information that may be useful in future interactions.

A memory should be saved if it represents something persistent or important, such as:
- A discovery made by the player
- An important event
- A relationship or interaction with a character
- A decision or action taken by the player
- A significant change in the world
- Important information revealed to the player
- A meaningful object obtained or lost
- A persistent condition affecting the player or world

Do NOT save:
- Temporary descriptions
- Atmosphere
- Generic actions
- Unimportant dialogue
- Information that is already obvious from the current scene
- Short-lived details with no future relevance

Rate importance from 1 to 10.

Only return memories that are potentially useful for future story continuity.
`,
            },

            {
                role: "user",
                content: `
PLAYER MESSAGE:
${userMessage}

AI RESPONSE:
${aiResponse}
`,
            },
        ],

        temperature: 0.3,

        response_format: {
            type: "json_schema",
            json_schema: {
                name: "important_memories",
                strict: true,
                schema: {
                    type: "object",
                    properties: {
                        memories: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    content: {
                                        type: "string",
                                    },
                                    importance: {
                                        type: "integer",
                                        minimum: 1,
                                        maximum: 10,
                                    },
                                },
                                required: [
                                    "content",
                                    "importance",
                                ],
                                additionalProperties: false,
                            },
                        },
                    },
                    required: ["memories"],
                    additionalProperties: false,
                },
            },
        },
    });

    return JSON.parse(response.choices[0].message.content).memories;
}