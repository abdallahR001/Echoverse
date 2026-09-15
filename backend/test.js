import "dotenv/config"

import { Groq } from "groq-sdk"

const groq = new Groq(
  {
    apiKey:process.env.TEST_API_KEY
  }
)


const stream = await groq.chat.completions.create(
  {
    model:"openai/gpt-oss-120b",
    messages:[
      {
        role:"user",
        content:"write a short analog horror story"
      }
    ],
    stream:true
  }
)

for await (const chunk of stream)
{
  const text = (chunk.choices[0]?.delta?.content || "")
  
  process.stdout.write(text)
}