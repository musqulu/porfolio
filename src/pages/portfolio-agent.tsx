import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import clsx from 'clsx'

import { Button as UntypedButton } from '@/components/Button'
import { Container as UntypedContainer } from '@/components/Container'
import { projects, suggestedPrompts, type Project } from '@/lib/agent-data'

// Container and Button are untyped .jsx components; give them usable types here.
const Container = UntypedContainer as React.ComponentType<
  React.ComponentPropsWithoutRef<'div'>
>
const Button = UntypedButton as React.ComponentType<
  React.ComponentPropsWithoutRef<'button'> & {
    variant?: 'primary' | 'secondary'
    href?: string
  }
>

const transport = new DefaultChatTransport({ api: '/api/agent' })

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PresenceDot() {
  return (
    <span className="relative flex h-2 w-2" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-30 motion-reduce:animate-none" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
    </span>
  )
}

/* ---------- assistant message parsing ---------- */

type ParsedMessage = {
  body: string
  projectIds: string[]
  sources: string[]
  followups: string[]
}

const DIRECTIVES = ['PROJECTS:', 'SOURCES:', 'FOLLOWUPS:', 'CHOICE:']

function couldBeDirective(line: string) {
  return DIRECTIVES.some((d) => d.startsWith(line) || line.startsWith(d))
}

function parseAgentMessage(raw: string, streaming: boolean): ParsedMessage {
  const projectIds: string[] = []
  const sources: string[] = []
  const followups: string[] = []
  const bodyLines: string[] = []

  for (const line of raw.split('\n')) {
    const match = line.match(
      /^\s*(PROJECTS|SOURCES|FOLLOWUPS|CHOICE)\s*:\s*(.*)$/
    )
    if (match) {
      const values = match[2]
        .split(match[1] === 'PROJECTS' ? ',' : '|')
        .map((value) => value.trim())
        .filter(Boolean)
      if (match[1] === 'PROJECTS') projectIds.push(...values)
      else if (match[1] === 'SOURCES') sources.push(...values)
      else if (match[1] === 'FOLLOWUPS') followups.push(...values)
      // CHOICE lines are stripped but no longer rendered.
      continue
    }
    bodyLines.push(line)
  }

  // Trim trailing separators, and while streaming hide a partially
  // received directive line so it never flashes in the answer.
  while (bodyLines.length > 0) {
    const last = bodyLines[bodyLines.length - 1].trim()
    if (
      last === '' ||
      last === '---' ||
      (streaming && couldBeDirective(last))
    ) {
      bodyLines.pop()
    } else {
      break
    }
  }

  return {
    body: bodyLines.join('\n'),
    projectIds,
    sources: sources.slice(0, 3),
    followups: followups.slice(0, 3),
  }
}

function messageText(message: UIMessage): string {
  return message.parts
    .map((part) => (part.type === 'text' ? part.text : ''))
    .join('')
}

function referencedProjects(ids: string[]): Project[] {
  return ids
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project))
    .slice(0, 2)
}

/* ---------- markdown rendering ---------- */

const markdownComponents: Components = {
  p: ({ node, ...props }) => (
    <p className="my-3 first:mt-0 last:mb-0" {...props} />
  ),
  ul: ({ node, ordered, ...props }) => (
    <ul className="my-3 list-disc space-y-1 pl-5 first:mt-0 last:mb-0" {...props} />
  ),
  ol: ({ node, ordered, ...props }) => (
    <ol className="my-3 list-decimal space-y-1 pl-5 first:mt-0 last:mb-0" {...props} />
  ),
  li: ({ node, ordered, ...props }) => <li {...props} />,
  strong: ({ node, ...props }) => (
    <strong
      className="font-semibold text-zinc-800 dark:text-zinc-100"
      {...props}
    />
  ),
  a: ({ node, href, ...props }) => (
    <a
      {...props}
      href={href}
      className="font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
    />
  ),
  h1: ({ node, ...props }) => (
    <h3
      className="mb-2 mt-5 text-sm font-semibold text-zinc-800 first:mt-0 dark:text-zinc-100"
      {...props}
    />
  ),
  h2: ({ node, ...props }) => (
    <h3
      className="mb-2 mt-5 text-sm font-semibold text-zinc-800 first:mt-0 dark:text-zinc-100"
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <h3
      className="mb-2 mt-5 text-sm font-semibold text-zinc-800 first:mt-0 dark:text-zinc-100"
      {...props}
    />
  ),
}

/* ---------- small pieces ---------- */

