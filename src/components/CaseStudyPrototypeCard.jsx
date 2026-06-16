import Image from 'next/image'
import Link from 'next/link'

export function CaseStudyPrototypeCard({
  href,
  title = 'Interactive prototype',
  description,
  linkLabel = 'Open prototype',
  image,
  imageAlt = 'Prototype screenshot',
}) {
  return (
    <div className="not-prose my-10 overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-700/40">
      {image && (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block bg-zinc-50 dark:bg-zinc-800/50"
        >
          <Image
            src={image}
            alt={imageAlt}
            className="w-full transition group-hover:opacity-95"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </Link>
      )}
      <div className="p-6">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center text-sm font-medium text-red-400 transition hover:text-red-500"
        >
          {linkLabel}
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="ml-1 h-4 w-4 stroke-current"
          >
            <path
              d="M6.75 5.75 9.25 8l-2.5 2.25"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
