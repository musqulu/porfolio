import logoAnaloghive from '@/images/logos/analoghive.png'
import logoCloner from '@/images/logos/cloner.png'
import logoHermesDash from '@/images/logos/hermes-dash.png'
import logoHikerstash from '@/images/logos/hikerstash.png'
import logoHousecallpro from '@/images/logos/housecallpro.svg'
import logoMemo from '@/images/logos/memo.png'
import logoMovieAvatars from '@/images/logos/movieavatars.svg'
import logoNeurosphere from '@/images/logos/neurosphere.svg'
import logoRamz from '@/images/logos/ramz.png'
import logoUid8 from '@/images/logos/uid8.png'

export const selectedWork = [
  {
    name: 'Housecall Pro',
    description:
      'Simplifying revenue and operational workflows across CSR AI, online booking, pipeline, and leads for home service businesses.',
    link: {
      href: 'https://www.housecallpro.com/features/online-booking/',
      label: 'housecallpro.com',
      target: '_blank',
    },
    internal: false,
    logo: logoHousecallpro,
  },
  {
    name: 'HCP AI Booking agent',
    description:
      'Agentic workflow design — an AI assistant that diagnoses booking setup, recommends changes, and guides pros through human-in-the-loop approvals.',
    link: { href: '/studies/online-booking', label: 'View case study' },
    internal: true,
    logo: logoHousecallpro,
  },
  {
    name: 'Neurosphere',
    description:
      'Neurofeedback based meditation training for improved well-being.',
    link: { href: '/studies/neurosphere', label: 'View project' },
    internal: true,
    logo: logoNeurosphere,
  },
]

export const explorations = [
  {
    name: 'Ramz',
    description:
      'Analyzes an interface, captures what makes it work, and turns it into clear design guidance for AI agents.',
    link: {
      href: 'https://github.com/musqulu/ramz-design-skill',
      label: 'github.com/musqulu/ramz-design-skill',
      target: '_blank',
    },
    internal: false,
    logo: logoRamz,
  },
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
    logo: logoAnaloghive,
  },
  {
    name: 'Memo',
    description: 'Interface for a cloned memory of my grandfather.',
    link: {
      href: 'https://github.com/musqulu/memo',
      label: 'github.com/musqulu/memo',
      target: '_blank',
    },
    internal: false,
    logo: logoMemo,
  },
  {
    name: 'Hermes Dash',
    description: 'Dashboard for hermes reports & agent management.',
    link: {
      href: 'https://github.com/musqulu/hermes-dash',
      label: 'github.com/musqulu/hermes-dash',
      target: '_blank',
    },
    internal: false,
    logo: logoHermesDash,
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
    logo: logoCloner,
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
    logo: logoHikerstash,
  },
  {
    name: 'Uid8',
    description:
      'Low-fi design ipad app to quickly validate ideas and mock prototypes.',
    link: { href: '#', label: 'Discontinued', target: '_blank' },
    internal: true,
    logo: logoUid8,
  },
]
