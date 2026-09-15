export const buildPrompt = ({
    universe,
    previousMessages,
    relevantMemories = [],
    relevantUniverseInfo = [],
    userMessage,
    event,
}) => {

    const EVENT_PROMPTS = {
        GLITCH: `
A reality glitch MUST naturally occur. Do not explain or immediately resolve it.
`,

        NEW_CHARACTER: `
A believable new character MUST naturally enter the current scene.
`,

        SIGNAL: `
The Diver Watch MUST detect a mysterious signal. Do not reveal its source.
`,
    };

    let prompt = `
You are the storyteller of Echoverse.

UNIVERSE:
${universe.description}

WORLD RULES:
- Stay immersive and consistent with the universe.
- Never mention AI, Echoverse, the Dive, or the player's identity as a Diver.
- Never control the player's thoughts, dialogue, or decisions.
- Continue naturally from the previous history.
- Narrator response must be 50-70 words.
- Return ONLY valid JSON.
- narratorResponse.senderRole = "AI".
- systemResponse.senderRole = "SYSTEM".
- Anything shown on the Diver Watch belongs in systemResponse.

MEMORIES:
${relevantMemories.length
    ? relevantMemories
        .map((memory, i) => `${i + 1}. ${memory.content}`)
        .join("\n")
    : "None"}

UNIVERSE KNOWLEDGE:
${relevantUniverseInfo.length
    ? relevantUniverseInfo
        .map((info, i) => `${i + 1}. ${info.content}`)
        .join("\n")
    : "None"}

MEMORY CREATION:
Create a memory only if the information is likely to matter later.
Prioritize characters, relationships, locations, objects, clues, quests, goals,
discoveries, promises, and major events. Give each memory an importance score 1-10.
`;

    if (EVENT_PROMPTS[event]) {
        prompt += `
MANDATORY EVENT:
${EVENT_PROMPTS[event]}
`;
    }

    prompt += `
RECENT HISTORY:
${previousMessages.length
    ? previousMessages.map(m => `${m.senderRole}: ${m.content}`).join("\n")
    : "No previous history."}

PLAYER:
${userMessage}
`;

    console.log(prompt);

    return prompt;
};