import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateStartingMessage({ description }) {
  const prompt = `
You are the narrator of an immersive interactive text adventure.

A player has just entered a brand-new universe.

Universe Description:
${description}

Your task is to write ONLY the opening scene.

Rules:
- Write in a neutral, cinematic narration style.
- The opening should be SHORT (40-90 words).
- Focus on describing what the player immediately experiences.
- Avoid long exposition, history, lore dumps, or explanations.
- Never explain how the universe works.
- The player should discover the world naturally through gameplay.

The opening MUST begin with a strong hook.

Possible hooks include (but are not limited to):
- Waking up somewhere unfamiliar.
- Falling from the sky.
- Being chased.
- Hearing an explosion.
- Standing before something impossible.
- Arriving somewhere peaceful.
- Opening a mysterious door.
- Sitting inside a moving vehicle.
- Finding yourself underwater.
- Any other creative opening.

The hook can be:
- Calm and mysterious.
- Sudden and dangerous.
- Strange and surreal.
- Peaceful but intriguing.

Do NOT always use action scenes.
Mix quiet openings with intense ones.

The narration should:
- Describe only the immediate surroundings.
- Mention sensory details when appropriate.
- End with a feeling that makes the player want to continue.
- Never tell the player what they think or feel.
- Never ask questions.
- Never give choices.
- Never use dialogue unless absolutely necessary.

Also determine the player's current location if it can be inferred from the scene.
Examples:
- Forest
- Ancient Temple
- Space Station
- Rooftop
- Desert
- Hospital Room

If the exact location cannot be determined, return:
"unknown"
`;

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 1,

    response_format: {
      type: "json_schema",
      json_schema: {
        name: "starting_message",
        strict: true,
        schema: {
          type: "object",
          properties: {
            startingMessage: {
              type: "string",
              description:
                "A short cinematic opening scene (40-90 words) that starts with a compelling hook.",
            },

            currentLocation: {
              type: "string",
              description:
                'The player\'s current location. Return a concise place name if known, otherwise return "unknown".',
            },
          },

          required: ["startingMessage", "currentLocation"],
          additionalProperties: false,
        },
      },
    },
  });

  const jsonText = response.choices[0].message.content;

  const data = JSON.parse(jsonText);

  return {
    startingMessage: data.startingMessage,
    currentLocation: data.currentLocation,
  };
}