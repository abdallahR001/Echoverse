
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateAIResponse({
  prompt,
}) {
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
        name: "echoverse_response",
        strict: true,

        schema: {
          type: "object",

          properties: {
            narratorResponse: {
              type: "object",

              properties: {
                senderRole: {
                  type: "string",
                  enum: ["AI"],
                },

                content: {
                  type: "string",
                },
              },

              required: [
                "senderRole",
                "content",
              ],

              additionalProperties: false,
            },

            systemResponse: {
              type: ["object", "null"],

              properties: {
                senderRole: {
                  type: "string",
                  enum: ["SYSTEM"],
                },

                content: {
                  type: "string",
                },
              },

              required: [
                "senderRole",
                "content",
              ],

              additionalProperties: false,
            },

            importantMemories: {
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

          required: [
            "narratorResponse",
            "systemResponse",
            "importantMemories",
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