const THINKING_STEPS = [
  'Reading your question',
  "Searching Konrad's project notes",
  'Drafting a grounded answer',
]

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function StatusLine() {
  const reducedMotion = usePrefersReducedMotion()
  const [step, setStep] = useState(0)

  // Advance through the steps on a timer, then hold on the final step until
  // the answer starts streaming in. Skipped when the user prefers reduced
  // motion — a single quiet line is shown instead.
  useEffect(() => {
    if (reducedMotion) return
    if (step >= THINKING_STEPS.length - 1) return
    const timer = setTimeout(() => setStep((current) => current + 1), 900)
    return () => clearTimeout(timer)
  }, [step, reducedMotion])

  return (
    <div aria-live="polite" className="space-y-1.5">
      {THINKING_STEPS.map((label, index) => {
        const active = index === step
        const done = index < step
        if (reducedMotion && index > 0) return null
        return (
          <p
            key={label}
            className={clsx(
              'flex items-center gap-2 font-mono text-xs transition-colors',
              active
                ? 'text-zinc-500 dark:text-zinc-400'
                : done
                  ? 'text-zinc-400/70 dark:text-zinc-500/70'
                  : 'text-zinc-300 dark:text-zinc-600'
            )}
          >
            <span aria-hidden="true">
              {done ? '✓' : active ? '▍' : '·'}
            </span>
            <span
              className={clsx(
                active &&
                  !reducedMotion &&
                  'animate-pulse motion-reduce:animate-none'
              )}
            >
              {reducedMotion ? 'Thinking…' : `${label}…`}
            </span>
          </p>
        )
      })}
    </div>
  )
}

function SourcesLine({ topics }: { topics: string[] }) {
  if (topics.length === 0) return null
  return (
    <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-zinc-400 dark:text-zinc-500">
      <span className="text-zinc-400 dark:text-zinc-500">Based on</span>
      {topics.map((topic) => (
        <span
          key={topic}
          className="rounded-full border border-zinc-200 px-2 py-0.5 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
        >
          {topic}
        </span>
      ))}
    </p>
  )
}

function RelatedLinks({ items }: { items: Project[] }) {
  const linked = items.filter((project) => project.href)
  if (linked.length === 0) return null
  return (
    <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 dark:text-zinc-500">
      Related:
      {linked.map((project) =>
        project.external ? (
          <a
            key={project.id}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center font-medium text-red-400 hover:text-red-500"
          >
            {project.shortTitle ?? project.title}
            <ChevronRightIcon className="ml-0.5 h-3.5 w-3.5 stroke-current" />
          </a>
        ) : (
          <Link
            key={project.id}
            href={project.href!}
            className="flex items-center font-medium text-red-400 hover:text-red-500"
          >
            {project.shortTitle ?? project.title}
            <ChevronRightIcon className="ml-0.5 h-3.5 w-3.5 stroke-current" />
          </Link>
        )
      )}
    </p>
  )
}

function PillButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-full border border-zinc-200 px-4 py-1.5 text-left text-sm text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
    >
      {children}
    </button>
  )
}

/* ---------- page ---------- */

