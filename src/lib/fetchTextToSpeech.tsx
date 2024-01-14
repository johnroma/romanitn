import "dotenv/config"
import axios, { type AxiosRequestConfig } from "axios"
import fs from "fs"
import path from "path"
import crypto from "crypto"

const apiKey = process.env.ELEVEN_LABS_API_KEY

const fetchTextToSpeech = async (inputText: string) => {
  const API_KEY = apiKey
  const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"
  const hash = crypto.createHash("sha256").update(inputText).digest("hex")

  // Define the path for the potential MP3 file in the public/audio directory
  const audioPath = path.join("public", "audio", `${hash}.mp3`)

  // Check if the file already exists
  if (fs.existsSync(audioPath)) {
    // If the file exists, return its path immediately
    return audioPath
  }

  // Define API request options
  const options: AxiosRequestConfig = {
    method: "POST",
    url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    headers: {
      accept: "audio/mpeg",
      "content-type": "application/json",
      "xi-api-key": API_KEY,
    },
    data: {
      text: inputText,
    },
    responseType: "arraybuffer",
  }

  try {
    console.log("Fetching text to speech...")
    const response = await axios.request(options)

    // Ensure the 'public/audio' directory exists
    fs.mkdirSync(path.dirname(audioPath), { recursive: true })

    // Write the audio data to an MP3 file
    fs.writeFileSync(audioPath, Buffer.from(response.data))

    // Return the path to the MP3 file
    return audioPath
  } catch (error) {
    console.error("Error fetching text to speech:", error)
    throw error
  }
}

export async function fetchAndSetAudio(stringToSpeak: string) {
  let name
  try {
    name = await fetchTextToSpeech(stringToSpeak)
  } catch (error) {
    console.error("Error fetching text to speech:", error)
  }

  return name?.slice(6)
}
