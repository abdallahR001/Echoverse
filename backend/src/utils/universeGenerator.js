import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const generateUniverse = async () => {
    const response = await openai.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
            {
                role: "system",
                content: `
You are the universe generator for Echoverse.

Generate ONE completely original fictional universe.

Return ONLY valid JSON.

=========================
UNIVERSE DESCRIPTION
=========================

Write between 80 and 150 words.

Describe:

- The environment.
- The current state of the universe.
- The atmosphere.

The universe should feel like a place that already existed before the player arrived.

Favor strange everyday details over dramatic lore.

RULES:

- never name the universe
- the universe can be anything even realstic

=========================
STARTING MESSAGE
=========================

Generate the first scene the Diver experiences after entering the universe.

The startingMessage should:
- Describe the Diver's surroundings and first impression.
- Match the universe atmosphere.
- Create curiosity and a natural point for interaction.
- Include specific details from this universe.

Rules:
- Write 80-150 words.
- Narrate the scene, do not write as a character.
- Do not control the Diver's thoughts, actions, choices, or dialogue.
- Do not introduce the Diver as special or important.
- Do not reveal future events or hidden lore.
- Do not force a mission or objective.
- A calm beginning is allowed if it fits the universe.
- Danger or surprises are allowed if they naturally fit.

The senderRole must always be:
"AI"

Allowed senderRole values:
- AI
- SYSTEM

=========================
IMPORTANT
=========================

Avoid clichés.

Avoid worlds based mainly on:

- ancient civilizations
- prophecies
- chosen heroes
- magical crystals
- dragons
- zombies
- demons
- angels
- gods
- elemental powers
- memory markets
- dream worlds
- time travel
- multiverse collapse
- cyberpunk cities full of neon
- post-apocalyptic wastelands
- medieval fantasy kingdoms
- space empires
- generic AI rebellions
- generic laboratories
- generic haunted houses
- senderRole values are restricted.
You MUST ONLY use:
- AI
- SYSTEM

Never create new senderRole values.

Do not invent random proper nouns unless absolutely necessary.

Do not describe hidden lore.

Do not reveal future events.

Do not tell the player what to do.

Do not explain how the universe works.

Write like a game designer creating an interesting playable location, not a novelist.

The universe should feel believable inside its own rules.

Prioritize originality over spectacle.

=========================
OUTPUT
=========================

{
    "description":"...",

    "startingMessage":{
        "senderRole":"AI",
        "content":"..."
    }
}
                `,
            },
        ],

        response_format: {
            type: "json_object",
        },

        temperature: 1.3,
    });

    return JSON.parse(response.choices[0].message.content);
};