export const prerender = false

export async function GET() {
  const currentTime = new Date().toLocaleString()
  return new Response(
    JSON.stringify({
      message: `Hello, the time is ${currentTime}`,
    }),
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  )
}
