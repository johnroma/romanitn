import "dotenv/config"

import { OpenAI } from "openai"
export const prerender = false

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
})
async function main(q) {
  const messages = [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "user",
      content: q,
    },
  ]
  const aiResult = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0,
  })
  const response = aiResult.choices[0].message?.content?.trim() || "No response"

  return response
}

export async function GET() {
  const currentTime = new Date().toLocaleString()

  return new Response(
    JSON.stringify({
      message: `Hello, the time is ${currentTime}, and the response from OpenAI is: ${await main(
        "capital of france?"
      )}`,
    }),
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "cache-control": "s-maxage=59, stale-while-revalidate=59",
      },
    }
  )
}
