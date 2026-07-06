# Spotlight

Spotlight is a [Tailwind UI](https://tailwindui.com) site template built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Getting started

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Next, create a `.env.local` file in the root of your project and set the `NEXT_PUBLIC_SITE_URL` variable to your site's public URL:

```
NEXT_PUBLIC_SITE_URL=https://example.com
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Konrad Agent (`/konrad-agent`)

A conversational portfolio guide backed by the Vercel AI SDK and a Replicate-hosted model.

**Files**

- `src/pages/konrad-agent.tsx` — the page and all of its UI (project cards, evidence, context chips, status states).
- `src/pages/api/agent.ts` — the streaming route handler. Builds the system prompt and calls Replicate.
- `src/lib/agent-knowledge.ts` — **the knowledge base; edit this to teach the agent.** Plain-text sections (`{ topic, content }`) that are all injected into the system prompt. The agent is instructed to never state a date, duration, number, or claim that isn't written here — so keep facts explicit, and add a new section whenever you want it to know more.
- `src/lib/agent-data.ts` — the structured project array that powers the UI: project cards, "Sources" evidence bullets, links, and the suggested prompts. Rule of thumb: `agent-knowledge.ts` is what the model says, `agent-data.ts` is what the interface shows.

**API key**

Put your Replicate key in `.env.local` (never commit it) and restart the dev server:

```
REPLICATE_API_TOKEN=r8_...
```

On Vercel, add `REPLICATE_API_TOKEN` under Project Settings → Environment Variables.

To demo the interface without an API key (or spending tokens), set `REPLICATE_API_TOKEN=mock` — the route streams a canned grounded answer instead of calling Replicate.

**Swapping the model**

The default model is `anthropic/claude-sonnet-4.6`. To change it, set `REPLICATE_MODEL` in `.env.local` (or edit `DEFAULT_MODEL` in `src/pages/api/agent.ts`). Any Replicate language model that accepts `prompt`, `system_prompt`, and `max_tokens` inputs works, e.g. `openai/gpt-4o-mini` or `meta/meta-llama-3.1-405b-instruct`.

## Customizing

You can start editing this template by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

## License

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [MDX](https://mdxjs.com) - the MDX documentation
