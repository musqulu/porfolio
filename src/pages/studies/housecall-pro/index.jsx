import Head from 'next/head'

import { Container } from '@/components/Container'
import { ImpactSnapshot } from '@/components/ImpactSnapshot'
import { ProjectGrid } from '@/components/ProjectGrid'
import { housecallProjects } from '@/lib/projects'

const meta = {
  title: 'Housecall Pro',
  subtitle:
    'Product design across Online Booking, AI, leads, payments, and operational workflows for home service businesses.',
  description:
    'An overview of my product design work at Housecall Pro — from Online Booking and its AI booking agent to leads, payments, and the operational systems that power home service businesses.',
}

export default function HousecallProOverview() {
  return (
    <>
      <Head>
        <title>{`${meta.title} - Konrad Galan`}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <Container className="mt-16 lg:mt-32">
        <div className="mx-auto max-w-2xl">
          <header className="flex flex-col">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {meta.title}
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              {meta.subtitle}
            </p>
          </header>
          <ImpactSnapshot
            intro="A snapshot of the scale and scope of my work across Housecall Pro."
            metrics={[
              {
                metric: '4+ years',
                label:
                  'Growing from Product Designer to Senior Product Designer with broader ownership across research, strategy, and systems design',
              },
              {
                metric: '~18k/week',
                label: 'Bookings and estimates through Online Booking',
              },
              {
                metric: '100k+/month',
                label: 'Automated follow-ups sent through Pipeline automations',
              },
              {
                metric: '7+ product areas',
                label:
                  'Designed across online booking, leads, payments, service areas, pipeline, automations, and CSR AI settings',
              },
              {
                metric: 'Research-led roadmap',
                label:
                  'Customer interviews, surveys, session replays, product analytics, and stakeholder reviews shaped product direction',
              },
              {
                metric: 'Cross-team systems work',
                label:
                  'Partnered with PMs, engineers, data, design systems, payments, AI, and go-to-market teams',
              },
            ]}
          />
          <div className="mt-8 space-y-4 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              At Housecall Pro I work across CSR AI, Automations, Online Booking,
              the Booking Agent, Pipeline, and Leads, simplifying the complex
              revenue and operational workflows that home service businesses run
              on. Since joining in 2022 I&apos;ve grown from Product Designer to
              Senior Product Designer, taking configuration-heavy tools and making
              them usable, discoverable, and measurably better at converting.
            </p>
            <p>Key work across my time here includes:</p>
            <ul className="list-disc space-y-2 pl-5 marker:text-zinc-400 dark:marker:text-zinc-500">
              <li>
                Redesigning Online Booking from scratch, from pro setup to the
                homeowner booking flow
              </li>
              <li>
                A new map-based service area experience shared across multiple
                product domains
              </li>
              <li>
                Defining new AI agent workflows, including the Booking Agent that
                lifts booking conversion and adoption
              </li>
              <li>Simplifying CSR AI setup, settings, and integrations</li>
              <li>
                A new integrated Lead Forms intake that improves conversion and
                reduces friction
              </li>
              <li>
                Expanding Automations into a more robust product with custom flows
              </li>
              <li>A redesigned Pipeline invoice board for clarity and speed</li>
              <li>
                An easy way to accept deposits and payments in Online Booking
              </li>
            </ul>
            <p>
              Below are individual case studies that go deeper into specific
              projects. This overview is a work in progress and will be refined
              over time.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Case studies
          </h2>
          <div className="mt-10">
            <ProjectGrid projects={housecallProjects} />
          </div>
        </div>
      </Container>
    </>
  )
}
