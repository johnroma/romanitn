interface TimeApiResponse {
  utc_datetime: string
}

interface HelloApiResponse {
  message: string
}

async function fetchAndProcess<ApiResponse>(
  url: string,
  processData: (data: ApiResponse) => string
): Promise<string> {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data: ApiResponse = await res.json()
    return processData(data)
  } catch (error) {
    console.error("Fetch error:", error)
    return "Error fetching time"
  }
}

export const getCurrentTimeExt = async (): Promise<string> => {
  return fetchAndProcess<TimeApiResponse>(
    "https://worldtimeapi.org/api/ip",
    (data) => new Date(data.utc_datetime).toLocaleString()
  )
}

export const getCurrentTimeLocal = async (): Promise<string> => {
  const base =
    process.env.VERCEL_ENV === "production"
      ? `https://romanitn.vercel.app`
      : `http://localhost:4321`
  return fetchAndProcess<HelloApiResponse>(
    base + "/api/hello",
    (data) => data.message
  )
}
