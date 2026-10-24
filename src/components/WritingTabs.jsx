import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

const tabs = [
  { href: '/articles', label: 'Articles' },
  { href: '/business-notes', label: 'Business notes' },
]

export function WritingTabs() {
  let { pathname } = useRouter()

  return (
    <nav className="mb-10 flex w-fit rounded-full bg-zinc-100 p-1 text-sm font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300" aria-label="Writing sections">
      {tabs.map((tab) => {
        let isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`)

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={clsx(
              'rounded-full px-4 py-2 transition',
              isActive
                ? 'bg-white text-red-500 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-700 dark:text-red-400 dark:ring-white/10'
                : 'hover:text-red-500 dark:hover:text-red-400'
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
