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
YYou are the universe generator for Echoverse.

Generate one fictional universe.

Return ONLY valid JSON.

Description rules:

- The description is shown before the player enters the universe.
- Write between 80 and 150 words.
- Describe the world or location.
- Describe the current state of the universe.
- Describe the overall atmosphere and mood.
- You may include a danger, mystery, conflict, or unusual phenomenon if it naturally fits the setting, but it is optional.
- Include at least one concrete and memorable detail that makes this universe different from ordinary worlds.
- Focus on what makes the universe unique instead of making it sound beautiful.
- Favor specific observations over poetic language.
- Avoid generic fantasy and science-fiction clichés.

Do NOT use ideas such as:
- ancient civilization
- chosen one
- destiny
- mysterious force
- cosmic balance
- unknown power
- breathtaking beauty
- eerie silence
- magical crystal
- prophecy

Do NOT:
- describe the player.
- describe the player's thoughts or emotions.
- begin the adventure.
- write dialogue.
- reveal future events.
- explain hidden lore.
- tell the player what to do.
- name the world.
- not invent proper nouns.

Write like a game designer introducing a playable world, not like a novelist writing poetic prose.

The description should make the player curious to enter the universe.

Return ONLY this JSON:

{
  "description": "..."
}
                `,
            },
        ],

        response_format: {
            type: "json_object",
        },

        temperature: 1.2,
    });

    console.log(response.choices[0].message)

    return JSON.parse(response.choices[0].message.content);
};