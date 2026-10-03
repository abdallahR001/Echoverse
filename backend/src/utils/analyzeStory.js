import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeStory({
    userMessage,
    aiResponse,
    currentObjective,
}) {

    const response = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",

        messages: [
            {
                role: "system",
                content: `
You analyze an interactive story and extract important information for future story continuity and game state.

Analyze:
1. The player's message.
2. The AI's story response.
3. The current objective, if one exists.

### 1. Memories

Extract important long-term memories that may be useful in future interactions.

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

### 2. Danger Level

Estimate the current danger level of the story/world as a percentage from 0 to 100.

0 = completely safe
100 = immediate extreme danger

Base this on the current situation, threats, enemies, environmental hazards, and consequences.

### 3. Reality Stability

Estimate how stable the reality/world currently is as a percentage from 0 to 100.

100 = completely stable and normal
0 = reality is severely corrupted or collapsing

Consider glitches, anomalies, distortions, impossible events, corruption, and other changes to the world's reality.

### 4. Objective

If there is a current objective, determine its current status:

- IN_PROGRESS: The objective has not been completed or failed.
- COMPLETED: The player has successfully achieved the objective.
- FAILED: The objective can no longer be successfully achieved.

Base this judgment on what actually happened in the player's message and the AI's response.

Do not mark an objective as completed or failed without sufficient evidence.

If there is a current objective, return its existing title.

If there is NO current objective, determine whether the latest story events naturally establish a meaningful objective for the player.

If a clear objective naturally exists, create a short actionable objective and return it with status IN_PROGRESS.

Otherwise return null.

Do not invent an objective without sufficient narrative justification.
`,
            },

            {
                role: "user",
                content: `
PLAYER MESSAGE:
${userMessage}

AI RESPONSE:
${aiResponse}

CURRENT OBJECTIVE:
${currentObjective ?? "NONE"}
`,
            },
        ],

        temperature: 0.3,

        response_format: {
            type: "json_schema",
            json_schema: {
                name: "story_analysis",
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

                        dangerLevel: {
                            type: "integer",
                            minimum: 0,
                            maximum: 100,
                        },

                        realityStability: {
                            type: "integer",
                            minimum: 0,
                            maximum: 100,
                        },

                        objective: {
                            type: ["object", "null"],

                            properties: {
                                title: {
                                    type: "string",
                                },

                                status: {
                                    type: "string",
                                    enum: [
                                        "ACTIVE",
                                        "COMPLETED",
                                        "FAILED",
                                        "DISMISSED"
                                    ],
                                },
                            },

                            required: [
                                "title",
                                "status",
                            ],

                            additionalProperties: false,
                        },
                    },

                    required: [
                        "memories",
                        "dangerLevel",
                        "realityStability",
                        "objective",
                    ],

                    additionalProperties: false,
                },
            },
        },
    });

    return JSON.parse(
        response.choices[0].message.content
    );
}