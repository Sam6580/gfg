const axios = require('axios')

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = process.env.GROQ_MODEL || 'llama3-8b-8192'

/**
 * Call Groq API with a prompt.
 * Returns the AI text response, or null if unavailable.
 */
async function callGroq(systemPrompt, userPrompt, maxTokens = 1500) {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    console.warn('⚠️  GROQ_API_KEY not set — using fallback')
    return null
  }

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: userPrompt   }
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      }
    )

    return response.data.choices[0]?.message?.content || null
  } catch (err) {
    const status = err.response?.status
    const msg    = err.response?.data?.error?.message || err.message
    console.error(`❌ Groq API error [${status}]: ${msg}`)
    return null
  }
}

/**
 * Parse JSON from AI response text.
 * Strips markdown code fences if present.
 */
function parseAIJson(text) {
  if (!text) return null
  try {
    // Strip ```json ... ``` fences
    const clean = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return null
  }
}

module.exports = { callGroq, parseAIJson }
