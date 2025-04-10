"use server"

// Server action to generate horoscope securely without exposing API key
export async function generateHoroscope(
  name: string,
  sign: string,
  mode: "fun" | "serious",
  filters: string[],
): Promise<string> {
  // Access the API key securely on the server
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY

  if (!apiKey) {
    console.error("OpenRouter API key is missing")
    return "The stars are currently misaligned. Please try again later."
  }

  try {
    const filtersText = filters.join(", ")
    const toneText = mode === "fun" ? "humorous and casual" : "serious and insightful"

    const prompt = `Generate a personalized horoscope for ${name} who is a ${sign}. 
    The tone should be ${toneText}. 
    Focus on these aspects of life: ${filtersText}.
    Keep it under 200 words and make it feel personalized.`

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://astronesia-ai.my.id",
        "X-Title": "Astronesia AI",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-maverick",
        messages: [
          {
            role: "system",
            content: "You are an expert astrologer who creates personalized horoscopes.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content.trim()
  } catch (error) {
    console.error("Error generating horoscope:", error)
    return "The cosmic energies are too strong right now. Please try again later."
  }
}
