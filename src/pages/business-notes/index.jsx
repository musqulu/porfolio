import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { WritingTabs } from '@/components/WritingTabs'
import { formatDate } from '@/lib/formatDate'
import { getAllBusinessNotes } from '@/lib/getAllBusinessNotes'

function BusinessNote({ note }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/business-notes/${note.slug}`}>
          {note.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={note.date}
          className="md:hidden"
          decorate
        >
          {formatDate(note.date)}
        </Card.Eyebrow>
        <Card.Description>{note.description}</Card.Description>
        <Card.Cta>Read note</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={note.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(note.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function BusinessNotesIndex({ notes }) {
  return (
    <>
      <Head>
        <title>Business notes - Konrad Galan</title>
        <meta
          name="description"
          content="Short operating notes on building, pricing, and growing independent products."
        />
      </Head>
      <SimpleLayout
        title="Business notes."
        intro="Practical notes I want to keep close while building independent products."
      >
        <WritingTabs />
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {notes.map((note) => (
              <BusinessNote key={note.slug} note={note} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notes: (await getAllBusinessNotes()).map(({ component, ...meta }) => meta),
    },
  }
}