export default function PortfolioAgent() {
  const {
    messages,
    sendMessage,
    status,
    error,
    stop,
    regenerate,
    setMessages,
    clearError,
  } = useChat({ transport })

  const [input, setInput] = useState('')
  const activeExchangeRef = useRef<HTMLDivElement>(null)

  const busy = status === 'submitted' || status === 'streaming'
  const hasConversation = messages.length > 0

  const lastUserIndex = messages.reduce(
    (found, message, index) => (message.role === 'user' ? index : found),
    -1
  )
  const lastUserMessage = lastUserIndex >= 0 ? messages[lastUserIndex] : null

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || busy) return
    void sendMessage({ text: trimmed })
    setInput('')
  }

  // Pin the freshly sent question to the top of the viewport; the answer
  // streams into the space below it.
  const lastUserId = lastUserMessage?.id
  useEffect(() => {
    if (!lastUserId) return
    activeExchangeRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [lastUserId])

  function reset() {
    stop()
    clearError()
    setMessages([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function renderMessage(message: UIMessage, messageIndex: number) {
    if (message.role === 'user') {
      return (
        <div className="flex justify-end animate-fade-up motion-reduce:animate-none">
          <div className="max-w-[85%] rounded-2xl bg-zinc-100 px-4 py-2.5 text-sm text-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-200">
            {messageText(message)}
          </div>
        </div>
      )
    }

    const isLast = messageIndex === messages.length - 1
    const isStreamingThis = isLast && status === 'streaming'
    const parsed = parseAgentMessage(messageText(message), isStreamingThis)
    const related = referencedProjects(parsed.projectIds)

    return (
      <div className="animate-fade-up motion-reduce:animate-none">
        <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
          Portfolio agent
        </p>
        <div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {isStreamingThis ? `${parsed.body} ▍` : parsed.body}
          </ReactMarkdown>
        </div>

        {!isStreamingThis && (
          <div className="animate-fade-up motion-reduce:animate-none">
            <SourcesLine topics={parsed.sources} />
            <RelatedLinks items={related} />

            {parsed.followups.length > 0 && isLast && status === 'ready' && (
              <div className="mt-4 flex flex-wrap gap-2">
                {parsed.followups.map((followup) => (
                  <PillButton key={followup} onClick={() => send(followup)}>
                    {followup}
                  </PillButton>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // Everything from the latest question onward lives in one wrapper that is
  // scrolled to the top of the viewport and given room for the answer.
  const settledMessages =
    lastUserIndex >= 0 ? messages.slice(0, lastUserIndex) : messages
  const activeMessages = lastUserIndex >= 0 ? messages.slice(lastUserIndex) : []

  const showStatusLine =
    status === 'submitted' ||
    (status === 'streaming' &&
      messages[messages.length - 1]?.role === 'assistant' &&
      messageText(messages[messages.length - 1]).trim() === '')

  return (
    <>
      <Head>
        <title>Portfolio agent - Konrad Galan</title>
        <meta
          name="description"
          content="A conversational guide to Konrad Galan's work in AI agents, workflow systems, product design, and experimental interfaces."
        />
      </Head>

      <Container className="mt-16 sm:mt-24">
        <div className="max-w-2xl">
          {/* Hero: full on the empty state, one quiet line once chatting */}
          {!hasConversation ? (
            <header>
              <div className="flex items-center gap-2.5 text-sm text-zinc-400 dark:text-zinc-500">
                <PresenceDot />
                Portfolio guide, not a general assistant
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
                Portfolio agent
              </h1>
              <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                A conversational guide to my work in AI agents, workflow
                systems, product design, and experimental interfaces.
              </p>
            </header>
          ) : (
            <header className="flex items-center gap-2.5 animate-fade-up motion-reduce:animate-none">
              <PresenceDot />
              <span className="text-sm font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                Portfolio agent
              </span>
            </header>
          )}

          {/* Empty state: suggested prompts */}
          {!hasConversation && (
            <div className="mt-10 flex flex-wrap gap-2">
              {suggestedPrompts.map((suggestion) => (
                <PillButton
                  key={suggestion.label}
                  disabled={busy}
                  onClick={() => send(suggestion.prompt)}
                >
                  {suggestion.label}
                </PillButton>
              ))}
            </div>
          )}

          {/* Conversation */}
          {hasConversation && (
            <div className="mt-10">
              <div className="space-y-8">
                {settledMessages.map((message, index) => (
                  <div key={message.id}>{renderMessage(message, index)}</div>
                ))}
              </div>

              <div
                ref={activeExchangeRef}
                className={clsx(
                  'scroll-mt-24 space-y-8',
                  settledMessages.length > 0 && 'mt-8',
                  busy && 'min-h-[60vh]'
                )}
              >
                {activeMessages.map((message, index) => (
                  <div key={message.id}>
                    {renderMessage(message, settledMessages.length + index)}
                  </div>
                ))}

                {showStatusLine && <StatusLine />}

                {error && (
                  <div className="rounded-2xl border border-red-500/20 p-4 text-sm text-zinc-600 dark:text-zinc-400">
                    <p className="font-medium text-red-500 dark:text-red-400">
                      Something went wrong
                    </p>
                    <p className="mt-1 text-xs">{error.message}</p>
                    <div className="mt-3">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          clearError()
                          void regenerate()
                        }}
                      >
                        Try again
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="mt-10">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                send(input)
              }}
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about my work…"
                  aria-label="Ask Portfolio agent about Konrad's work"
                  className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] text-sm shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-red-400 dark:focus:ring-red-400/10"
                />
                {busy ? (
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-none"
                    onClick={() => stop()}
                  >
                    Stop
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-none"
                    disabled={input.trim() === ''}
                  >
                    Ask
                  </Button>
                )}
              </div>
            </form>

            <div className="mt-3 flex items-center justify-between gap-4">
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Answers are grounded in real project work.
              </p>
              {hasConversation && (
                <button
                  type="button"
                  onClick={reset}
                  className="flex-none text-xs text-zinc-400 transition hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                >
                  Clear conversation
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
