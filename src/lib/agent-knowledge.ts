// Knowledge base for Portfolio agent (/portfolio-agent).
// Every section below is injected into the model's system prompt on each
// request — this is everything the agent is allowed to know and claim.
//
// To teach the agent more: add or edit a section here. Keep facts explicit
// (especially dates, durations, and numbers) — the agent is instructed to
// never state anything that isn't written down in these sections.

export type KnowledgeSection = {
  topic: string
  content: string
}

export const knowledge: KnowledgeSection[] = [
  {
    topic: 'Core profile and positioning',
    content: `
Konrad is a senior product designer working in complex SaaS environments, with particular experience in online booking, lead capture, payments, conversion flows, pipeline systems, automation, and AI-assisted product concepts.

He combines three perspectives that are usually separate:
- Product designer: cares about user behavior, business outcomes, flows, interfaces, and implementation reality.
- Systems thinker: sees products as connected operational systems rather than isolated screens.
- Artist and photographer: brings visual sensitivity, narrative thinking, and an interest in ambiguity, memory, archives, and human experience.

Accurate positioning: "Senior product designer who brings systems thinking, product judgment, conversion awareness, and a distinct visual/creative perspective to complex SaaS workflows." Or: "Product designer working at the intersection of customer experience, operational systems, and emerging AI workflows."

Never present him as: a generic UI/UX designer, someone who only executes requirements, a purely visual creative moving into product, an "AI designer" without concrete product grounding, or a strategist with no craft. His value is connecting strategy, systems, user behavior, interface clarity, and implementation reality.`,
  },
  {
    topic: 'How Konrad thinks about problems',
    content: `
He does not start from "what screen should we make?" He starts with: what is actually broken in the current journey, who experiences the cost of that failure, what constraint is creating it, what evidence would make the problem undeniable, and what is the smallest meaningful intervention.

- He reframes vague requests ("improve conversion", "add AI") into a decision problem: what action are users failing to take, and is the blocker motivation, comprehension, trust, speed, configuration, or technical friction? He is strongest when allowed to challenge the framing before executing.
- He looks for system effects: a setting in online booking affects the homeowner, the pro, scheduling, payments, staff workflow, communication, reporting, and support burden. He looks for shared components, shared language, and common data structures across surfaces.
- He uses evidence without being trapped by dashboards: he questions whether a metric is distorted by bot traffic, whether averages hide segments, whether a funnel drop-off is usability or trust or traffic quality. Evidence sharpens judgment; it doesn't replace it.
- He treats edge cases as signals: rare-but-high-impact, a hidden user segment, or a sign the data model is too rigid.

He is suspicious of "feature theater" — polished concepts that don't solve a meaningful operational or behavioral problem. He prefers products that make difficult things feel manageable: fewer unnecessary decisions, the right information at the right time, good defaults, progressive disclosure for advanced cases.`,
  },
  {
    topic: 'Design philosophy',
    content: `
Konrad values design that is: useful before decorative; clear without becoming simplistic; restrained but not sterile; flexible enough to handle real-world complexity; honest about constraints, pricing, automation, and consequences; grounded in actual workflows rather than idealized journeys; visually intentional, but never dependent on polish alone.`,
  },
  {
    topic: 'How Konrad approaches AI products',
    content: `
Konrad is interested in AI when it helps users make better decisions or reduces operational work — not as a decorative layer or a separate novelty interface.

His preferred AI pattern:
- Start inside an existing workflow rather than inventing an isolated assistant.
- Ground the system in real account or business data.
- Make recommendations explainable.
- Let users review, edit, approve, or apply changes.
- Build trust through useful small actions before attempting full automation.
- Be clear about what the model knows, what it doesn't, and what inputs it needs.

The AI Booking Agent is this pattern in practice: inspect a company's configuration, identify missed opportunities, explain why they matter, and suggest practical improvements the user approves.`,
  },
  {
    topic: 'Collaboration and communication style',
    content: `
Konrad works best as a collaborative thought partner, not a passive order-taker. He contributes most when he can understand the commercial and operational context, talk directly with product, engineering, support, and users, challenge assumptions early, and share rough thinking before it's polished. He uses prototypes and concrete examples to make ambiguity discussable — a working prototype beats a spec, especially for AI behavior.

He is direct but constructive. He's frustrated by environments where design is reduced to producing screens after decisions are made. His communication is exploratory, visual, and iterative: he thinks aloud through possibilities before converging, then makes the final logic clear.`,
  },
  {
    topic: 'Creative practice and how it informs product work',
    content: `
Konrad's photography and installation work explores memory and archives, home and inherited history, burnout and mediated life, artificial landscapes, identity, and human presence within technological systems.

Do NOT frame this as "he is artistic, therefore he makes pretty interfaces." The accurate claim: his creative practice improves his ability to observe, frame problems, construct meaning, and create deliberate experiences. He notices how interfaces feel, not only how they function; he considers narrative and emotional progression across a journey; he is comfortable with unfinished, ambiguous, or emerging ideas.`,
  },
  {
    topic: 'Bio and timeline',
    content: `
Konrad Galan, Senior Product Designer.

Timeline (the ONLY durations and dates that may be stated):
- Housecall Pro: Product Designer, May 2022 to present — about 4 years.
- AI agent work at Housecall Pro (AI Booking Agent, CSR AI surfaces): started around 2025 — about a year of dedicated AI-agent work. Before that the Housecall Pro work was booking, leads, payments, and workflow systems.
- Neurosphere (Berlin neurofeedback startup): Senior Product Designer, April 2019 to May 2022.
- Ultimo.studio: Product Designer, 2016 to 2017.
- Freelance design and development: 2013 to 2022, alongside other roles.
- Łódź Film School: Photography degree, currently in progress.

Works across: AI agents, complex SaaS workflows, human-in-the-loop systems, product strategy, interaction design, visual craft, code-based prototypes, experimental interfaces, and art/AI installations.`,
  },
  {
    topic: 'AI Booking Agent (Housecall Pro)',
    content: `
An agentic workflow that helps home service pros fix misconfigured online booking. Many pros enabled Online Booking but never configured it well — incomplete services, wrong availability, vague copy — quietly killing conversion.

How it works, in five states: the agent looks through the pro's current booking settings, analyzes what's misconfigured or hurting conversion, suggests specific improvements categorized by business impact, the pro decides — accepting or declining each change before anything is applied — and then it continues to the next recommendation. One conversation per step, not a settings maze.

The suggestions are grounded in real data: analysis of product data and of top-performing HVAC pros' configurations, turned into guidelines covering services, availability, copy, and flow.

Human-in-the-loop by default: nothing applies automatically. Every recommendation shows a clear summary of what would change on the live booking page. The agent proposes, the pro decides.

There is a working interactive prototype with multiple scenarios (incomplete setups, misconfigured availability, weak descriptions) showing how the same logic surfaces different improvements. Case study: /studies/housecall-pro/ai-booking-agent.`,
  },
  {
    topic: 'Housecall Pro ecosystem',
    content: `
Housecall Pro is a platform for home service businesses. Konrad has worked across its revenue and operations surfaces: Online Booking setup and conversion, map-based service areas, Lead Forms and intake flows, deposits and payments, the Pipeline invoice board redesign, an Automations redesign with custom flows, and CSR AI settings and integrations.

Konrad owned Online Booking design end to end for 3+ years, across the pro-facing setup and the homeowner-facing booking flow. A parent overview lives at /studies/housecall-pro, with individual case studies for Online Booking (/studies/housecall-pro/online-booking), Pipeline & Automations (/studies/housecall-pro/pipeline-automations), and the AI Booking Agent (/studies/housecall-pro/ai-booking-agent).

Scale: Online Booking runs ~18k bookings per week (~70k+ per month) in 2026, and reported homeowner end-to-end conversion roughly tripled in H1 2026 (~6% to ~19%) after finding and filtering out bot traffic that had been masking the real rate (the lift came from a data-quality fix, not from a single redesign). Those are the only metrics that may be cited.`,
  },
  {
    topic: 'CSR AI (scope caveat — important)',
    content: `
CSR AI is an AI customer-service agent inside Housecall Pro. Konrad did NOT design the full agent end-to-end and must never claim to. He contributed to the product surfaces around it: settings, configuration, integrations with the rest of the platform, and user controls over agent behavior — the parts that determine how businesses set up, trust, and steer the agent.`,
  },
  {
    topic: 'Pipeline and Automations',
    content: `
Led power-user research that reframed how Housecall Pro thought about Pipeline. The most valuable customers were not using the board as a Kanban view. They were using it as a control system. That insight shifted the work from "add more board settings" toward opening up the existing Automations system: custom automations, editable defaults, custom-board automation, clearer human-readable rules, and a longer-term path toward orchestration.

The broader product-wide orchestration layer did not fully ship. It became the strategic direction, then slowed because of constraints, competing priorities, and the shift toward agentic product strategy. The key design position: predictable workflows need explicit, auditable rule-based automations, while agents are better for ambiguous, contextual, judgment-heavy work.

Automations are among Pipeline's most-adopted capabilities, with thousands of businesses sending 100k+ automated follow-ups a month and estimate follow-ups as the dominant use case. Case study: /studies/housecall-pro/pipeline-automations.`,
  },
  {
    topic: 'Lead Forms',
    content: `
Designed a new lead capture and intake system: helps businesses collect customer information with less friction and routes leads into the right operational workflow, connecting intake to the pipeline.`,
  },
  {
    topic: 'Neurosphere',
    content: `
Berlin startup building mindfulness products powered by real-time EEG neurofeedback: a textile headband reads brainwave activity and turns it into audio feedback through a companion app.

Konrad's work grew from UX on the existing product into product direction across mobile, web, brand, and physical touchpoints: mobile app UX and the core neurofeedback session flows (meditation selection, live sessions with device connection, progress tracking, session summaries that translate EEG data into something users understand), qualitative and quantitative research, the web platform and marketing site, a 6-week mindfulness course platform, payment flows, brand direction and visual identity, and early hardware experiments.

The core design challenge: translating noisy real-time physical signals into clear, calm user experiences. Case study: /studies/neurosphere.`,
  },
  {
    topic: 'Experimental AI, voice, memory, and installation work',
    content: `
Personal, ongoing explorations at the intersection of AI, art, and interfaces:

- Bogusław AI: a working AI memory of Konrad's grandfather, rebuilt from a single VHS tape and family stories. The voice was cloned with ElevenLabs with a realtime layer on top, so you can actually hold a conversation with it. Memories from family members get folded into the same voice over time — a shared, composite memory. The interface deliberately avoids a fake face: while listening it is a rough pattern of light (like a face fading in memory); when it speaks about a specific memory, the old VHS clip tied to that memory plays behind it. Fully open source, paired with a documentary film project. Case study: /studies/boguslaw-ai.
- Hermes Dash: an open-source dashboard for Hermes reports and agent management (github.com/musqulu/hermes-dash).
- Ramz: an open-source tool that analyzes an interface, captures what makes it work, and turns it into design guidance for AI agents (github.com/musqulu/ramz-design-skill).
- Cloner: an AI cloning app questioning privacy through interactive art.`,
  },
  {
    topic: 'Photography and visual practice',
    content: `
Currently pursuing a Photography degree at the Łódź Film School. This practice shapes how Konrad thinks about presence, memory, atmosphere, composition, and human experience in technology — it feeds directly into projects like Bogusław AI and into visual craft in product work. Photos are published on the portfolio site under /adventures.`,
  },
  {
    topic: 'How I prototype with code',
    content: `
Konrad uses working code to make ambiguous concepts tangible early: Next.js prototypes (the AI Booking Agent scenario prototype, this very conversational interface), realtime voice experiments (Bogusław AI runs on a cloned voice plus a realtime model), and small open-source tools (Ramz, Hermes Dash, Analoghive). Prototypes are how he works with engineers — a shared artifact beats a spec, especially for AI behavior that is hard to communicate in static mockups.`,
  },
]
