import {
  CalendarDaysIcon,
  CameraIcon,
  ChartBarSquareIcon,
  BookOpenIcon,
  DeviceTabletIcon,
  MapIcon,
  SparklesIcon,
  UserGroupIcon,
} from '@/components/ProjectIcons'
import logoHousecallpro from '@/images/logos/housecallpro.svg'
import logoMovieAvatars from '@/images/logos/movieavatars.svg'
import logoNeurosphere from '@/images/logos/neurosphere.svg'

const ramz = {
  name: 'Ramz',
  description:
    'Analyzes an interface, captures what makes it work, and turns it into clear design guidance for AI agents.',
  link: {
    href: 'https://github.com/musqulu/ramz-design-skill',
    label: 'github.com/musqulu/ramz-design-skill',
    target: '_blank',
  },
  internal: false,
  icon: SparklesIcon,
}

const boguslawAi = {
  name: 'Bogusław AI',
  description:
    'A working AI memory of my grandfather, rebuilt from an old VHS tape and family stories.',
  link: { href: '/studies/boguslaw-ai', label: 'View case study' },
  internal: true,
  icon: BookOpenIcon,
}

const aiBookingAgent = {
  name: 'AI Booking Agent',
  description:
    'Agentic workflow design — an AI assistant that diagnoses booking setup, recommends changes, and guides pros through human-in-the-loop approvals.',
  link: {
    href: '/studies/housecall-pro/ai-booking-agent',
    label: 'View case study',
  },
  internal: true,
  logo: logoHousecallpro,
}

const pipelineAutomations = {
  name: 'Pipeline & Automations',
  description:
    'Power-user research that reframed automations from board settings into an event-driven orchestration layer with readable, trustworthy rules.',
  link: {
    href: '/studies/housecall-pro/pipeline-automations',
    label: 'View case study',
  },
  internal: true,
  icon: ChartBarSquareIcon,
}

// Case studies nested under the Housecall Pro overview page.
export const housecallProjects = [
  {
    name: 'Online Booking',
    description:
      'A three-year product story — from a rigid booking widget to a conversion-tuned flow, across pro-facing setup and homeowner-facing booking.',
    link: {
      href: '/studies/housecall-pro/online-booking',
      label: 'View case study',
    },
    internal: true,
    icon: CalendarDaysIcon,
  },
  pipelineAutomations,
  aiBookingAgent,
]

export const selectedWork = [
  {
    name: 'Housecall Pro',
    description:
      'Simplifying revenue and operational workflows across CSR AI, automations, online booking, pipeline, and leads for home service businesses.',
    link: { href: '/studies/housecall-pro', label: 'View work' },
    internal: true,
    logo: logoHousecallpro,
  },
  aiBookingAgent,
  ramz,
  boguslawAi,
  {
    name: 'Neurosphere',
    description:
      'Designed neurofeedback-based mindfulness products across mobile, web, brand, and hardware experiments, translating real-time EEG data into clear user feedback.',
    link: { href: '/studies/neurosphere', label: 'View project' },
    internal: true,
    logo: logoNeurosphere,
  },
]

export const explorations = [
  ramz,
  {
    name: 'Analoghive',
    description:
      'Film development calculator, database and dashboard to track and manage your film development.',
    link: {
      href: 'https://github.com/musqulu/analoghive',
      label: 'github.com/musqulu/analoghive',
      target: '_blank',
    },
    internal: false,
    icon: CameraIcon,
  },
  boguslawAi,
  {
    name: 'Hermes Dash',
    description: 'Dashboard for hermes reports & agent management.',
    link: {
      href: 'https://github.com/musqulu/hermes-dash',
      label: 'github.com/musqulu/hermes-dash',
      target: '_blank',
    },
    internal: false,
    icon: ChartBarSquareIcon,
  },
  {
    name: 'Cloner',
    description:
      'AI cloning app questioning privacy through interactive art.',
    link: {
      href: 'https://github.com/musqulu/cloner',
      label: 'github.com/musqulu/cloner',
      target: '_blank',
    },
    internal: false,
    icon: UserGroupIcon,
  },
]

export const archivedProjects = [
  {
    name: 'Movie Avatars',
    description: 'Transform your photos into movie-inspired ai avatars.',
    link: { href: '#', label: 'Discontinued', target: '_blank' },
    internal: true,
    logo: logoMovieAvatars,
  },
  {
    name: 'Hikerstash',
    description: 'Manage, share & create best hiking setup.',
    link: {
      href: 'http://hikerstash.com',
      label: 'hikerstash.com',
      target: '_blank',
    },
    internal: false,
    icon: MapIcon,
  },
  {
    name: 'Uid8',
    description:
      'Low-fi design ipad app to quickly validate ideas and mock prototypes.',
    link: { href: '#', label: 'Discontinued', target: '_blank' },
    internal: true,
    icon: DeviceTabletIcon,
  },
]
