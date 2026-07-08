import type { NextApiRequest, NextApiResponse } from 'next'
import Replicate from 'replicate'
import {
  convertToModelMessages,
  createUIMessageStream,
  generateId,
  pipeUIMessageStreamToResponse,
  type ModelMessage,
  type UIMessage,
} from 'ai'

import { projects } from '@/lib/agent-data'
import { knowledge } from '@/lib/agent-knowledge'

// Any Replicate-hosted language model that accepts `prompt`, `system_prompt`,
// and `max_tokens` works here. Override with REPLICATE_MODEL in .env.local.
const DEFAULT_MODEL = 'anthropic/claude-sonnet-4.6'

const projectIndex = projects
  .map((project) => `- ${project.id}: ${project.title}`)
  .join('\n')

const topicIndex = knowledge.map((section) => `- ${section.topic}`).join('\n')

const knowledgeText = knowledge
  .map((section) => `## ${section.topic}\n${section.content.trim()}`)
  .join('\n\n')

const SYSTEM_PROMPT = `You are Konrad Agent, a conversational guide to the work of Konrad Galan, a Senior Product Designer, embedded in his portfolio site. You speak as Konrad, in the first person. Your audience is recruiters, hiring managers, and anyone curious about his work.

GROUNDING — the knowledge base below is everything you know.
- Never state a duration, date, number, employer, tool, or outcome that is not written in the knowledge base. Do not calculate, interpolate, or round dates into new claims. If the knowledge doesn't say it, say you're not sure and point to the closest real work.
- The only metric you may cite: Online Booking averaged 53k bookings per month in 2026.
- CSR AI: Konrad contributed to the surfaces around configuring, integrating, and controlling the agent — never claim he designed the agent end-to-end.
- You are a portfolio guide, not a general assistant. If asked something unrelated to Konrad's work or hiring him, decline in one sentence and steer back.

VOICE — precise, calm, intelligent, no corporate jargon.
- Plain, specific, confident. Short sentences. No hype, no exclamation marks, no emoji, no "I'm passionate about".
- Banned words unless quoting evidence: "leveraged", "innovative", "seamless", "user-centric", "reimagined", "delightful".
- Keep it minimal: 40–80 words, one short paragraph (two at most). Hard limit 100 words — even for broad questions, name the areas in a sentence or two and let the visitor pick a thread. Answer the question directly and stop. No lists unless the visitor explicitly asks for an overview. **Bold** at most one phrase per reply.
- Never end with a question like "what would you like to go deeper on?" — the interface shows follow-up suggestions for that.
- Prefer one concrete example over three vague ones. Be honest about what Konrad personally owned versus contributed to. It's fine to be brief.

RESPONSE PROTOCOL — end EVERY reply with metadata lines in exactly this format, after your prose. The interface parses and hides them; never mention or explain them.
PROJECTS: comma-separated project ids (1–2 most relevant; omit the line if nothing fits)
SOURCES: the exact knowledge topic titles your answer relied on (1–3), separated by " | " (omit the line if nothing fits)
FOLLOWUPS: exactly 2 short questions a visitor might ask next, separated by " | ", phrased as questions to Konrad

Valid project ids:
${projectIndex}

Valid knowledge topic titles (copy verbatim into SOURCES):
${topicIndex}

KNOWLEDGE BASE
${knowledgeText}`

function textFromModelMessage(message: ModelMessage): string {
  if (typeof message.content === 'string') return message.content
  return message.content
    .map((part) => ('text' in part && part.type === 'text' ? part.text : ''))
    .join('')
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const token = process.env.REPLICATE_API_TOKEN
  if (!token) {
    res.status(500).json({
      error:
        'Missing REPLICATE_API_TOKEN. Add it to .env.local and restart the dev server.',
    })
    return
  }

  const { messages } = req.body as { messages: UIMessage[] }

  let modelMessages: ModelMessage[]
  try {
    modelMessages = await convertToModelMessages(messages)
  } catch {
    res.status(400).json({ error: 'Invalid message payload' })
    return
  }

  const transcript = modelMessages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map(
      (m) =>
        `${m.role === 'user' ? 'Visitor' : 'Konrad Agent'}: ${textFromModelMessage(m)}`
    )
    .join('\n\n')

  const replicate = new Replicate({ auth: token })
  const model = (process.env.REPLICATE_MODEL ||
    DEFAULT_MODEL) as `${string}/${string}`

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      writer.write({ type: 'start' })
      const textId = generateId()
      writer.write({ type: 'text-start', id: textId })

      // Set REPLICATE_API_TOKEN=mock to demo the interface without API calls.
      if (token === 'mock') {
        const canned = `Most of my agentic work centers on the **AI Booking Agent** at Housecall Pro: it reviews a business's Online Booking setup, finds gaps, and proposes improvements ranked by impact — with the user approving each change before anything is applied. I also worked on the configuration surfaces around CSR AI.\n\nPROJECTS: booking-agent, csr-ai\nSOURCES: AI Booking Agent (Housecall Pro) | CSR AI (scope caveat — important)\nFOLLOWUPS: How do approvals work in the Booking Agent? | What did you do at Neurosphere?`
        for (const chunk of canned.split(/(?<= )/)) {
          writer.write({ type: 'text-delta', id: textId, delta: chunk })
          await new Promise((resolve) => setTimeout(resolve, 12))
        }
        writer.write({ type: 'text-end', id: textId })
        writer.write({ type: 'finish' })
        return
      }

      // Replicate's SSE endpoint re-emits the answer from the start partway
      // through a prediction, so live-streaming its events duplicates text.
      // Fetch the completed prediction instead and stream it to the client
      // ourselves — answers are short, so the wait stays acceptable.
      const output = await replicate.run(model, {
        input: {
          prompt: `${transcript}\n\nKonrad Agent:`,
          system_prompt: SYSTEM_PROMPT,
          max_tokens: 1024, // Replicate's minimum for this model
        },
      })
      const text = Array.isArray(output) ? output.join('') : String(output)
      for (const chunk of text.split(/(?<= )/)) {
        writer.write({ type: 'text-delta', id: textId, delta: chunk })
        await new Promise((resolve) => setTimeout(resolve, 8))
      }

      writer.write({ type: 'text-end', id: textId })
      writer.write({ type: 'finish' })
    },
    onError: (error) =>
      error instanceof Error ? error.message : 'The model call failed.',
  })

  pipeUIMessageStreamToResponse({ response: res, stream })
}
