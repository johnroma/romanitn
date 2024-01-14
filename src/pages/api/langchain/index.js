export const prerender = false
import "dotenv/config"

import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "langchain/prompts"

const model = new ChatOpenAI({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
})

const promptTemplate = PromptTemplate.fromTemplate(
  "Tell me a joke about {topic}"
)

const chain = promptTemplate.pipe(model)

async function main(q) {
  const result = await chain.invoke({ topic: "bears" })

  console.log(result.content)
  return result.content
}

export async function GET() {
  const currentTime = new Date().toLocaleString()

  return new Response(
    JSON.stringify({
      message: `Hello, the time is ${currentTime}, and the response from langchain is: ${await main()}`,
    }),
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "cache-control": "s-maxage=59, stale-while-revalidate=59",
      },
    }
  )
}
