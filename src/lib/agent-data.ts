// Grounding data for Portfolio agent (/portfolio-agent).
// This is the single source of truth for what the agent can claim.
// Edit this file to update projects, evidence, or suggested prompts.

export type Project = {
  id: string
  title: string
  shortTitle?: string // used in context chips
  summary: string
  themes: string[]
  evidence: string[] // short bullet points, used for "Based on" cards
  metric?: string // optional single stat
  note?: string // optional caveat, e.g. scope clarification
  href?: string // link to a real case study or repo, when one exists
  external?: boolean
}

export const projects: Project[] = [
  {
    id: 'booking-agent',
    title: 'AI Booking Agent',
    shortTitle: 'AI Booking Agent',
    summary:
      'Designed an agentic workflow that reviews Online Booking setup, identifies opportunities, recommends high-impact improvements, and guides users through human-in-the-loop approval before changes are applied.',
    themes: [
      'AI agents',
      'agentic workflows',
      'human-in-the-loop',
      'setup diagnosis',
      'recommendations',
      'explainability',
      'automation',
      'conversion',
    ],
    evidence: [
      'Uses existing business and booking configuration',
      'Identifies setup gaps and opportunities',
      'Ranks recommendations by impact',
      'Gives users approval before applying changes',
      'Connects recommendations to existing booking settings',
    ],
    href: '/studies/housecall-pro/ai-booking-agent',
  },
  {
    id: 'housecall-pro',
    title: 'Housecall Pro: AI, booking, leads, and workflow systems',
    shortTitle: 'Housecall Pro',
    summary:
      'Worked across CSR AI, Automations, Online Booking, Booking Agent, Pipeline, Leads, service areas, payments, and lead intake for home service businesses.',
    themes: [
      'SaaS',
      'operations',
      'revenue workflows',
      'booking',
      'leads',
      'automation',
      'payments',
      'complex systems',
    ],
    evidence: [
      'Online Booking owned end to end for 3+ years (pro setup and homeowner flow)',
      'Reported homeowner conversion roughly tripled in H1 2026 (~6% to ~19%) after finding and filtering out bot traffic that had been masking the real rate',
      'Map-based service areas',
      'Lead Forms and intake flows',
      'Deposits and payments',
      'Pipeline invoice board redesign',
      'Automation redesign with custom flows',
      'CSR AI settings and integrations',
    ],
    metric: '~18k bookings per week (~70k+ per month) in 2026',
    href: '/studies/housecall-pro',
  },
  {
    id: 'csr-ai',
    title: 'CSR AI settings and integrations',
    shortTitle: 'CSR AI',
    summary:
      'Worked on settings, configuration, integrations, and user controls around an AI customer-service agent inside the platform.',
    themes: [
      'AI configuration',
      'user control',
      'agent behavior',
      'integrations',
      'operational workflows',
    ],
    evidence: [
      'Settings and configuration surfaces for an AI customer-service agent',
      'Integration touchpoints with the rest of the platform',
      'User controls over agent behavior',
    ],
    note: 'Contributed to the product surfaces around how the agent is configured, integrated, and used — not the full agent end-to-end.',
  },
  {
    id: 'pipeline-automations',
    title: 'Pipeline and Automations',
    shortTitle: 'Pipeline & Automations',
    summary:
      'Led power-user research that reframed Pipeline from a board into a control system, opened up the existing Automations experience with custom automations and clearer rules, and shaped a longer-term direction toward orchestration.',
    themes: [
      'workflow UX',
      'orchestration',
      'triggers',
      'conditions',
      'exclusions',
      'power-user research',
      'operational systems',
      'platform strategy',
    ],
    evidence: [
      'Power-user interviews and prototype testing reframed the product direction',
      'Redesigned Automations surface with more human-readable rules',
      'Custom automations, editable defaults, and custom-board automation',
      'Longer-term direction toward event-based triggers beyond board status changes',
      'Human-readable sentence-style rules grouped by intent',
      'Conditions and exclusions for expressive, trustworthy automation',
      'Thousands of businesses sending 100k+ automated follow-ups monthly',
    ],
    href: '/studies/housecall-pro/pipeline-automations',
  },
  {
    id: 'lead-forms',
    title: 'Lead Forms',
    shortTitle: 'Lead Forms',
    summary:
      'Designed a new lead capture and intake system that helps businesses collect customer information, reduce friction, and route leads into the right operational workflow.',
    themes: [
      'conversion',
      'customer intake',
      'forms',
      'routing',
      'pipeline integration',
    ],
    evidence: [
      'Lead capture and intake system design',
      'Friction reduction in customer-facing forms',
      'Routing leads into operational workflows',
    ],
  },
  {
    id: 'neurosphere',
    title: 'Neurosphere',
    shortTitle: 'Neurosphere',
    summary:
      'Designed neurofeedback-based mindfulness products across mobile, web, brand, and hardware experiments. Worked with real-time EEG feedback and helped translate noisy physical signals into clear, calming user experiences.',
    themes: [
      'mobile',
      'hardware',
      'real-time feedback',
      'wellbeing',
      'research',
      'brand direction',
      'experimental UX',
    ],
    evidence: [
      'Mobile app UX',
      'Qualitative and quantitative research',
      'Web platform and marketing site',
      'Payment flows',
      'Brand direction and visual identity',
      'Early hardware experiments',
    ],
    href: '/studies/neurosphere',
  },
  {
    id: 'experimental-ai',
    title: 'Experimental AI, voice, memory, and installation work',
    shortTitle: 'Experimental AI',
    summary:
      'Exploring AI-related art projects involving voice, memory, images, creative tools, and interactive installations.',
    themes: [
      'art direction',
      'visual experimentation',
      'realtime voice',
      'memory',
      'physical space',
      'experimental interfaces',
    ],
    evidence: [
      'Bogusław AI: a working AI memory of my grandfather, built from a VHS tape, family stories, a cloned voice, and a realtime voice model (open source)',
      'Speaking/listening interface states instead of a fake face; archival VHS clips play when a memory is recalled',
      'Hermes Dash: a dashboard for Hermes reports and agent management (open source)',
      'Ramz: analyzes an interface and turns it into design guidance for AI agents (open source)',
      'Cloner: AI cloning app questioning privacy through interactive art',
    ],
    href: '/studies/boguslaw-ai',
  },
  {
    id: 'photography',
    title: 'Photography and visual practice',
    shortTitle: 'Photography',
    summary:
      'Currently pursuing a degree in Photography at the Łódź Film School. This practice influences how I think about presence, memory, atmosphere, composition, and human experience in technology.',
    themes: [
      'photography',
      'art direction',
      'composition',
      'presence',
      'memory',
    ],
    evidence: [
      'Photography degree in progress at the Łódź Film School',
      'Ongoing personal photographic practice published on this site',
    ],
    href: '/adventures',
  },
]

export type SuggestedPrompt = {
  label: string
  prompt: string
}

export const suggestedPrompts: SuggestedPrompt[] = [
  {
    label: 'Explore my agentic AI work',
    prompt: 'Explore your agentic AI work.',
  },
  {
    label: 'Show human-in-the-loop workflows',
    prompt: 'Show me your human-in-the-loop workflows.',
  },
  {
    label: 'Explain my Housecall Pro work',
    prompt: 'Explain your work at Housecall Pro.',
  },
  {
    label: 'Show mobile and hardware projects',
    prompt: 'Show me your mobile and hardware projects.',
  },
  {
    label: 'How I prototype with code',
    prompt: 'How do you prototype with code?',
  },
]
