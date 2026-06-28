import Head from 'next/head'

import { ProjectGrid } from '@/components/ProjectGrid'
import { SimpleLayout } from '@/components/SimpleLayout'
import {
  archivedProjects,
  explorations,
} from '@/lib/projects'

const sectionTitleClassName =
  'text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl'

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects - Konrad Galan</title>
        <meta
          name="description"
          content="Personal explorations and archived projects from Konrad Galan."
        />
      </Head>
      <SimpleLayout
        title="A glimpse into my projects."
        intro="Experiments, side projects, and older work I've built across product design, AI, and creative tooling."
      >
        <ProjectGrid projects={explorations} />
      </SimpleLayout>
      <SimpleLayout
        title="Archived / Discontinued"
        titleClassName={sectionTitleClassName}
        className="mt-24 sm:mt-32"
      >
        <ProjectGrid projects={archivedProjects} />
      </SimpleLayout>
    </>
  )
}
