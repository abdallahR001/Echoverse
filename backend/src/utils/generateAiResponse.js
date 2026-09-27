import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateAIResponse({
  prompt,
}) {
  return await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 1,

    stream: true,
  });
}