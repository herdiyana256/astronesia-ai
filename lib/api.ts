// Import the server action
import { generateHoroscope } from "@/actions/horoscope-actions"

// API client that uses the server action
export async function generateHoroscopeFromAI(
  name: string,
  sign: string,
  mode: "fun" | "serious",
  filters: string[],
): Promise<string> {
  try {
    // Call the server action instead of directly making the API call
    return await generateHoroscope(name, sign, mode, filters)
  } catch (error) {
    console.error("Error generating horoscope:", error)
    return "The cosmic energies are too strong right now. Please try again later."
  }
}
