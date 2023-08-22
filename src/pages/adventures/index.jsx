import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllAdventures } from '@/lib/getAllAdventures'

export default function AdventuresIndex({ adventures }) {
  return (
    <>
      <Head>
        <title>Adventures - Konrad Galan</title>
        <meta
          name="description"
          content="My adventures that I want to share with you."
        />
      </Head>

      <SimpleLayout
        title="My adventures worth sharing"
        intro="Experiences that recharge my batteries and make me happy."
      >

        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {adventures.map((adventure) => (
            <div key={adventure.slug} className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                {adventure.meta && adventure.meta.image && (
                  <img
                    src={adventure.meta.image}
                    alt={adventure.meta.title || 'Default Alt Text'}
                    className="h-full w-full object-cover object-center"
                  />
                )}
              </div>
              <h3 className="mt-6 text-sm text-red-400">
                <a href={`/adventures/${adventure.slug}`}>
                  <span className="absolute inset-0" />
                  {adventure.name}
                </a>
              </h3>
              <p className="text-2xl font-semibold text-gray-100">{adventure.meta.title}</p>
            </div>
          ))}
        </div>

      </SimpleLayout>

    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      adventures: (await getAllAdventures()).map(({ component, ...meta }) => meta),
    },
  }
}
